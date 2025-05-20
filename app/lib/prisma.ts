// import { PrismaClient } from "@/generated/prisma";
// import { LatestInvoice } from "./definitions";
// import { formatCurrency } from "./utils";

// const prisma = new PrismaClient();

// export async function fetchRevenuePrisma() {
//   try {
//     const data = await prisma.revenue.findMany();
//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch revenue data.");
//   }
// }

// export async function fetchProducts() {
//   try {
//     const products = await prisma.product.findMany({
//       select: {
//         id: true,
//         name: true,
//         price: true,
//       },
//       orderBy: {
//         id: 'asc',
//       },
//     });

//     return products.map(product => ({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//     }));
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch products data.");
//   }
// }

// export async function fetchProducts() {
//   try {
//     const products = await prisma.product.findMany({
//       select: {
//         id: true,
//         name: true,
//         price: true,
//       },
//       orderBy: {
//         id: 'asc',
//       },
//     });

//     // Filter produk dengan id valid dan log data
//     const validProducts = products
//       .filter(product => typeof product.id === 'string' && product.id.length > 0)
//       .map(product => ({
//         id: product.id,
//         name: product.name,
//         price: product.price,
//       }));

//     console.log("Data produk yang diambil:", validProducts);

//     return validProducts;
//   } catch (error) {
//     console.error("Error Database:", error);
//     return []; // Kembalikan array kosong jika gagal
//   }
// }

// export async function fetchRevenuePrisma() {
//   try {
//     const weeklyData = await prisma.$queryRaw<
//       { week_start: Date; revenue: number }[]
//     >(sql`
//       SELECT
//         date_trunc('week', "date") AS week_start,
//         SUM(total) AS revenue
//       FROM "Revenue"
//       GROUP BY week_start
//       ORDER BY week_start ASC
//       LIMIT 12
//     `);

//     return weeklyData;
//   } catch (error) {
//     console.error('Error fetching revenue data:', error);
//     return [];
//   }
// }
// export async function fetchTransactions() {
//   try {
//     const transactions = await prisma.transaction.findMany({
//       select: {
//         id: true,
//         productId: true,
//         product: {
//           select: {
//             name: true,
//           },
//         },
//         buyerName: true,
//         date: true,
//         totalPrice: true,
//       },
//       orderBy: {
//         date: 'desc',
//       },
//     });

//     return transactions.map(transaction => ({
//       id: transaction.id,
//       productId: transaction.productId,
//       productName: transaction.product.name,
//       buyerName: transaction.buyerName,
//       date: transaction.date.toISOString().slice(0, 10),
//       totalPrice: formatCurrency(transaction.totalPrice),
//     }));
//   } catch (error) {
//     console.error("Database Error:", error);
//     return [];
//   }
// }

// export async function fetchLatestInvoicesPrisma(): Promise<LatestInvoice[]> {
//   try {
//     const data = await prisma.invoice.findMany({
//       take: 5,
//       orderBy: {
//         createdAt: 'desc',
//       },
//       include: {
//         customer: {
//           select: {
//             name: true,
//             image_url: true,
//             email: true,
//           },
//         },
//       },
//     });

//     const latestInvoices = data.map((invoice) => ({
//       id: invoice.id,
//       amount: formatCurrency(invoice.totalAmount),
//       name: invoice.customer.name,
//       image_url: invoice.customer.image_url,
//       email: invoice.customer.email,
//     }));

//     return latestInvoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     return [];
//   }
// }

// export async function fetchCardDataPrisma() {
//   try {
//     const invoiceCountPromise = prisma.invoices.count();
//     const customerCountPromise = prisma.customers.count();
//     const invoiceStatusPromise = prisma.invoices.groupBy({
//       by: ["status"],
//       _sum: {
//         amount: true,
//       },
//     });

//     const data = await Promise.all([
//       invoiceCountPromise,
//       customerCountPromise,
//       invoiceStatusPromise,
//     ]);

//     const paid =
//       data[2].find((status) => status.status === "paid")?._sum.amount || 0;
//     const pending =
//       data[2].find((status) => status.status === "pending")?._sum.amount || 0;

//     return {
//       numberOfCustomers: data[1],
//       numberOfInvoices: data[0],
//       totalPaidInvoices: formatCurrency(paid),
//       totalPendingInvoices: formatCurrency(pending),
//     };
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch card data.");
//   }
// }

// export default prisma;
