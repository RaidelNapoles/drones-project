import { DroneService } from './services/drones.service';
import { DroneController } from './controllers/drones.controller';
import { MedicationEntity } from './entities/medication.entity';
import { DroneEntity } from './entities/drone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([DroneEntity, MedicationEntity])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DronesModule {}
