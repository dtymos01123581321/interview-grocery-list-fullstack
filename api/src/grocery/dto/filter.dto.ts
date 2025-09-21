import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class FilterGroceryDto {
  @IsOptional()
  @IsString()
  status?: 'HAVE' | 'WANT' | 'RANOUT'

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  priority?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  perPage?: number

  @IsOptional()
  @IsString()
  sortBy?: string

  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc'
}
