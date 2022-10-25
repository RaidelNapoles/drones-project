import { MedicationEntity } from './entities/medication.entity';
import { DroneEntity } from './entities/drone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([DroneEntity, MedicationEntity])],
})
export class DronesModule {}
