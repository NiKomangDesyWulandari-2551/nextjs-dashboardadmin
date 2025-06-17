

//ini kode bener2
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET: Fetch products by category and search
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('search')?.toLowerCase() ?? '';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const limit = parseInt(searchParams.get('limit') ?? '5', 10);

    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: 'Parameter page tidak valid' }, { status: 400 });
    }
    if (isNaN(limit) || limit < 1) {
      return NextResponse.json({ error: 'Parameter limit tidak valid' }, { status: 400 });
    }

    const offset = (page - 1) * limit;
    const client = await pool.connect();

    let countQuery = `
      SELECT COUNT(*) AS total
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE
        (LOWER(p.name) LIKE $1 OR CAST(p.id AS TEXT) LIKE $1)
    `;
    const countValues = [`%${search}%`];
    if (category) {
      countQuery += ` AND c.name = $2`;
      countValues.push(category);
    }

    const countResult = await client.query(countQuery, countValues);
    const total = parseInt(countResult.rows[0].total, 10);

    let query = `
      SELECT
        p.id,
        p.name,
        p.price,
        p.image,
        p.description,
        p.stock,
        p.status,
        c.id AS "categoryId",
        c.name AS category
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
      WHERE
        (LOWER(p.name) LIKE $1 OR CAST(p.id AS TEXT) LIKE $1)
    `;
    const values = [`%${search}%`];
    if (category) {
      query += ` AND c.name = $2`;
      values.push(category);
    }

    query += ` ORDER BY p."createdAt" DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit.toString(), offset.toString());

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({
      data: result.rows,
      total,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(req: Request) {
  try {
    const { name, price, image, description, stock, status, categoryId } = await req.json();

    console.log('POST request body:', { name, price, image, description, stock, status, categoryId });

    // Validasi input
    if (!name || price == null || stock == null || status == null || categoryId == null) {
      const missingFields = [];
      if (!name) missingFields.push('name');
      // Periksa price, stock, dan categoryId agar bukan null/undefined
      if (price == null) missingFields.push('price');
      if (stock == null) missingFields.push('stock');
      if (status == null) missingFields.push('status'); // Tambahkan validasi untuk status
      if (categoryId == null) missingFields.push('categoryId');
      return NextResponse.json(
        { error: `Field berikut harus diisi: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    // Validasi tipe data dan nilai (lebih spesifik dari API transaksi yang tidak ada ini)
    if (typeof price !== 'number' || price < 0) {
      return NextResponse.json({ error: 'Harga harus berupa angka positif.' }, { status: 400 });
    }
    if (typeof stock !== 'number' || stock < 0) {
      return NextResponse.json({ error: 'Stok harus berupa angka non-negatif.' }, { status: 400 });
    }
    if (typeof categoryId !== 'number' || categoryId <= 0) {
      return NextResponse.json({ error: 'ID kategori tidak valid.' }, { status: 400 });
    }

    const client = await pool.connect(); // Ambil koneksi dari pool

    try {
      // Validate categoryId exists
      // Sesuaikan nama tabel jika di DB Anda namanya 'categories' (huruf kecil)
      const categoryCheck = await client.query('SELECT id FROM "Category" WHERE id = $1', [categoryId]);
      if (categoryCheck.rowCount === 0) {
        return NextResponse.json({ error: 'Kategori tidak ditemukan' }, { status: 400 });
      }

      const insertQuery = `
        INSERT INTO "Product" (name, price, image, description, stock, status, "categoryId")
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `;
      const values = [
        name,
        price,
        image || null,         // Menggunakan null jika image kosong
        description || null,   // Menggunakan null jika description kosong
        stock,
        status,
        categoryId
      ];

      const result = await client.query(insertQuery, values);
      return NextResponse.json(result.rows[0], { status: 201 }); // Mengembalikan 201 Created
    } catch (dbError: any) {
      // Penanganan error spesifik database (contoh untuk PostgreSQL)
      if (dbError.code === '23505') { // PostgreSQL unique violation error code
        return NextResponse.json({ error: 'Nama produk sudah ada, silakan gunakan nama lain.' }, { status: 409 }); // 409 Conflict
      }
      throw dbError; // Lempar kembali error jika bukan error spesifik yang ditangani
    } finally {
      client.release(); // Penting: Lepaskan client kembali ke pool
    }

  } catch (error: any) {
    console.error('Error inserting product:', error);
    // Error yang tidak ditangani di try-catch internal akan masuk ke sini
    return NextResponse.json({ error: 'Gagal menambahkan produk: ' + error.message }, { status: 500 });
  }
}
// PUT: Update a product by ID
export async function PUT(req: Request) {
  try {
    const { id, name, price, image, description, stock, status, categoryId } = await req.json();

    console.log('PUT request body:', { id, name, price, image, description, stock, status, categoryId });

    if (!id || !name || !price || !categoryId || stock == null || !status) {
      const missingFields = [];
      if (!id) missingFields.push('id');
      if (!name) missingFields.push('name');
      if (!price) missingFields.push('price');
      if (!categoryId) missingFields.push('categoryId');
      if (stock == null) missingFields.push('stock');
      if (!status) missingFields.push('status');
      return NextResponse.json(
        { error: `Field berikut harus diisi: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    // Validate categoryId exists
    const categoryCheck = await client.query('SELECT id FROM "Category" WHERE id = $1', [categoryId]);
    if (categoryCheck.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: 'Kategori tidak ditemukan' }, { status: 400 });
    }

    const updateQuery = `
      UPDATE "Product"
      SET name = $1,
          price = $2,
          image = $3,
          description = $4,
          stock = $5,
          status = $6,
          "categoryId" = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [name, price, image || null, description || null, stock, status, categoryId, id];

    const result = await client.query(updateQuery, values);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Gagal mengupdate produk' }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID produk harus disertakan' }, { status: 400 });
    }

    const client = await pool.connect();

    const deleteQuery = `
      DELETE FROM "Product"
      WHERE id = $1
      RETURNING *
    `;
    const result = await client.query(deleteQuery, [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Produk tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produk berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Gagal menghapus produk' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { pool } from '@/app/lib/db'; // ✅ JANGAN override pool lagi!

// // GET: Fetch products
// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const search = searchParams.get('search')?.toLowerCase() ?? '';
//     const category = searchParams.get('category');
//     const page = parseInt(searchParams.get('page') ?? '1', 10);
//     const limit = parseInt(searchParams.get('limit') ?? '5', 10);

//     if (isNaN(page) || page < 1) {
//       return NextResponse.json({ error: 'Parameter page tidak valid' }, { status: 400 });
//     }
//     if (isNaN(limit) || limit < 1) {
//       return NextResponse.json({ error: 'Parameter limit tidak valid' }, { status: 400 });
//     }

//     const offset = (page - 1) * limit;
//     const client = await pool.connect();

//     let countQuery = `
//       SELECT COUNT(*) AS total
//       FROM "Product" p
//       JOIN "Category" c ON p."categoryId" = c.id
//       WHERE (LOWER(p.name) LIKE $1 OR CAST(p.id AS TEXT) LIKE $1)
//     `;
//     const countValues = [`%${search}%`];
//     if (category) {
//       countQuery += ` AND c.name = $2`;
//       countValues.push(category);
//     }

//     const countResult = await client.query(countQuery, countValues);
//     const total = parseInt(countResult.rows[0].total, 10);

//     let query = `
//       SELECT
//         p.id, p.name, p.price, p.image, p.description, p.stock, p.status,
//         c.id AS "categoryId", c.name AS category
//       FROM "Product" p
//       JOIN "Category" c ON p."categoryId" = c.id
//       WHERE (LOWER(p.name) LIKE $1 OR CAST(p.id AS TEXT) LIKE $1)
//     `;
//     const values = [`%${search}%`];
//     if (category) {
//       query += ` AND c.name = $2`;
//       values.push(category);
//     }

//     query += ` ORDER BY p."createdAt" DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
//     values.push(limit.toString(), offset.toString());

//     const result = await client.query(query, values);
//     client.release();

//     return NextResponse.json({ data: result.rows, total });
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ error: 'Gagal mengambil data produk' }, { status: 500 });
//   }
// }
