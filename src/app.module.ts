import { Module } from '@nestjs/common';
import { DronesModule } from './drones/drones.module';

@Module({
  imports: [DronesModule],
})
export class AppModule {}
