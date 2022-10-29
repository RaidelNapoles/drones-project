import { MigrationInterface, QueryRunner } from 'typeorm';

export class creatingModelTables1666999402683 implements MigrationInterface {
  name = 'creatingModelTables1666999402683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`drone_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`serial\` varchar(255) NOT NULL, \`model\` enum('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight') NOT NULL, \`weight_limit\` int NOT NULL, \`remaining_weight_capacity\` int NOT NULL, \`battery_capacity\` int NOT NULL, \`state\` enum('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING') NOT NULL, UNIQUE INDEX \`IDX_5095a7eed83f3836ea29139f48\` (\`serial\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`medication_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`weight\` int NOT NULL, \`code\` varchar(255) NOT NULL, \`image_path\` varchar(255) NOT NULL, \`droneHostId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`medication_entity\` ADD CONSTRAINT \`FK_d2230817d596ccfefb734bb93f5\` FOREIGN KEY (\`droneHostId\`) REFERENCES \`drone_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`medication_entity\` DROP FOREIGN KEY \`FK_d2230817d596ccfefb734bb93f5\``,
    );
    await queryRunner.query(`DROP TABLE \`medication_entity\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_5095a7eed83f3836ea29139f48\` ON \`drone_entity\``,
    );
    await queryRunner.query(`DROP TABLE \`drone_entity\``);
  }
}
