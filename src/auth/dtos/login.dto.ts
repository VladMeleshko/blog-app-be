import {ApiProperty} from '@nestjs/swagger';
import {MaxLength, IsEmail, IsNotEmpty} from 'class-validator';

import IsStrongPassword from '../../utils/decorators/is-strong-password.decorator';

export class LoginDto {
  @ApiProperty({name: 'email', maxLength: 50})
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @ApiProperty({name: 'password', minLength: 8})
  @IsStrongPassword()
  readonly password: string;
}
