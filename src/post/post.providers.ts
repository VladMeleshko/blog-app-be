import {DataSource} from 'typeorm';

import {PostEntity} from './entities/post.entity';
import {DATABASE_CONNECTION, POST_REPOSITORY} from '../constants/database';

export const postsProviders = [
  {
    provide: POST_REPOSITORY,
    useFactory: (connection: DataSource) => connection.getRepository(PostEntity),
    inject: [DATABASE_CONNECTION]
  }
];
