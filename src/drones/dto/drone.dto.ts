import { DroneState } from './../enums/drone-state.enum';
import { DroneModel } from './../enums/drone-model.enum';
import { IsNumber, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DroneDto {
  @ApiProperty()
  @MaxLength(100)
  serial: string;

  @ApiProperty()
  model: DroneModel;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Max(500)
  weight: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  battery_capacity: number;

  @ApiProperty()
  state: DroneState;
}
