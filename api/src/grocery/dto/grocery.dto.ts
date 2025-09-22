import { IsEnum, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator'
import { Transform } from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

import { GroceryItemStatus } from '@prisma/client'

export class CreateGroceryDto {
  @ApiProperty({
    example: 'Milk',
    description: 'Name of the grocery item',
  })
  @IsString()
  name: string

  @ApiPropertyOptional({
    example: 1,
    description: 'Priority of the item (lower = higher priority)',
  })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiPropertyOptional({
    example: 3,
    description: 'Quantity of the grocery item',
  })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  quantity?: number

  @ApiPropertyOptional({
    example: 'HAVE',
    description: 'Status of the grocery item',
    enum: GroceryItemStatus,
  })
  @IsEnum(GroceryItemStatus)
  @IsOptional()
  status?: GroceryItemStatus
}

export class UpdateGroceryDto extends PartialType(CreateGroceryDto) {}

export class GroceryItemIdDto {
  @ApiProperty({
    example: 'b6b1a8c3-1b2a-4a55-8e6d-1e72f0d3d4ab',
    description: 'UUID of the grocery item',
  })
  @IsUUID()
  id: string
}
