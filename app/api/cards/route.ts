// import { NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// export async function GET() {
//   try {
//     const totalCustomers = await prisma.customer.count();
//     const totalRevenue = await prisma.revenue.aggregate({
//       _sum: { total: true },
//     });
//     const totalProducts = await prisma.product.count();
//     const totalTransactions = await prisma.transaction.count();

//     return NextResponse.json({
//       totalCustomers,
//       totalRevenue: totalRevenue._sum.total || 0,
//       totalProducts,
//       totalTransactions,
//     });
//   } catch (error) {
//     return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
//   }
// }

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