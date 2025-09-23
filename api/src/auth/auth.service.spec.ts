import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}))

type PrismaMock = {
  user: {
    findUnique: jest.Mock
    create: jest.Mock
  }
}

describe('AuthService', () => {
  let service: AuthService
  let prisma: PrismaMock
  let jwtMock: jest.Mocked<typeof jwt>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
          } satisfies PrismaMock,
        },
      ],
    }).compile()

    service = module.get(AuthService)
    prisma = module.get(PrismaService) as unknown as PrismaMock
    jwtMock = jwt as jest.Mocked<typeof jwt>

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('login', () => {
    it('should return access token', async () => {
      const password = '123'
      const hashed = await bcrypt.hash(password, 10)
      const user = { id: '1', email: 'test@mail.com', password: hashed }

      prisma.user.findUnique.mockResolvedValue(user as any)
      jwtMock.sign.mockReturnValue('signed-jwt' as any)

      const result = await service.login({ email: user.email, password })

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: user.email },
      })
      expect(jwtMock.sign).toHaveBeenCalledWith({ sub: user.id, email: user.email }, expect.any(String), {
        expiresIn: '1h',
      })
      expect(result).toEqual({ token: 'signed-jwt' })
    })

    it('should throw when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null)

      await expect(service.login({ email: 'nope@mail.com', password: '123' })).rejects.toThrow('Invalid credentials')
    })
  })

  describe('register', () => {
    it('should hash password and create user', async () => {
      const dto = { name: 'Test', email: 'new@mail.com', password: '123' }

      prisma.user.findUnique.mockResolvedValue(null)
      prisma.user.create.mockResolvedValue({
        id: '1',
        name: dto.name,
        email: dto.email,
        password: 'hashed',
      } as any)

      const result = await service.register(dto)

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: dto.email },
      })
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          email: dto.email,
          password: expect.any(String),
        },
      })
      expect(result).toEqual({ id: '1', email: dto.email })
    })

    it('should throw when email already used', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: '1' } as any)

      await expect(service.register({ name: 'X', email: 'x@mail.com', password: '123' })).rejects.toThrow(
        'Email already in use',
      )
    })
  })
})
