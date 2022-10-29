import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DronesModule } from './drones/drones.module';
import dbConfig from '../config/ormconfig';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
    } as any),
    DronesModule,
    ScheduleModule.forRoot(),
  ],
})
export class AppModule {}
