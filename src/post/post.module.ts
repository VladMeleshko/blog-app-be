import {Module} from '@nestjs/common';

import {PostController} from './post.controller';
import {postsProviders} from './post.providers';
import {PostService} from './post.service';
import {DatabaseModule} from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PostController],
  providers: [PostService, ...postsProviders],
  exports: [PostService]
})
export class PostModule {}
