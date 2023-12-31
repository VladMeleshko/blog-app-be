export type DatabaseConnectionConfig = {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema: string;
  isProduction: boolean;
};
