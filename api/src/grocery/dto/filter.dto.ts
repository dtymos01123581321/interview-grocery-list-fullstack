import { IsEnum, IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

import { GroceryItemStatus } from '@prisma/client'

export class FilterGroceryDto {
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @IsEnum(GroceryItemStatus)
  @IsOptional()
  status?: GroceryItemStatus

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  skip?: number

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  take?: number
}
