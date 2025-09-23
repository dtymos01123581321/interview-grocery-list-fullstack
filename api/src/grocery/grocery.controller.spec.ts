import { Test, TestingModule } from '@nestjs/testing'
import { GroceryController } from './grocery.controller'
import { GroceryService } from './grocery.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { FilterGroceryDto } from './dto/filter.dto'
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto'

describe('GroceryController', () => {
  let controller: GroceryController
  let service: GroceryService

  const mockGroceryService = {
    filterGroceries: jest.fn(),
    createGrocery: jest.fn(),
    updateGrocery: jest.fn(),
    deleteGrocery: jest.fn(),
    bulkDelete: jest.fn(),
    getHistory: jest.fn(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroceryController],
      providers: [{ provide: GroceryService, useValue: mockGroceryService }],
    })
      .overrideGuard(JwtAuthGuard) // 👈 ось тут
      .useValue({ canActivate: jest.fn(() => true) })
      .compile()

    controller = module.get<GroceryController>(GroceryController)
    service = module.get<GroceryService>(GroceryService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('filterGroceries() should return data', async () => {
    const filter: FilterGroceryDto = { status: 'HAVE' }
    mockGroceryService.filterGroceries.mockResolvedValue(['item'])
    const result = await controller.filterGroceries(filter)
    expect(result).toEqual({ data: ['item'] })
    expect(service.filterGroceries).toHaveBeenCalledWith(filter)
  })

  it('createGrocery() should create and return data', async () => {
    const dto: CreateGroceryDto = { name: 'Bread' } as any
    mockGroceryService.createGrocery.mockResolvedValue(dto)
    const result = await controller.createGrocery(dto)
    expect(result).toEqual({ data: dto })
    expect(service.createGrocery).toHaveBeenCalledWith(dto)
  })

  it('updateGrocery() should update and return data', async () => {
    const dto: UpdateGroceryDto = { priority: 2 }
    mockGroceryService.updateGrocery.mockResolvedValue({ id: '1', ...dto })
    const result = await controller.updateGrocery({ id: '1' }, dto)
    expect(result).toEqual({ data: { id: '1', priority: 2 } })
    expect(service.updateGrocery).toHaveBeenCalledWith('1', dto)
  })

  it('deleteGrocery() should call service and return success', async () => {
    mockGroceryService.deleteGrocery.mockResolvedValue(undefined)
    const result = await controller.deleteGrocery({ id: '1' })
    expect(result).toEqual({ success: true })
    expect(service.deleteGrocery).toHaveBeenCalledWith('1')
  })

  it('bulkDelete() should call service and return success', async () => {
    mockGroceryService.bulkDelete.mockResolvedValue(undefined)
    const result = await controller.bulkDelete(['1', '2'])
    expect(result).toEqual({ success: true })
    expect(service.bulkDelete).toHaveBeenCalledWith(['1', '2'])
  })

  it('getHistory() should return data', async () => {
    mockGroceryService.getHistory.mockResolvedValue([{ id: 'h1' }])
    const result = await controller.getHistory('1')
    expect(result).toEqual({ data: [{ id: 'h1' }] })
    expect(service.getHistory).toHaveBeenCalledWith('1')
  })
})
