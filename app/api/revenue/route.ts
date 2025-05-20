import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // Query langsung dari tabel Revenue untuk ambil total revenue per bulan di tahun 2025
    const query = `
      SELECT
        id,
        TO_CHAR(date, 'Mon') AS month,
        EXTRACT(MONTH FROM date) AS month_num,
        total AS revenue
      FROM "Revenue"
      WHERE EXTRACT(YEAR FROM date) = 2025
      ORDER BY month_num
    `;

    const result = await client.query(query);
    client.release();

    const data = result.rows.map((row) => ({
      id: row.id,
      month: row.month,
      revenue: Number(row.revenue),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return NextResponse.json({ error: 'Failed to fetch revenue' }, { status: 500 });
  }
}
