import { Test, TestingModule } from '@nestjs/testing'
import { GroceryService } from './grocery.service'
import { PrismaService } from '../prisma/prisma.service'
import { GroceryItemStatus } from '@prisma/client'

describe('GroceryService', () => {
  let service: GroceryService
  let prisma: PrismaService

  const mockPrisma = {
    groceryItem: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    groceryHistory: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroceryService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile()

    service = module.get<GroceryService>(GroceryService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('create() → should create grocery item', async () => {
    const dto = { name: 'Bread', priority: 1, status: GroceryItemStatus.HAVE }
    mockPrisma.groceryItem.create.mockResolvedValue({ id: '1', ...dto })

    const result = await service.createGrocery(dto)
    expect(result.name).toBe('Bread')
    expect(prisma.groceryItem.create).toHaveBeenCalledWith({ data: dto })
  })

  it('findAll() → should return groceries', async () => {
    mockPrisma.groceryItem.findMany.mockResolvedValue([{ id: '1', name: 'Eggs' }])

    const result = await service.filterGroceries({})
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Eggs')
  })

  it('update() → should update grocery', async () => {
    mockPrisma.groceryItem.update.mockResolvedValue({
      id: '1',
      name: 'Milk',
      priority: 2,
    })

    const result = await service.updateGrocery('1', { priority: 2 })
    expect(result.priority).toBe(2)
  })

  it('remove() → should delete grocery', async () => {
    mockPrisma.groceryItem.delete.mockResolvedValue({ id: '1' })

    const result = await service.deleteGrocery('1')
    expect(result.id).toBe('1')
  })
})
