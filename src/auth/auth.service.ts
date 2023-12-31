import {Injectable, ForbiddenException, Inject} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {hash} from 'bcrypt';
import {DataSource} from 'typeorm';

import {LoginResponse} from './@types';
import {LoginDto} from './dtos/login.dto';
import {SignupDto} from './dtos/signup.dto';
import {DATABASE_CONNECTION} from '../constants/database';
import {USER_ROLES} from '../constants/datatypes';
import UserEntity from '../user/entities/user.entity';
import {UserService} from '../user/user.service';
import {forReal} from '../utils/ts-helper.utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject(DATABASE_CONNECTION)
    private readonly databaseConnection: DataSource,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  public async login(loginDto: LoginDto): Promise<LoginResponse> {
    const {email, password} = loginDto;

    const user = await this.userService.getOne({
      where: {email},
      relations: {
        userPersonalInfo: true,
        role: true
      }
    });

    if (!user) {
      throw new ForbiddenException('Wrong credentials!');
    }

    try {
      await this.userService.checkPassword(user, password);
    } catch {
      throw new ForbiddenException('Wrong credentials!');
    }

    const token = this.jwtService.sign({email: user.email});

    return {
      token,
      email,
      firstName: user.userPersonalInfo.firstName,
      lastName: user.userPersonalInfo.lastName,
      role: user.role.value
    };
  }

  public async signup(signupDto: SignupDto): Promise<string> {
    const userRole = await this.userService.getOneRole({
      where: {
        value: USER_ROLES.USER
      }
    });

    await this.databaseConnection.transaction(async (manager) => {
      await manager.getRepository(UserEntity).save({
        ...signupDto,
        role: forReal(userRole),
        password: await hash(signupDto.password, 10),
        userPersonalInfo: {
          ...signupDto
        }
      });
    });

    return 'OK';
  }
}
