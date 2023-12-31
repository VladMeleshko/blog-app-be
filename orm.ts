import dotenv from 'dotenv';
import fs from 'fs';
import {DataSource} from 'typeorm';

import {DatabaseInit1679923174068} from './src/migrations/mysql/1679923174068-DatabaseInit[struct]';
import {DataInit1679923220806} from './src/migrations/mysql/1679923220806-DataInit[data]';
import {PostEntity} from './src/post/entities/post.entity';
import UserPersonalInfoEntity from './src/user/entities/user-personal-info.entity';
import UserRoleRuleEntity from './src/user/entities/user-role-rule.entity';
import UserRoleEntity from './src/user/entities/user-role.entity';
import UserEntity from './src/user/entities/user.entity';

const env =
  process.env.SERVICE_ENV === 'prod'
    ? {...process.env}
    : dotenv.parse(fs.readFileSync('.env'));

const ds = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT || String(5432)),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  schema: env.DB_SCHEMA,
  entities: [
    UserPersonalInfoEntity,
    UserRoleEntity,
    UserRoleRuleEntity,
    UserEntity,
    PostEntity
  ],
  migrationsRun: true,
  migrations: [DatabaseInit1679923174068, DataInit1679923220806],
  synchronize: false,
  logging: true,
  connectTimeoutMS: 1000
});

export default ds;
