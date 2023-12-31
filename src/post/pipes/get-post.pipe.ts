import {Injectable, NotFoundException, PipeTransform, Scope} from '@nestjs/common';

import {PostEntity} from '../entities/post.entity';
import {PostService} from '../post.service';

@Injectable({scope: Scope.REQUEST})
export class GetPostPipe implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  async transform(postId: any): Promise<PostEntity> {
    const post = await this.postService.getOne({
      where: {
        id: postId
      },
      relations: {
        user: {
          userPersonalInfo: true
        }
      }
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }
}
