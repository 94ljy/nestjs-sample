import { DataSource } from 'typeorm';
import * as DotEnv from 'dotenv';

DotEnv.config({ path: './env/.env.local' });

const host = process.env.DATABASE_HOST || 'localhost';
const port = Number(process.env.DATABASE_PORT) || 5432;
const database = process.env.DATABASE_NAME || 'api';
const username = process.env.DATABASE_USER || 'postgres';
const password = process.env.DATABASE_PASSWORD;

const dataSource = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  database: database,
  username: username,
  password: password,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
});

export default dataSource;
