// import { NextResponse } from 'next/server';
// import { prisma } from '@/app/lib/prisma';

// interface InvoiceResponse {
//   id: number;
//   name: string;
//   email: string;
//   image_url: string; // kosong karena schema ga ada image
//   amount: number;
// }

// export async function GET() {
//   try {
//     const invoices = await prisma.invoice.findMany({
//       orderBy: { createdAt: 'desc' },
//       take: 10,
//       include: {
//         customer: {
//           select: { name: true, email: true },
//         },
//       },
//     });

//     const data: InvoiceResponse[] = invoices.map((inv) => ({
//       id: inv.id,
//       name: inv.customer?.name ?? 'Tidak Diketahui',
//       email: inv.customer?.email ?? 'Tidak Diketahui',
//       image_url: '',
//       amount: inv.totalAmount,
//     }));

//     return NextResponse.json(data);
//   } catch (error: any) {
//     console.error('Gagal mengambil invoices:', error);
//     return NextResponse.json(
//       { error: 'Gagal mengambil invoices', details: error.message },
//       { status: 500 }
//     );
//   }
// }

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
      LIMIT 5
    `;

    const result = await client.query<InvoiceResponse>(query);
    client.release();

    return NextResponse.json(result.rows);
  } catch (error: any) {
    console.error('Gagal mengambil data invoices:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil invoices', details: error.message },
      { status: 500 }
    );
  }
}
