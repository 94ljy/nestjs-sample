import { MigrationInterface, QueryRunner } from 'typeorm';

export class New1715584230388 implements MigrationInterface {
  name = 'New1715584230388';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "email" character varying NOT NULL,
            "email_verified_at" TIMESTAMP WITH TIME ZONE,
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email")
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_d091f1d36f18bbece2a9eabc6e" ON "user" ("created_at")
    `);
    await queryRunner.query(`
        CREATE TABLE "auth" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
            "deleted_at" TIMESTAMP WITH TIME ZONE,
            "password" character varying NOT NULL,
            "last_login_at" TIMESTAMP WITH TIME ZONE,
            "user_id" character varying NOT NULL,
            CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id")
        )
    `);
    await queryRunner.query(`
        CREATE INDEX "IDX_230c921c58f356c2847090b5e7" ON "auth" ("created_at")
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DROP INDEX "public"."IDX_230c921c58f356c2847090b5e7"
    `);
    await queryRunner.query(`
        DROP TABLE "auth"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_d091f1d36f18bbece2a9eabc6e"
    `);
    await queryRunner.query(`
        DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"
    `);
    await queryRunner.query(`
        DROP TABLE "user"
    `);
  }
}
