import {Controller, Get, Param} from '@nestjs/common';
import {ApiBearerAuth, ApiParam, ApiTags} from '@nestjs/swagger';

import {PostInfoResponse} from './@types';
import {PostEntity} from './entities/post.entity';
import {GetPostPipe} from './pipes/get-post.pipe';
import {PostService} from './post.service';
import CommonAuthGuard from '../auth/authenticate.decorator';

@Controller('post')
@ApiTags('Post')
@ApiBearerAuth()
@CommonAuthGuard()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  @ApiParam({name: 'id', required: true, type: 'string'})
  public async getPost(
    @Param('id', GetPostPipe) post: PostEntity
  ): Promise<PostInfoResponse> {
    return this.postService.getPost(post);
  }

  @Get()
  public async getPosts(): Promise<Record<string, PostEntity[]>> {
    return this.postService.getPosts();
  }
}
