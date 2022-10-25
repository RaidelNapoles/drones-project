import { DroneState } from './../enums/drone-state.enum';
import { DroneModel } from './../enums/drone-model.enum';
import { IsEnum, IsNumber, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DroneDto {
  @ApiProperty()
  @MaxLength(100)
  serial: string;

  @ApiProperty({
    enum: DroneModel,
    default: DroneModel.Middleweight,
  })
  @IsEnum(DroneModel)
  model: DroneModel;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Max(500)
  weight_limit: number;

  available_weight: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  battery_capacity: number;

  @ApiProperty({
    enum: DroneState,
    default: DroneState.IDLE,
  })
  state: DroneState;
}
