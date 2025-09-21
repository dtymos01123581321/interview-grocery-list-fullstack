import { Injectable, BadRequestException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: { name: string; email: string; password: string }) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (existing) {
      throw new BadRequestException('Email already in use')
    }

    const hashed = await bcrypt.hash(dto.password, 10)
    const user = await this.prisma.user.create({
      data: { name: dto.name, email: dto.email, password: hashed },
    })

    return { id: user.id, email: user.email }
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } })
    if (!user) throw new BadRequestException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new BadRequestException('Invalid credentials')

    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })

    return { token }
  }
}
