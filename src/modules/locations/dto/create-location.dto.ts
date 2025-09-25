import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateLocationDto {
  @ApiProperty()
  @IsString({ message: 'validation.city_string' })
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'validation.country_string' })
  country?: string;
}