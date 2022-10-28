import { DroneDto } from './drone.dto';
import { PartialType } from '@nestjs/swagger';

export class DroneUpdateDto extends PartialType(DroneDto) {}
