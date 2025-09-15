import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @ApiProperty()
  @IsString({ message: 'City must be a string', context: { field: 'city' } })
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString({ message: 'Country must be a string', context: { field: 'country' } })
  country?: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt({ message: 'userId must be an integer', context: { field: 'userId' } })
  userId: number;
}