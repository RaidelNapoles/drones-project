import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class MedicationDto {
  @ApiProperty()
  // eslint-disable-next-line prettier/prettier
  @Matches(new RegExp('^w+d+-+_+$'))
  name: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  image: string;
}
