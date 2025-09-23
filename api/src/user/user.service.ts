import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto, FilterUserDto, UpdateUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(filter: FilterUserDto) {
    return await this.prisma.user.findMany({
      where: {
        email: filter.email,
      },
    })
  }

  async createUser(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: {
        email: dto.email,
      },
    })
  }

  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: { email: dto.email },
    })
  }

  async deleteUser(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}
