import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';

import configuration, {validationSchema} from './configuration';
import {databaseProviders} from './database.providers';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      load: [configuration]
    })
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule {}
