import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER || '',
  host: process.env.PGHOST || '',
  database: process.env.PGDATABASE || '',
  password: process.env.PGPASSWORD || '',
  port: Number(process.env.PGPORT) || 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false 
  }
});

pool.connect((err, client, release) => {
  if (err || !client) {
    console.error('Erro ao adquirir cliente', err?.stack || 'Erro desconhecido');

    return new Error('Erro ao adquirir cliente do pool');
  }

  console.log('Conectado ao banco de dados PostgreSQL com sucesso!');

  client.release();
});

export const postgresPool = pool;