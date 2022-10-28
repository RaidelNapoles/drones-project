import { DroneState } from './../enums/drone-state.enum';
import { DroneModel } from './../enums/drone-model.enum';
import { IsEnum, IsInt, Max, MaxLength } from 'class-validator';
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

  @ApiProperty({ default: 500 })
  @Type(() => Number)
  @IsInt()
  @Max(500)
  weight_limit: number;

  remaining_weight_capacity: number;

  @ApiProperty({ default: 100 })
  @Type(() => Number)
  @IsInt()
  battery_capacity: number;

  @ApiProperty({
    enum: DroneState,
    default: DroneState.IDLE,
  })
  state: DroneState;
}
