import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsInt, IsNotEmpty, Matches, MinLength, ValidationArguments } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @MinLength(2, { message: 'Name must be at least $constraint1 characters' })
  @Matches(/^[\p{L}\s'-]+$/u, { message: 'Name must not contain numbers or symbols' })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email?: string;

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'locationId must be an integer' })
  locationId?: number; // добавлено: ссылка на локацию
}