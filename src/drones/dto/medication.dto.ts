import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Matches } from 'class-validator';

export class MedicationDto {
  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z]*[0-9]*[-_]*$'))
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  weight: number;

  @ApiProperty()
  @Matches(new RegExp('^[A-Z]*[0-9]*[_]*$'))
  code: string;

  @ApiHideProperty()
  image_path?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file?: any;
}
