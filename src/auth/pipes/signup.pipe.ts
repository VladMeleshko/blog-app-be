import {Injectable, PipeTransform, ForbiddenException, Scope} from '@nestjs/common';

import {UserService} from '../../user/user.service';
import {SignupDto} from '../dtos/signup.dto';

@Injectable({scope: Scope.REQUEST})
export class SignupPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  async transform(signupDto: SignupDto): Promise<SignupDto> {
    const {email, password, confirmedPassword} = signupDto;

    if (password !== confirmedPassword) {
      throw new ForbiddenException('You need to confirm password');
    }

    const existedUser = await this.userService.getOne({where: {email}});

    if (existedUser) {
      throw new ForbiddenException("You can't create account with this email");
    }

    return signupDto;
  }
}
