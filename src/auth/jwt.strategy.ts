import {Inject, Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';

import {JwtConfigurations} from './@types';
import configuration from './configurationJWT';
import {UserService} from '../user/user.service';

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    @Inject(configuration.KEY)
    private readonly jwtConfigurations: JwtConfigurations
  ) {
    super({
      secretOrKey: jwtConfigurations.jwtKey,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      passReqToCallback: true
    });
  }

  async validate(req: Request, payload: any) {
    const user = await this.userService.getOne({
      where: {email: payload.email},
      relations: {
        role: {
          rules: true
        }
      }
    });

    return user;
  }
}
