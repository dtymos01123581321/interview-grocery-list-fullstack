import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class FilterGroceryDto {
  @ApiPropertyOptional({
    example: 'HAVE',
    description: 'Filter by grocery status',
    enum: ['HAVE', 'WANT', 'RANOUT'],
  })
  @IsOptional()
  @IsString()
  status?: 'HAVE' | 'WANT' | 'RANOUT'

  @ApiPropertyOptional({
    example: 1,
    description: 'Priority of the grocery item',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number

  @ApiPropertyOptional({
    example: 0,
    description: 'Number of items to skip (for pagination)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of items to take (for pagination)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number

  @ApiPropertyOptional({
    example: 10,
    description: 'Items per page (alternative pagination param)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage?: number

  @ApiPropertyOptional({
    example: 'name',
    description: 'Field to sort by',
  })
  @IsOptional()
  @IsString()
  sortBy?: string

  @ApiPropertyOptional({
    example: 'asc',
    description: 'Sort order',
    enum: ['asc', 'desc'],
  })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc'
}
