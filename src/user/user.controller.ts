import {Controller, Get} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

import UserEntity from './entities/user.entity';
import {UserService} from './user.service';
import CommonAuthGuard from '../auth/authenticate.decorator';
import {Rules} from '../user-rules/rules.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth()
@CommonAuthGuard()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Rules('READ_USER')
  public async getUsers(): Promise<Record<string, UserEntity[]>> {
    return this.userService.getUsers();
  }
}
