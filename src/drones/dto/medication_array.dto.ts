import { MedicationDto } from './medication.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class MedicationArray {
  @ApiProperty({ type: [MedicationDto] })
  @IsArray()
  @ValidateNested({ each: true })
  medication_items: MedicationDto[];
}
