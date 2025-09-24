import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersAndLocationsTables1758528315575 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Создание таблицы locations
        await queryRunner.query(`
            CREATE TABLE "location" (
                "id" SERIAL PRIMARY KEY,
                "city" VARCHAR(255) NOT NULL,
                "country" VARCHAR(255)
            );
        `);

        // Создание таблицы users
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255),
                "age" INTEGER,
                "location_id" INTEGER,
                CONSTRAINT "FK_user_location" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE SET NULL
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user";`);
        await queryRunner.query(`DROP TABLE "location";`);
    }
}
