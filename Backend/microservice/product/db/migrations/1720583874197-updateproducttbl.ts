import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateproducttbl1720583874197 implements MigrationInterface {
    name = 'Updateproducttbl1720583874197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "user_id_created" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "user_id_updated" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id_updated"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "user_id_created"`);
    }

}
