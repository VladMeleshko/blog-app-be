import {hash} from 'bcrypt';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import {MigrationInterface, QueryRunner} from 'typeorm';

import {insertArrayWithQuery} from '../init-data/helperFunctions';
import * as roleRuleData from '../init-data/roles-rules';

const env = dotenv.parse(fs.readFileSync('.env'));

export class DataInit1679923220806 implements MigrationInterface {
  name = 'DataInit1679923220806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const schemaName = env.DB_SCHEMA;

    await insertArrayWithQuery(queryRunner, 'user-roles', roleRuleData.roles);
    await insertArrayWithQuery(
      queryRunner,
      'user-role-rules',
      roleRuleData.userRolesRules
    );
    const savedRules = await queryRunner.query(
      `SELECT * FROM "${schemaName}"."user-role-rules"`
    );

    for await (const [roleValue, rules] of Object.entries(
      roleRuleData.rolesRules
    )) {
      const [role] = await queryRunner.query(
        `SELECT * FROM "${schemaName}"."user-roles" WHERE value = $1`,
        [roleValue]
      );
      const rulesIds = rules.map(
        ruleValue => savedRules.find(r => r.value === ruleValue).id
      );
      const rolesToRules = rulesIds.map(ruleId => ({
        user_role_id: role.id,
        user_role_rule_id: ruleId
      }));
      await insertArrayWithQuery(
        queryRunner,
        'user-roles_user-role-rules',
        rolesToRules
      );
    }

    if (env.SERVICE_ENV === 'dev') {
      await insertArrayWithQuery(queryRunner, 'user-personal-info', [
        {
          first_name: 'Vlad',
          last_name: 'Meleshko'
        }
      ]);

      const devAdmin = await queryRunner.query(
        `SELECT * FROM "${schemaName}"."user-personal-info" WHERE first_name='Vlad' AND last_name='Meleshko'`
      );

      await insertArrayWithQuery(queryRunner, 'users', [
        {
          email: 'vlad4.98@mail.ru',
          password: await hash('Q1q1q1q1q1', 10),
          user_role_id: 1,
          user_personal_info_id: devAdmin[0].id
        }
      ]);
    }
  }

  public async down(): Promise<void> {
    // silence is gold
  }
}
