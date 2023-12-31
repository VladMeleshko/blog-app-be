import {Injectable, Inject} from '@nestjs/common';
import {instanceToPlain} from 'class-transformer';
import {FindManyOptions, FindOneOptions, Repository} from 'typeorm';

import {PostInfoResponse} from './@types';
import {PostEntity} from './entities/post.entity';
import {POST_REPOSITORY} from '../constants/database';

@Injectable()
export class PostService {
  constructor(
    @Inject(POST_REPOSITORY)
    private readonly postRepository: Repository<PostEntity>
  ) {}

  public async getOne(
    queryObject: FindOneOptions<PostEntity>
  ): Promise<PostEntity | null> {
    return this.postRepository.findOne(queryObject);
  }

  public async getMany(
    queryObject?: FindManyOptions<PostEntity>
  ): Promise<PostEntity[]> {
    return this.postRepository.find(queryObject);
  }

  public async getPosts(): Promise<Record<string, PostEntity[]>> {
    return instanceToPlain(
      await this.postRepository.find({
        order: {
          createdAt: 'ASC'
        }
      })
    );
  }

  public async getPost(post: PostEntity): Promise<PostInfoResponse> {
    return {
      ...post,
      user: {
        firstName: post.user.userPersonalInfo.firstName,
        lastName: post.user.userPersonalInfo.lastName
      }};
  }
}
