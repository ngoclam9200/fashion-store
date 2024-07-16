import { MigrationInterface, QueryRunner } from "typeorm";

export class Updateproducttbl11720584740005 implements MigrationInterface {
    name = 'Updateproducttbl11720584740005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "category_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "category_id"`);
    }

}
