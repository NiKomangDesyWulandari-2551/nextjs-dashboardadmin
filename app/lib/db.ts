import { Pool } from 'pg';

declare global {
  var pool: Pool | undefined;
}

const pool =
  global.pool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    // Optional—tambahkan jika butuh:
    // idleTimeoutMillis: 10_000,         // Lepas koneksi idle lebih cepat
    // connectionTimeoutMillis: 5_000,   // Fail‑fast bila DB tak merespons
    // ssl: { rejectUnauthorized: false } // Kadang perlu untuk Neon + Node < v20
  });

if (process.env.NODE_ENV !== 'production') global.pool = pool;

export { pool };
