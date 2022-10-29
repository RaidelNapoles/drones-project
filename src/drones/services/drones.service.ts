import { MedicationDto } from './../dto/medication.dto';
import { DroneDto } from './../dto/drone.dto';
import { MedicationEntity } from './../entities/medication.entity';
import { DroneEntity } from './../entities/drone.entity';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DroneState } from '../enums/drone-state.enum';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(DroneEntity)
    private readonly _droneRepository: Repository<DroneEntity>,
  ) {}

  async findAll(): Promise<DroneEntity[]> {
    return await this._droneRepository.find({
      relations: { loaded_medication: true },
    });
  }

  async findOne(droneId: number): Promise<DroneEntity> {
    const drone = await this._droneRepository.findOne({
      where: { id: droneId },
      relations: { loaded_medication: true },
    });
    if (!drone) {
      throw new NotFoundException(`Could'n find drone with id ${droneId}`);
    }
    return drone;
  }

  //Register a drone
  async createDrone(droneDto: DroneDto): Promise<DroneEntity> {
    const countDrones = await this._droneRepository.count();
    if (countDrones == 10) {
      throw new BadRequestException('Only ten drones are allowed!!!');
    }
    const found = await this._droneRepository.find({
      where: { serial: droneDto.serial },
    });
    if (found.length != 0) {
      throw new BadRequestException(
        'Already exits a drone with the same serial number',
      );
    }
    droneDto.remaining_weight_capacity = droneDto.weight_limit;
    const newDrone = { ...new DroneEntity(), ...droneDto };
    return this._droneRepository.save(newDrone);
  }

  async updateDrone(droneId: number, droneDto: Partial<DroneDto>) {
    let drone = await this.findOne(droneId);
    drone = { ...drone, ...droneDto };
    return this._droneRepository.save(drone);
  }

  //Load a drone with medication items
  async loadMedication(droneId: number, medicationItem: MedicationDto) {
    const drone = await this.findOne(droneId);

    //Preventing the drone from being in LOADING state if the battery level is **below 25%**
    if (drone.battery_capacity < 25) {
      throw new BadRequestException(
        `Drone battery is below 25%!! It can't be loaded!!`,
      );
    }

    //Preventing the drone from being loaded with more weight that it can carry
    if (drone.remaining_weight_capacity < medicationItem.weight) {
      throw new BadRequestException(
        `Trying to exceed the drone weight limit!!`,
      );
    }

    drone.remaining_weight_capacity -= medicationItem.weight;
    drone.state = DroneState.LOADING;
    delete medicationItem['file'];
    drone.loaded_medication.push({
      ...new MedicationEntity(),
      ...medicationItem,
    });
    return this._droneRepository.save(drone);
  }

  //Check loaded medication items for a given drone
  async checkLoadedMedication(droneId: number) {
    const drone = await this._droneRepository.findOne({
      where: { id: droneId },
      relations: { loaded_medication: true },
    });
    if (!drone) {
      throw new NotFoundException(`Could'n find drone with id ${droneId}`);
    }
    return drone.loaded_medication;
  }

  //Check available drones for loading
  async checkDronesAvailableForLoading() {
    const drones = await this._droneRepository.find({
      where: [{ state: DroneState.IDLE }],
    });
    return drones;
  }

  //Check drone battery level for a given drone
  async checkBatteryLevel(droneId: number) {
    const drone = await this.findOne(droneId);
    return drone.battery_capacity;
  }
}
