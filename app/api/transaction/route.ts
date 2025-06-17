

import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() ?? '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Parameter page tidak valid' }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: 'Parameter limit tidak valid' }, { status: 400 });
    }

    const offset = (page - 1) * limit;
    const client = await pool.connect();

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM "Transaction" t
      JOIN "Product" p ON t."productId" = p.id
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE
        LOWER(t."buyerName") LIKE $1 OR
        CAST(t.id AS TEXT) LIKE $1 OR
        CAST(t."productId" AS TEXT) LIKE $1
    `;
    const countValues = [`%${search}%`];
    const countResult = await client.query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].total, 10);

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
      WHERE
        LOWER(t."buyerName") LIKE $1 OR
        CAST(t.id AS TEXT) LIKE $1 OR
        CAST(t."productId" AS TEXT) LIKE $1
      ORDER BY t.date DESC
      LIMIT $2 OFFSET $3
    `;
    const values = [`%${search}%`, limit, offset];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({
      data: result.rows,
      total,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { productId, buyerName, totalPrice } = await req.json();

    if (!productId || !buyerName || !totalPrice) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    const client = await pool.connect();
    const date = new Date().toISOString();

    const insertQuery = `
      INSERT INTO "Transaction" ("productId", "buyerName", "date", "totalPrice")
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;

    const result = await client.query(insertQuery, [productId, buyerName, date, totalPrice]);
    client.release();

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting transaction:', error);
    return NextResponse.json({ error: 'Gagal menambahkan transaksi' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, productId, buyerName, totalPrice } = await req.json();

    if (!id || !productId || !buyerName || !totalPrice) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    const client = await pool.connect();

    const updateQuery = `
      UPDATE "Transaction"
      SET "productId" = $1,
          "buyerName" = $2,
          "totalPrice" = $3
      WHERE id = $4
      RETURNING *
    `;

    const result = await client.query(updateQuery, [productId, buyerName, totalPrice, id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating transaction:', error);
    return NextResponse.json({ error: 'Gagal mengupdate transaksi' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID transaksi harus disertakan' }, { status: 400 });
    }

    const client = await pool.connect();

    const deleteQuery = `
      DELETE FROM "Transaction"
      WHERE id = $1
      RETURNING *
    `;

    const result = await client.query(deleteQuery, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { pool } from '@/app/lib/db';

// // GET: Ambil transaksi dengan filter pencarian dan pagination
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const search = searchParams.get('search')?.toLowerCase() ?? '';
//     const page = parseInt(searchParams.get('page') || '1', 10);
//     const limit = parseInt(searchParams.get('limit') || '5', 10);

//     if (isNaN(page) || page < 1) {
//       return NextResponse.json({ error: 'Parameter page tidak valid' }, { status: 400 });
//     }
//     if (isNaN(limit) || limit < 1) {
//       return NextResponse.json({ error: 'Parameter limit tidak valid' }, { status: 400 });
//     }

//     const offset = (page - 1) * limit;
//     const client = await pool.connect();

//     const countQuery = `
//       SELECT COUNT(*) AS total
//       FROM "Transaction" t
//       JOIN "Product" p ON t."productId" = p.id
//       JOIN "Category" c ON p."categoryId" = c.id
//       WHERE
//         LOWER(t."buyerName") LIKE $1 OR
//         CAST(t.id AS TEXT) LIKE $1 OR
//         CAST(t."productId" AS TEXT) LIKE $1
//     `;
//     const countValues = [`%${search}%`];
//     const countResult = await client.query(countQuery, countValues);
//     const total = parseInt(countResult.rows[0].total, 10);

//     const query = `
//       SELECT
//         t.id,
//         t."productId",
//         p.name AS product_name,
//         p.price AS product_price,
//         t."buyerName",
//         t.date,
//         t."totalPrice",
//         c.name AS category_name
//       FROM "Transaction" t
//       JOIN "Product" p ON t."productId" = p.id
//       JOIN "Category" c ON p."categoryId" = c.id
//       WHERE
//         LOWER(t."buyerName") LIKE $1 OR
//         CAST(t.id AS TEXT) LIKE $1 OR
//         CAST(t."productId" AS TEXT) LIKE $1
//       ORDER BY t.date DESC
//       LIMIT $2 OFFSET $3
//     `;
//     const values = [`%${search}%`, limit, offset];

//     const result = await client.query(query, values);
//     client.release();

//     return NextResponse.json({
//       data: result.rows,
//       total,
//     });
//   } catch (error) {
//     console.error('Error fetching transactions:', error);
//     return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
//   }
// }

// // POST: Tambah transaksi baru
// export async function POST(req: Request) {
//   try {
//     const { productId, buyerName, totalPrice } = await req.json();

//     if (!productId || !buyerName || !totalPrice) {
//       return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
//     }

//     const client = await pool.connect();
//     const date = new Date().toISOString();

//     const insertQuery = `
//       INSERT INTO "Transaction" ("productId", "buyerName", "date", "totalPrice")
//       VALUES ($1, $2, $3, $4)
//       RETURNING *
//     `;

//     const result = await client.query(insertQuery, [productId, buyerName, date, totalPrice]);
//     client.release();

//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error inserting transaction:', error);
//     return NextResponse.json({ error: 'Gagal menambahkan transaksi' }, { status: 500 });
//   }
// }

// // PUT: Update transaksi
// export async function PUT(req: Request) {
//   try {
//     const { id, productId, buyerName, totalPrice } = await req.json();

//     if (!id || !productId || !buyerName || !totalPrice) {
//       return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
//     }

//     const client = await pool.connect();

//     const updateQuery = `
//       UPDATE "Transaction"
//       SET "productId" = $1,
//           "buyerName" = $2,
//           "totalPrice" = $3
//       WHERE id = $4
//       RETURNING *
//     `;

//     const result = await client.query(updateQuery, [productId, buyerName, totalPrice, id]);
//     client.release();

//     if (result.rowCount === 0) {
//       return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
//     }

//     return NextResponse.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error updating transaction:', error);
//     return NextResponse.json({ error: 'Gagal mengupdate transaksi' }, { status: 500 });
//   }
// }

// // DELETE: Hapus transaksi
// export async function DELETE(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return NextResponse.json({ error: 'ID transaksi harus disertakan' }, { status: 400 });
//     }

//     const client = await pool.connect();

//     const deleteQuery = `
//       DELETE FROM "Transaction"
//       WHERE id = $1
//       RETURNING *
//     `;

//     const result = await client.query(deleteQuery, [id]);
//     client.release();

//     if (result.rowCount === 0) {
//       return NextResponse.json({ error: 'Transaksi tidak ditemukan' }, { status: 404 });
//     }

//     return NextResponse.json({ message: 'Transaksi berhasil dihapus' });
//   } catch (error) {
//     console.error('Error deleting transaction:', error);
//     return NextResponse.json({ error: 'Gagal menghapus transaksi' }, { status: 500 });
//   }
// }
