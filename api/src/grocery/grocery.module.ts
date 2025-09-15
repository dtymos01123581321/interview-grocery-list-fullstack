import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'
import { GroceryService } from './grocery.service'
import { GroceryController } from './grocery.controller'

@Module({
  imports: [PrismaModule],
  providers: [GroceryService],
  controllers: [GroceryController],
})
export class GroceryModule {}
