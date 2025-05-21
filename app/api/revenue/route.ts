import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // Query langsung dari tabel Revenue untuk ambil total revenue per bulan di tahun 2025
    const query = `
      SELECT
        id,
        TO_CHAR(date, 'Mon') AS month,
        EXTRACT(MONTH FROM date) AS month_num,
        total AS revenue
      FROM "Revenue"
      WHERE EXTRACT(YEAR FROM date) = 2025
      ORDER BY month_num
    `;

    const result = await client.query(query);
    client.release();

    const data = result.rows.map((row) => ({
      id: row.id,
      month: row.month,
      revenue: Number(row.revenue),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching revenue:', error);
    return NextResponse.json({ error: 'Failed to fetch revenue' }, { status: 500 });
  }
}

// import { NextResponse } from 'next/server';
// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// export async function GET() {
//   let client;
//   try {
//     if (!process.env.DATABASE_URL) {
//       throw new Error('DATABASE_URL tidak ditemukan di variabel lingkungan');
//     }

//     client = await pool.connect();
//     await client.query('BEGIN');

//     // Data untuk Cards
//     const customersQuery = `SELECT COUNT(*) AS count FROM "Customer"`;
//     const customersResult = await client.query(customersQuery);
//     const totalCustomers = Number(customersResult.rows[0].count);

//     const revenueQuery = `SELECT COALESCE(SUM(total), 0) AS total_revenue FROM "Revenue"`;
//     const revenueResult = await client.query(revenueQuery);
//     const totalRevenue = Number(revenueResult.rows[0].total_revenue);

//     const productsQuery = `SELECT COUNT(*) AS count FROM "Product"`;
//     const productsResult = await client.query(productsQuery);
//     const totalProducts = Number(productsResult.rows[0].count);

//     const transactionsQuery = `SELECT COUNT(*) AS count FROM "Transaction"`;
//     const transactionsResult = await client.query(transactionsQuery);
//     const totalTransactions = Number(transactionsResult.rows[0].count);

//     // Data untuk RevenueChart
//     const revenueChartQuery = `
//       SELECT
//         id,
//         TO_CHAR(date, 'Mon') AS month,
//         EXTRACT(MONTH FROM date) AS month_num,
//         total AS revenue
//       FROM "Revenue"
//       WHERE EXTRACT(YEAR FROM date) = 2025
//       ORDER BY month_num
//     `;
//     const revenueChartResult = await client.query(revenueChartQuery);
//     const revenueChartData = revenueChartResult.rows.map((row) => ({
//       id: row.id,
//       month: row.month,
//       revenue: Number(row.revenue),
//     }));

//     // Data untuk LatestInvoices
//     const latestInvoicesQuery = `
//       SELECT
//         i.id,
//         i."createdAt" AS date,
//         i."totalAmount" AS amount,
//         c.name AS customer_name,
//         c.email AS customer_email
//       FROM "Invoice" i
//       JOIN "Customer" c ON i."customerId" = c.id
//       ORDER BY i."createdAt" DESC
//       LIMIT 5
//     `;
//     const latestInvoicesResult = await client.query(latestInvoicesQuery);
//     const latestInvoicesData = latestInvoicesResult.rows.map((row) => ({
//       id: row.id,
//       date: row.date,
//       amount: Number(row.amount),
//       customer_name: row.customer_name,
//       customer_email: row.customer_email,
//     }));

//     await client.query('COMMIT');

//     return NextResponse.json({
//       cards: {
//         totalCustomers,
//         totalRevenue,
//         totalProducts,
//         totalTransactions,
//       },
//       revenueChart: revenueChartData,
//       latestInvoices: latestInvoicesData,
//     });
//   } catch (error) {
//     if (client) {
//       await client.query('ROLLBACK');
//     }
//     console.error('Error fetching dashboard data:', error);
//     return NextResponse.json(
//       { error: 'Gagal mengambil data dashboard', details: error.message },
//       { status: 500 }
//     );
//   } finally {
//     if (client) {
//       client.release();
//     }
//   }
// }