import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, IsInt, IsNotEmpty, Matches, MinLength, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsString({ message: 'validation.name_string' })
  @IsNotEmpty({ message: 'validation.name_required' })
  @MinLength(2, { message: 'validation.name_min_length' })
  @Matches(/^[\p{L}\s'-]+$/u, { message: 'validation.name_no_symbols' })
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail({}, { message: 'validation.email_invalid' })
  email?: string;

  @ApiPropertyOptional({ type: 'number', minimum: 0, maximum: 150 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation.age_integer' })
  @Min(0, { message: 'validation.age_min' })
  @Max(150, { message: 'validation.age_max' })
  age?: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'validation.location_id_integer' })
  locationId?: number;
}