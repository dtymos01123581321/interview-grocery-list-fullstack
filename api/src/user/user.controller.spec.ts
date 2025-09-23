import { Test, TestingModule } from '@nestjs/testing'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CreateUserDto, UpdateUserDto, FilterUserDto, UserDto } from './dto/user.dto'

describe('UserController', () => {
  let controller: UserController
  let service: jest.Mocked<UserService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUsers: jest.fn(),
            getUserById: jest.fn(),
            createUser: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<UserController>(UserController)
    service = module.get(UserService) as jest.Mocked<UserService>
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getUsers', () => {
    it('should return list of users', async () => {
      const filter: FilterUserDto = {}
      const users: UserDto[] = [{ id: '1', email: 'test@mail.com' } as UserDto]

      service.getUsers.mockResolvedValue(users as any)

      const result = await controller.getUsers(filter)

      expect(service.getUsers).toHaveBeenCalledWith(filter)
      expect(result).toEqual({ data: users })
    })
  })

  describe('getUserById', () => {
    it('should return a user', async () => {
      const user: UserDto = { id: '1', email: 'test@mail.com' } as UserDto
      service.getUserById.mockResolvedValue(user as any)

      const result = await controller.getUserById('1')

      expect(service.getUserById).toHaveBeenCalledWith('1')
      expect(result).toEqual(user)
    })
  })

  describe('createUser', () => {
    it('should create a user', async () => {
      const dto: CreateUserDto = { email: 'test@mail.com', name: 'Test' }
      const user = { id: '1', ...dto } as UserDto
      service.createUser.mockResolvedValue(user as any)

      const result = await controller.createUser(dto)

      expect(service.createUser).toHaveBeenCalledWith(dto)
      expect(result).toEqual(user)
    })
  })

  describe('updateUser', () => {
    it('should update a user', async () => {
      const dto: UpdateUserDto = { email: 'updated@mail.com' }
      const user = { id: '1', email: 'updated@mail.com', name: 'Test' } as UserDto
      service.updateUser.mockResolvedValue(user as any)

      const result = await controller.updateUser('1', dto)

      expect(service.updateUser).toHaveBeenCalledWith('1', dto)
      expect(result).toEqual(user)
    })
  })

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const deleted = { id: '1' }
      service.deleteUser.mockResolvedValue(deleted as any)

      const result = await controller.deleteUser('1')

      expect(service.deleteUser).toHaveBeenCalledWith('1')
      expect(result).toEqual(deleted)
    })
  })
})
