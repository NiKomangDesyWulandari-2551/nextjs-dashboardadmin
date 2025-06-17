
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

// Setup koneksi ke PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Tipe untuk response yang diharapkan komponen UI
interface InvoiceResponse {
  id: number;
  name: string;
  email: string;
  amount: number;
}

export async function GET() {
  try {
    const client = await pool.connect();

    const query = `
      SELECT 
        i.id,
        c.name,
        c.email,
        i."totalAmount" AS amount
      FROM "Invoice" i
      JOIN "Customer" c ON i."customerId" = c.id
      ORDER BY i."createdAt" DESC
      LIMIT 6
    `;

    const result = await pool.query<InvoiceResponse>(query);

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Gagal mengambil data invoices:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil invoices', details: error.message },
      { status: 500 }
    );
  }
}

// import { NextResponse } from 'next/server';
// import { pool } from '@/app/lib/db'; // ✅ gunakan pool yang sudah dideklarasikan

// // Tipe untuk response yang diharapkan komponen UI
// interface InvoiceResponse {
//   id: number;
//   name: string;
//   email: string;
//   amount: number;
// }

// export async function GET() {
//   try {
//     const query = `
//       SELECT 
//         i.id,
//         c.name,
//         c.email,
//         i."totalAmount" AS amount
//       FROM "Invoice" i
//       JOIN "Customer" c ON i."customerId" = c.id
//       ORDER BY i."createdAt" DESC
//       LIMIT 6
//     `;

//     const result = await pool.query<InvoiceResponse>(query); // ✅ langsung gunakan pool.query

//     return NextResponse.json(result.rows);
//   } catch (error: any) {
//     console.error('Gagal mengambil data invoices:', error);
//     return NextResponse.json(
//       { error: 'Gagal mengambil invoices', details: error.message },
//       { status: 500 }
//     );
//   }
// }
