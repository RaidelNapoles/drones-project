import { DroneEntity } from './drone.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  weight: number;

  @Column()
  code: string;

  @Column()
  image_path: string;

  @ManyToOne(() => DroneEntity, (drone) => drone.loaded_medication)
  drone_host: DroneEntity;
}
