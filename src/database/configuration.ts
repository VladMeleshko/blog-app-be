import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';

import {DatabaseConnectionConfig} from './@types';
import {forReal} from '../utils/ts-helper.utils';

export const validationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().port().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
  DB_SCHEMA: Joi.string().required(),
  SERVICE_ENV: Joi.string().required()
});

export default registerAs('databaseConnection', (): DatabaseConnectionConfig => ({
  host: forReal(process.env.DB_HOST),
  port: forReal(Number(process.env.DB_PORT) || 5432),
  username: forReal(process.env.DB_USER),
  password: forReal(process.env.DB_PASSWORD),
  database: forReal(process.env.DB_DATABASE),
  schema: forReal(process.env.DB_SCHEMA),
  isProduction: forReal(process.env.SERVICE_ENV === 'prod')
}));
