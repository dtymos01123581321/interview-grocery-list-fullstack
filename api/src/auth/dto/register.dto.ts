import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  name: string

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string

  @ApiProperty({ example: 'password123', minLength: 6, description: 'User password' })
  @MinLength(6)
  password: string
}
