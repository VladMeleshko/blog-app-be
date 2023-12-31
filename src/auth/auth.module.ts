import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';

import {JwtConfigurations} from './@types';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import jwtConfiguration, {jwtValidationSchema} from './configurationJWT';
import JwtStrategy from './jwt.strategy';
import {DatabaseModule} from '../database/database.module';
import {UserModule} from '../user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: jwtValidationSchema,
      load: [jwtConfiguration]
    }),
    UserModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot({
          validationSchema: jwtValidationSchema,
          load: [jwtConfiguration]
        })
      ],
      useFactory: async (configService: JwtConfigurations) => ({
        secret: configService.jwtKey,
        signOptions: {expiresIn: '24h'}
      }),
      inject: [jwtConfiguration.KEY]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
