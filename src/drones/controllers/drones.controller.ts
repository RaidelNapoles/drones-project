import { MedicationArray } from './../dto/medication_array.dto';
import { MedicationDto } from './../dto/medication.dto';
import { DroneService } from './../services/drones.service';
import { DroneDto } from './../dto/drone.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller()
export class DroneController {
  constructor(private readonly _drone_service: DroneService) {}

  @Post('drone_registration')
  async drone_registration(@Body() droneDto: DroneDto) {
    return await this._drone_service.createDrone(droneDto);
  }

  @Put('update/:id')
  async drone_update(
    @Param('id') droneId: number,
    @Body() droneDto: Partial<DroneDto>,
  ) {
    return await this._drone_service.updateDrone(droneId, droneDto);
  }

  @Put('load_medication/:id')
  async load_medication(
    @Param('id') droneId: number,
    @Body()
    medication: MedicationArray,
  ) {
    return this._drone_service.loadMedication(droneId, medication);
  }

  @Get('check_loaded_medication/:id')
  async check_loaded_medicina(@Param('id') droneId: number) {
    return this._drone_service.checkLoadedMedication(droneId);
  }

  @Get('check_available_drones_for_loading')
  async check_available_drones_for_loading() {
    return await this.check_available_drones_for_loading();
  }

  @Get('check_battery_level/:id')
  async check_battery_level(@Param('id') droneId: number) {
    return await this._drone_service.checkBatteryLevel(droneId);
  }
}
