import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.headers['authorization']

    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header')
    }

    const [type, token] = authHeader.split(' ')

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid Authorization format')
    }

    try {
      ;(request as any).user = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'secret',
      })
      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token')
    }
  }
}
