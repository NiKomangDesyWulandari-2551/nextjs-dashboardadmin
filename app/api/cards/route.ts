
import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const customersQuery = `SELECT COUNT(*) FROM "Customer"`;
    const customersResult = await client.query(customersQuery);
    const totalCustomers = Number(customersResult.rows[0].count);

    const revenueQuery = `SELECT COALESCE(SUM(total), 0) AS total_revenue FROM "Revenue"`;
    const revenueResult = await client.query(revenueQuery);
    const totalRevenue = Number(revenueResult.rows[0].total_revenue);

    const productsQuery = `SELECT COUNT(*) FROM "Product"`;
    const productsResult = await client.query(productsQuery);
    const totalProducts = Number(productsResult.rows[0].count);

    const transactionsQuery = `SELECT COUNT(*) FROM "Transaction"`;
    const transactionsResult = await client.query(transactionsQuery);
    const totalTransactions = Number(transactionsResult.rows[0].count);

    client.release();

    return NextResponse.json({
      totalCustomers,
      totalRevenue,
      totalProducts,
      totalTransactions,
    });
  } catch (error) {
    console.error('Error fetching cards data:', error);
    return NextResponse.json({ error: 'Gagal mengambil data kartu' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { pool } from '@/app/lib/db'; // Gunakan pool yang sudah diekspor, jangan buat ulang

// export async function GET() {
//   try {
//     const client = await pool.connect();

//     const customersQuery = `SELECT COUNT(*) FROM "Customer"`;
//     const customersResult = await client.query(customersQuery);
//     const totalCustomers = Number(customersResult.rows[0].count);

//     const revenueQuery = `SELECT COALESCE(SUM(total), 0) AS total_revenue FROM "Revenue"`;
//     const revenueResult = await client.query(revenueQuery);
//     const totalRevenue = Number(revenueResult.rows[0].total_revenue);

//     const productsQuery = `SELECT COUNT(*) FROM "Product"`;
//     const productsResult = await client.query(productsQuery);
//     const totalProducts = Number(productsResult.rows[0].count);

//     const transactionsQuery = `SELECT COUNT(*) FROM "Transaction"`;
//     const transactionsResult = await client.query(transactionsQuery);
//     const totalTransactions = Number(transactionsResult.rows[0].count);

//     client.release();

//     return NextResponse.json({
//       totalCustomers,
//       totalRevenue,
//       totalProducts,
//       totalTransactions,
//     });
//   } catch (error) {
//     console.error('Error fetching cards data:', error);
//     return NextResponse.json(
//       { error: 'Gagal mengambil data kartu', details: error instanceof Error ? error.message : String(error) },
//       { status: 500 }
//     );
//   }
// }
