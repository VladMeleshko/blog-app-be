const dotenv = require('dotenv');
const fs = require('fs');

const env =
  process.env.SERVICE_ENV === 'prod'
    ? {...process.env}
    : dotenv.parse(fs.readFileSync('.env'));

const migrations =
  process.env.SERVICE_ENV === 'prod'
    ? [`${__dirname}/dist/migrations/mysql/*.js`]
    : [`${__dirname}/dist/migrations/mysql/*.js`];

module.exports = [
  {
    type: 'postgres',
    host: env.DB_HOST,
    port: parseInt(env.DB_PORT) || 5432,
    username: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    schema: env.DB_SCHEMA,
    entities: [
      `${__dirname}/dist/**/entities/*.entity{.js,.ts}`,
      `${__dirname}/dist/**/*.entity{.js,.ts}`
    ],
    migrationsRun: false,
    migrations,
    cli: {
      migrationsDir: `${__dirname}/src/migrations/mysql`
    },
    synchronize: false,
    logging: true,
    connectTimeoutMS: 1000
  }
];
