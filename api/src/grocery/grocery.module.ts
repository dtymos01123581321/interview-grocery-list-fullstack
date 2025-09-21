import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'
import { GroceryService } from './grocery.service'
import { GroceryController } from './grocery.controller'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [GroceryService],
  controllers: [GroceryController],
})
export class GroceryModule {}
