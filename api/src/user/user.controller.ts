import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'

import { Serialize } from '../interceptors/serialize.interceptor'

import { UserService } from './user.service'
import { CreateUserDto, FilterUserDto, UpdateUserDto, UserDto } from './dto/user.dto'

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Serialize(UserDto)
  async getUsers(@Query() filter: FilterUserDto) {
    const data = await this.userService.getUsers(filter)

    return { data }
  }

  @Get(':id')
  @Serialize(UserDto)
  async getUserById(@Param('id') id: string) {
    return await this.userService.getUserById(id)
  }

  @Post()
  @Serialize(UserDto)
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto)
  }

  @Patch(':id')
  @Serialize(UserDto)
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(id, dto)
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id)
  }
}
