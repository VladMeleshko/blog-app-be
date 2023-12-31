import {MigrationInterface, QueryRunner} from 'typeorm';

export class DatabaseInit1679923174068 implements MigrationInterface {
  name = 'DatabaseInit1679923174068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "user-personal-info" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ed5028877c1f7bc489b6dee23e1" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "user-role-rules" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5a76b5d63cef8de962b1c93e6da" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "user-roles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "value" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_67fd48edef9676445ace51fd1c3" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying, "password" character varying NOT NULL, "last_visited" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "user_role_id" integer NOT NULL, "user_personal_info_id" uuid NOT NULL, CONSTRAINT "REL_99bcd6394ce767865ab54508e1" UNIQUE ("user_personal_info_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "article" character varying NOT NULL, "image_url" character varying DEFAULT \'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg\', "user_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))'
    );
    await queryRunner.query(
      'CREATE TABLE "user-roles_user-role-rules" ("user_role_id" integer NOT NULL, "user_role_rule_id" integer NOT NULL, CONSTRAINT "PK_f3c8cd126f961d46cc8230b0e48" PRIMARY KEY ("user_role_id", "user_role_rule_id"))'
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_5433e6e7ed7fcd90af664c6885" ON "user-roles_user-role-rules" ("user_role_id") '
    );
    await queryRunner.query(
      'CREATE INDEX "IDX_4765793972e38d29fda8f352a1" ON "user-roles_user-role-rules" ("user_role_rule_id") '
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_6a9764cbcd911700611b8bfa44b" FOREIGN KEY ("user_role_id") REFERENCES "user-roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_99bcd6394ce767865ab54508e14" FOREIGN KEY ("user_personal_info_id") REFERENCES "user-personal-info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "posts" ADD CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
    await queryRunner.query(
      'ALTER TABLE "user-roles_user-role-rules" ADD CONSTRAINT "FK_5433e6e7ed7fcd90af664c68856" FOREIGN KEY ("user_role_id") REFERENCES "user-roles"("id") ON DELETE CASCADE ON UPDATE CASCADE'
    );
    await queryRunner.query(
      'ALTER TABLE "user-roles_user-role-rules" ADD CONSTRAINT "FK_4765793972e38d29fda8f352a1b" FOREIGN KEY ("user_role_rule_id") REFERENCES "user-role-rules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user-roles_user-role-rules" DROP CONSTRAINT "FK_4765793972e38d29fda8f352a1b"'
    );
    await queryRunner.query(
      'ALTER TABLE "user-roles_user-role-rules" DROP CONSTRAINT "FK_5433e6e7ed7fcd90af664c68856"'
    );
    await queryRunner.query(
      'ALTER TABLE "posts" DROP CONSTRAINT "FK_c4f9a7bd77b489e711277ee5986"'
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_99bcd6394ce767865ab54508e14"'
    );
    await queryRunner.query(
      'ALTER TABLE "users" DROP CONSTRAINT "FK_6a9764cbcd911700611b8bfa44b"'
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_4765793972e38d29fda8f352a1"'
    );
    await queryRunner.query(
      'DROP INDEX "public"."IDX_5433e6e7ed7fcd90af664c6885"'
    );
    await queryRunner.query('DROP TABLE "user-roles_user-role-rules"');
    await queryRunner.query('DROP TABLE "posts"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TABLE "user-roles"');
    await queryRunner.query('DROP TABLE "user-role-rules"');
    await queryRunner.query('DROP TABLE "user-personal-info"');
  }
}
