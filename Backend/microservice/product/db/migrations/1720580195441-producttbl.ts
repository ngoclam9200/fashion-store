import { MigrationInterface, QueryRunner } from "typeorm";

export class Producttbl1720580195441 implements MigrationInterface {
    name = 'Producttbl1720580195441'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "original_price" integer NOT NULL, "count" integer NOT NULL, "stock" integer NOT NULL, "is_have_size" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isDeleted" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
