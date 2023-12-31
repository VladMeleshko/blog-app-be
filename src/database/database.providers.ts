import {Provider} from '@nestjs/common';
import {DataSource, getMetadataArgsStorage} from 'typeorm';

import {DatabaseConnectionConfig} from './@types';
import dbConfig from './configuration';
import {DATABASE_CONNECTION} from '../constants/database';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    inject: [dbConfig.KEY],
    useFactory: async (
      config: DatabaseConnectionConfig
    ): Promise<DataSource> => {
      const ds = new DataSource({
        type: 'postgres',
        host: config.host,
        port: config.port,
        username: config.username,
        password: config.password,
        database: config.database,
        schema: config.schema,
        entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
        migrations: ['dist/src/migrations/mysql/*.js'],
        migrationsRun: true,
        synchronize: false,
        logging: !config.isProduction,
        applicationName: 'crypto-currency-server',
        connectTimeoutMS: 10000,
        maxQueryExecutionTime: 5000
      });
      await ds.initialize();
      return ds;
    }
  }
];
