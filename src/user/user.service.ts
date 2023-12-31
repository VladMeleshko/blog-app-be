import {Injectable, Inject, ForbiddenException} from '@nestjs/common';
import {compare} from 'bcrypt';
import {instanceToPlain} from 'class-transformer';
import {FindManyOptions, FindOneOptions, Repository} from 'typeorm';

import UserRoleEntity from './entities/user-role.entity';
import UserEntity from './entities/user.entity';
import {USER_REPOSITORY, USER_ROLES_REPOSITORY} from '../constants/database';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
    @Inject(USER_ROLES_REPOSITORY)
    private readonly userRoleRepository: Repository<UserRoleEntity>
  ) {}

  public async getOne(
    queryObject: FindOneOptions<UserEntity>
  ): Promise<UserEntity | null> {
    return this.userRepository.findOne(queryObject);
  }

  public async getMany(
    queryObject?: FindManyOptions<UserEntity>
  ): Promise<UserEntity[]> {
    return this.userRepository.find(queryObject);
  }

  public async getRoles(): Promise<UserRoleEntity[]> {
    return this.userRoleRepository.find();
  }

  public async getOneRole(
    queryObject: FindOneOptions<UserRoleEntity>
  ): Promise<UserRoleEntity | null> {
    return this.userRoleRepository.findOne(queryObject);
  }

  public async getUsers(): Promise<Record<string, UserEntity[]>> {
    return instanceToPlain(await this.userRepository.find());
  }

  public async checkPassword(
    user: UserEntity,
    password: string
  ): Promise<boolean> {
    const existedUser = await this.userRepository.findOneOrFail({
      select: {
        password: true
      },
      where: {
        id: user.id
      }
    });

    const isPasswordCorrect = await compare(password, existedUser.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Wrong credentials!');
    }

    return isPasswordCorrect;
  }
}
