import { MigrationInterface, QueryRunner } from "typeorm";

export class Categorytblupdate1231720775044965 implements MigrationInterface {
    name = 'Categorytblupdate1231720775044965'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "image" TO "media_id"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "media_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "media_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "media_id"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "media_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "categories" RENAME COLUMN "media_id" TO "image"`);
    }

}
