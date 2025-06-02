import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // Neon connection string
});

// GET product by id (View)
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const result = await client.query(`
      SELECT p.id, p.name, p.price, p.image, p.description, c.name as category, p.stock, p.status
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE p.id = $1
    `, [params.id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT update product (Edit)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { name, price, image, description, category, stock, status } = body;

    const client = await pool.connect();

    // Ambil categoryId dari nama kategori
    const categoryResult = await client.query('SELECT id FROM "Category" WHERE name = $1', [category]);
    if (categoryResult.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }
    const categoryId = categoryResult.rows[0].id;

    // Update produk
    const updateResult = await client.query(
      `UPDATE "Product"
       SET name = $1, price = $2, image = $3, description = $4, "categoryId" = $5, stock = $6, status = $7
       WHERE id = $8
       RETURNING *`,
      [name, price, image, description, categoryId, stock, status, params.id]
    );
    client.release();

    if (updateResult.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(updateResult.rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    const deleteResult = await client.query('DELETE FROM "Product" WHERE id = $1', [params.id]);
    client.release();

    if (deleteResult.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
