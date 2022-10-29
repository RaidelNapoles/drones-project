import { DroneUpdateDto } from './../dto/drone_update.dto';
import { DroneService } from './../services/drones.service';
import { DroneDto } from './../dto/drone.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MedicationDto } from '../dto/medication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { Helper } from '../helpers/helper';

@Controller()
export class DroneController {
  constructor(private readonly _drone_service: DroneService) {}

  @Get('get_all_drones')
  async getAllDrones() {
    return await this._drone_service.findAll();
  }

  @Post('drone_registration')
  async drone_registration(@Body() droneDto: DroneDto) {
    return await this._drone_service.createDrone(droneDto);
  }

  @Put('drone_update/:id')
  async drone_update(
    @Param('id') droneId: number,
    @Body() droneDto: DroneUpdateDto,
  ) {
    return await this._drone_service.updateDrone(droneId, droneDto);
  }

  @Put('load_medication/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: Helper.destinationPath,
        filename: Helper.fileName,
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async load_medication(
    @Param('id') droneId: number,
    @Body()
    medicationItem: MedicationDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    medicationItem.image_path = file.path;
    return this._drone_service.loadMedication(droneId, medicationItem);
  }

  @Get('check_loaded_medication/:id')
  async check_loaded_medication(@Param('id') droneId: number) {
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
