import {ApiProperty} from '@nestjs/swagger';
import {MaxLength, IsString, IsNotEmpty} from 'class-validator';

import {LoginDto} from './login.dto';
import IsStrongPassword from '../../utils/decorators/is-strong-password.decorator';

export class SignupDto extends LoginDto {
  @ApiProperty({name: 'firstName', maxLength: 150})
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly firstName: string;

  @ApiProperty({name: 'lastName', maxLength: 150})
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  readonly lastName: string;

  @ApiProperty({name: 'confirmedPassword', minLength: 8})
  @IsStrongPassword()
  readonly confirmedPassword: string;
}
