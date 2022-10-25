import { MedicationEntity } from './medication.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DroneModel } from '../enums/drone-model.enum';
import { DroneState } from '../enums/drone-state.enum';

@Entity()
export class DroneEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  serial: string;

  @Column({ enum: DroneModel })
  model: DroneModel;

  @Column()
  weight_limit: number;

  @Column()
  available_weight: number;

  @Column()
  battery_capacity: number;

  @Column({ enum: DroneState })
  state: DroneState;

  @OneToMany(() => MedicationEntity, (medication) => medication.drone_host, {
    cascade: true,
  })
  loaded_medication: MedicationEntity[];
}
