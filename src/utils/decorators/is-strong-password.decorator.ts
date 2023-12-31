import {applyDecorators} from '@nestjs/common';
import {IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';

export default (): PropertyDecorator => applyDecorators(
  Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*\d))\S{8,}$/, {
    message:
      'Password must consist of at least 8 characters and must contain at least one number, one letter in uppercase and one letter in lowercase'
  }),
  MinLength(8),
  IsNotEmpty(),
  IsString()
);
