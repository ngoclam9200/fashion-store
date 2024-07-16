import { MigrationInterface, QueryRunner } from "typeorm";

export class Categoriestbl1719913134670 implements MigrationInterface {
    name = 'Categoriestbl1719913134670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, "by_user_id" integer NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
