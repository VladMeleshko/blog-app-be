import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';

import {JwtConfigurations} from './@types';
import {forReal} from '../utils/ts-helper.utils';

export const jwtValidationSchema = Joi.object({
  JWT_KEY: Joi.string().required()
});

export default registerAs(
  'jwtConfig',
  (): JwtConfigurations => ({
    jwtKey: forReal(process.env.JWT_KEY)
  })
);
