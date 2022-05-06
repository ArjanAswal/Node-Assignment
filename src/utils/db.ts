import { Pool, QueryResult } from 'pg';
import logger from './logger';
const pool = new Pool({
  user: process.env.POSTGRES_USER ?? 'postgres',
  host: process.env.POSTGRES_HOST ?? 'localhost',
  database: process.env.POSTGRES_DATABASE ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  port: +process.env.POSTGRES_PORT! ?? 5432,
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default {
  query: async (text: string) => {
    const result = await pool.query(text);

    return result.rows;
  },
};
