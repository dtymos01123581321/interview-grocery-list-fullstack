import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'
import { GroceryService } from './grocery.service'
import { FilterGroceryDto } from './dto/filter.dto'
import { CreateGroceryDto, GroceryItemIdDto, UpdateGroceryDto } from './dto/grocery.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@UseGuards(JwtAuthGuard)
@Controller({
  version: '1',
  path: 'grocery',
})
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Get()
  async filterGroceries(@Query() filter: FilterGroceryDto) {
    const data = await this.groceryService.filterGroceries(filter)

    return {
      data,
    }
  }

  @Post()
  async createGrocery(@Body() createGroceryDto: CreateGroceryDto) {
    const data = await this.groceryService.createGrocery(createGroceryDto)

    return {
      data,
    }
  }

  @Put(':id')
  async updateGrocery(@Param() { id }: GroceryItemIdDto, @Body() updateGroceryDto: UpdateGroceryDto) {
    const data = await this.groceryService.updateGrocery(id, updateGroceryDto)

    return {
      data,
    }
  }

  @Delete(':id')
  async deleteGrocery(@Param() { id }: GroceryItemIdDto) {
    await this.groceryService.deleteGrocery(id)
    return { success: true }
  }

  @Delete()
  async bulkDelete(@Body('ids') ids: string[]) {
    await this.groceryService.bulkDelete(ids)
    return { success: true }
  }

  @Get(':id/history')
  async getHistory(@Param('id') id: string) {
    const data = await this.groceryService.getHistory(id)
    return { data }
  }
}
