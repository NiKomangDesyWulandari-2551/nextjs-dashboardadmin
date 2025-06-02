// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const category = searchParams.get('category'); // ambil dari URL: ?category=food / drink

//   try {
//     const client = await pool.connect();

//     let query = `
//       SELECT p.id, p.name, p.price, p.image, p.description, c.name as category
//       FROM "Product" p
//       JOIN "Category" c ON p."categoryId" = c.id
//     `;
    
//     const values: any[] = [];

//     // Tambahkan filter kategori jika ada
//     if (category) {
//       query += ` WHERE c.name = $1`;
//       values.push(category);
//     }

//     const result = await client.query(query, values);
//     client.release();

//     return NextResponse.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category'); // ?category=Drink
  const search = searchParams.get('search');     // ?search=tea

  try {
    const client = await pool.connect();

    let query = `
      SELECT p.id, p.name, p.price, p.image, p.description, c.name as category
      FROM "Product" p
      JOIN "Category" c ON p."categoryId" = c.id
    `;

    const conditions: string[] = [];
    const values: any[] = [];

    if (category) {
      conditions.push(`c.name = $${values.length + 1}`);
      values.push(category);
    }

    if (search) {
      conditions.push(`LOWER(p.name) LIKE LOWER($${values.length + 1})`);
      values.push(`%${search}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' AND ');
    }

    query += ` ORDER BY p."createdAt" DESC`;

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const category = searchParams.get('category');
//   const search = searchParams.get('search');

//   try {
//     const client = await pool.connect();

//     let query = `
//       SELECT p.id, p.name, p.price, p.image, p.description, c.name as category, p.stock, p.status
//       FROM "Product" p
//       JOIN "Category" c ON p."categoryId" = c.id
//     `;

//     const conditions: string[] = [];
//     const values: any[] = [];

//     if (category) {
//       conditions.push(`LOWER(c.name) = LOWER($${values.length + 1})`);
//       values.push(category);
//     }

//     if (search) {
//       conditions.push(`LOWER(p.name) LIKE LOWER($${values.length + 1})`);
//       values.push(`%${search}%`);
//     }

//     if (conditions.length > 0) {
//       query += ` WHERE ` + conditions.join(' AND ');
//     }

//     query += ` ORDER BY p."createdAt" DESC`;

//     console.log('Query:', query);
//     console.log('Values:', values);

//     const result = await client.query(query, values);
//     client.release();

//     return NextResponse.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
//   }
// }
