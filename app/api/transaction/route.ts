import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // Query join "Transaction" dengan "Product" dan "Category" supaya data transaksi lengkap
    const query = `
      SELECT
        t.id,
        t."productId",
        p.name AS product_name,
        p.price AS product_price,
        t."buyerName",
        t.date,
        t."totalPrice",
        c.name AS category_name
      FROM "Transaction" t
      JOIN "Product" p ON t."productId" = p.id
      JOIN "Category" c ON p."categoryId" = c.id
      ORDER BY t.date DESC
    `;

    const result = await client.query(query);
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
