import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Matches } from 'class-validator';

export class MedicationDto {
  @ApiProperty()
  @Matches(new RegExp('^[a-zA-Z0-9-_]+$'), {
    message:
      "Only letters, numbers, '-' and '_' characters are allowed on field 'name'",
  })
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  weight: number;

  @ApiProperty()
  @Matches(new RegExp('^[A-Z0-9_]+$'), {
    message:
      "Only uppercase letters, numbers and '_' characters are allowed on field 'code'",
  })
  code: string;

  @ApiHideProperty()
  image_path?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  file?: any;
}
