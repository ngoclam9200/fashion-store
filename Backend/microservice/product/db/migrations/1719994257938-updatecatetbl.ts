import { MigrationInterface, QueryRunner } from "typeorm";

export class Updatecatetbl1719994257938 implements MigrationInterface {
    name = 'Updatecatetbl1719994257938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "by_user_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "user_id_created" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "user_id_updated" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "user_id_updated"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "user_id_created"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "by_user_id" integer NOT NULL`);
    }

}
