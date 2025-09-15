import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { FilterGroceryDto } from './dto/filter.dto'
import { CreateGroceryDto, UpdateGroceryDto } from './dto/grocery.dto'

@Injectable()
export class GroceryService {
  constructor(private readonly prisma: PrismaService) {}

  async filterGroceries(filter: FilterGroceryDto) {
    const { skip, take, ...rest } = filter
    return this.prisma.groceryItem.findMany({
      where: rest,
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
      skip,
      take,
    })
  }

  async createGrocery(createGroceryDto: CreateGroceryDto) {
    return this.prisma.groceryItem.create({ data: createGroceryDto })
  }

  async updateGrocery(id: string, updateGroceryDto: UpdateGroceryDto) {
    const existing = await this.prisma.groceryItem.findUnique({ where: { id } })

    const updated = await this.prisma.groceryItem.update({
      where: { id },
      data: updateGroceryDto,
    })

    if (updateGroceryDto.status && updateGroceryDto.status !== existing?.status) {
      await this.prisma.groceryItemHistory.create({
        data: {
          groceryId: id,
          oldStatus: existing?.status,
          newStatus: updateGroceryDto.status,
        },
      })
    }

    return updated
  }

  async deleteGrocery(id: string) {
    return this.prisma.groceryItem.delete({ where: { id } })
  }

  async bulkDelete(ids: string[]) {
    return this.prisma.groceryItem.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async getHistory(id: string) {
    return this.prisma.groceryItemHistory.findMany({
      where: { groceryId: id },
      orderBy: { changedAt: 'desc' },
    })
  }
}
