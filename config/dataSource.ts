import { DataSource } from 'typeorm';

export const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'example',
  database: 'drone_fleet_db',
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: [],
});
