import { PrismaClient } from "@/generated/prisma";
import { LatestInvoice } from "./definitions";
import { formatCurrency } from "./utils";

const prisma = new PrismaClient();

// export async function fetchRevenuePrisma() {
//   try {
//     const data = await prisma.revenue.findMany();
//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

export async function fetchProducts() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    return products.map(product => ({
      id: product.id,
      name: product.name,
      price: product.price,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch products data.");
  }
}

export async function fetchRevenuePrisma() {
  try {
    // Query raw SQL untuk group by minggu (week start date) dan sum total revenue
    const weeklyData = await prisma.$queryRaw<
      { week_start: Date; revenue: number }[]
    >`
      SELECT
        date_trunc('week', "date") AS week_start,
        SUM(total) AS revenue
      FROM "Revenue"
      GROUP BY week_start
      ORDER BY week_start ASC
      LIMIT 12
    `;

    // Mapping data ke format yang frontend bisa pakai
    return weeklyData.map(item => ({
      week: item.week_start.toISOString().slice(0, 10), // format yyyy-mm-dd
      revenue: Number(item.revenue),
    }));
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}


export async function fetchLatestInvoicesPrisma() {
  try {
    const data = await prisma.invoices.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
      include: {
        customer: {
          select: {
            name: true,
            image_url: true,
            email: true,
          },
        },
      },
    });

    const latestInvoices = data.map((invoice) => ({
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      image_url: invoice.customer.image_url,
      email: invoice.customer.email,
      id: invoice.id,
    })) as unknown as LatestInvoice[];

    return latestInvoices;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}

export async function fetchCardDataPrisma() {
  try {
    const invoiceCountPromise = prisma.invoices.count();
    const customerCountPromise = prisma.customers.count();
    const invoiceStatusPromise = prisma.invoices.groupBy({
      by: ["status"],
      _sum: {
        amount: true,
      },
    });

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const paid =
      data[2].find((status) => status.status === "paid")?._sum.amount || 0;
    const pending =
      data[2].find((status) => status.status === "pending")?._sum.amount || 0;

    return {
      numberOfCustomers: data[1],
      numberOfInvoices: data[0],
      totalPaidInvoices: formatCurrency(paid),
      totalPendingInvoices: formatCurrency(pending),
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}

export default prisma;
