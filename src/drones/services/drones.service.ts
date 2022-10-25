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

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(DroneEntity)
    private readonly _droneRepository: Repository<DroneEntity>,
    @InjectRepository(MedicationEntity)
    private readonly _medicationRepository: Repository<MedicationEntity>,
  ) {}

  async findOne(droneId: number): Promise<DroneEntity> {
    const drone = await this._droneRepository.findOneBy({ id: droneId });
    if (!drone) {
      throw new NotFoundException(`Could'n find drone with id ${droneId}`);
    }
    return drone;
  }

  async createDrone(droneDto: DroneDto): Promise<DroneEntity> {
    const newDrone = { ...new DroneEntity(), ...droneDto };
    return this._droneRepository.save(newDrone);
  }

  async loadMedication(droneId: number, medicationItem: MedicationDto) {
    const drone = await this.findOne(droneId);
    if (drone.available_weight < medicationItem.weight) {
      throw new BadRequestException(
        `Trying to exceed the drone weight limit!!`,
      );
    }
    drone.available_weight -= medicationItem.weight;
    drone.loaded_medication.push({
      ...new MedicationEntity(),
      ...medicationItem,
    });
    return this._droneRepository.save(drone);
  }
}
