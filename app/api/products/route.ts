import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category'); // ambil dari URL: ?category=food / drink

  try {
    const client = await pool.connect();

    let query = `
      SELECT p.id, p.name, p.price, p.image, p.description, c.name as category
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
    `;
    
    const values: any[] = [];

    // Tambahkan filter kategori jika ada
    if (category) {
      query += ` WHERE c.name = $1`;
      values.push(category);
    }

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
