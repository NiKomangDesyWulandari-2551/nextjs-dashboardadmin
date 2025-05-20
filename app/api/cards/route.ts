// import { NextResponse } from 'next/server';
// import { prisma } from 'app/lib/prisma';

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

// File: app/api/dashboard/cards/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET() {
  try {
    // Hitung jumlah customer
    const totalCustomers = await prisma.customer.count();

    // Hitung total revenue (jumlah total pembayaran)
    const totalRevenueAgg = await prisma.revenue.aggregate({
      _sum: { total: true },
    });
    const totalRevenue = totalRevenueAgg._sum.total || 0;

    // Hitung total produk
    const totalProducts = await prisma.product.count();

    // Hitung total transaksi
    const totalTransactions = await prisma.transaction.count();

    return NextResponse.json({
      totalCustomers,
      totalRevenue,
      totalProducts,
      totalTransactions,
    });
  } catch (error) {
    console.error('Failed to fetch dashboard cards data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard cards data' },
      { status: 500 }
    );
  }
}
