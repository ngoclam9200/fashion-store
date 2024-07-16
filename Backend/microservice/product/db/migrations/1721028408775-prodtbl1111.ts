import { MigrationInterface, QueryRunner } from "typeorm";

export class Prodtbl11111721028408775 implements MigrationInterface {
    name = 'Prodtbl11111721028408775'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "list_media_id" text NOT NULL DEFAULT '[]'`);
        await queryRunner.query(`ALTER TABLE "products" ADD "default_media_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "default_media_id"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "list_media_id"`);
    }

}
