import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FilterUserDto {
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'Filter by email',
  })
  @IsString()
  @IsOptional()
  email?: string
}

export class UserDto {
  @ApiProperty({
    example: '3f1d2c64-23e7-4b12-8a42-98a22cf8328f',
    description: 'UUID of the user',
  })
  @Expose()
  id: string

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @Expose()
  email: string
}

export class CreateUserDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the new user',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the new user',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'newemail@example.com',
    description: 'Updated email of the user',
  })
  @IsOptional()
  @IsEmail()
  email?: string
}
