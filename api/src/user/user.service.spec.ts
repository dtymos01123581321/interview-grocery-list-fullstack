import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from './user.service'
import { PrismaService } from '../prisma/prisma.service'

describe('UserService', () => {
  let service: UserService
  let prisma: PrismaService

  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile()

    service = module.get<UserService>(UserService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('findAll() → should return users', async () => {
    const users = [{ id: '1', email: 'test@mail.com' }]
    mockPrisma.user.findMany.mockResolvedValue(users)

    const result = await service.getUsers({})
    expect(result).toEqual(users)
    expect(prisma.user.findMany).toHaveBeenCalled()
  })

  it('findOne() → should return user by id', async () => {
    const user = { id: '1', email: 'test@mail.com' }
    mockPrisma.user.findUnique.mockResolvedValue(user)

    const result = await service.getUserById('1')
    expect(result).toEqual(user)
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: '1' } })
  })

  it('create() → should create a new user', async () => {
    const dto = { email: 'test@mail.com', name: 'Test' }
    const user = { id: '1', ...dto }
    mockPrisma.user.create.mockResolvedValue(user)

    const result = await service.createUser(dto)
    expect(result).toEqual(user)
    expect(prisma.user.create).toHaveBeenCalledWith({ data: { email: 'test@mail.com' } })
  })

  it('update() → should update a user', async () => {
    const dto = { email: 'updated@mail.com' }
    const updatedUser = { id: '1', ...dto }
    mockPrisma.user.update.mockResolvedValue(updatedUser)

    const result = await service.updateUser('1', dto)
    expect(result).toEqual(updatedUser)
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: dto,
    })
  })

  it('remove() → should delete a user', async () => {
    const deletedUser = { id: '1', email: 'test@mail.com' }
    mockPrisma.user.delete.mockResolvedValue(deletedUser)

    const result = await service.deleteUser('1')
    expect(result).toEqual(deletedUser)
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '1' } })
  })
})
