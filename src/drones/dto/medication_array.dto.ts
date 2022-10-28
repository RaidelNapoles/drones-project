import { MedicationDto } from './medication.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class MedicationArray {
  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  data_list: MedicationDto[];
}
