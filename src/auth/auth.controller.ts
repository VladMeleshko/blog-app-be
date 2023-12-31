import {Controller, Post, Body} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {LoginResponse} from './@types';
import {AuthService} from './auth.service';
import {LoginDto} from './dtos/login.dto';
import {SignupDto} from './dtos/signup.dto';
import {SignupPipe} from './pipes/signup.pipe';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('sign-up')
  public async signup(@Body(SignupPipe) signupDto: SignupDto): Promise<any> {
    return this.authService.signup(signupDto);
  }
}
