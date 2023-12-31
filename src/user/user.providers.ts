import {DataSource} from 'typeorm';

import UserRoleEntity from './entities/user-role.entity';
import UserEntity from './entities/user.entity';
import {
  DATABASE_CONNECTION,
  USER_REPOSITORY,
  USER_ROLES_REPOSITORY
} from '../constants/database';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(UserEntity),
    inject: [DATABASE_CONNECTION]
  },
  {
    provide: USER_ROLES_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(UserRoleEntity),
    inject: [DATABASE_CONNECTION]
  }
];

export default {usersProviders};
