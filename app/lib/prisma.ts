import { PrismaClient } from "@/generated/prisma";
import { LatestInvoice } from "./definitions";
import { formatCurrency } from "./utils";

const prisma = new PrismaClient();

export async function fetchRevenuePrisma() {
  try {
    const data = await prisma.revenue.findMany();
    return data;
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
<<<<<<< HEAD
      // Hapus include customer jika tidak ada relasi customer
      // include: {
      //   customer: {
      //     select: {
      //       name: true,
      //       image_url: true,
      //       email: true,
      //     },
      //   },
      // },
=======
      include: {
        customer: {
          select: {
            name: true,
            image_url: true,
            email: true,
          },
        },
      },
>>>>>>> 8305edb42fd3f83201536e74fa2033bad6dd0c2a
    });

    const latestInvoices = data.map((invoice) => ({
      amount: formatCurrency(invoice.amount),
<<<<<<< HEAD
      // Jika tidak ada relasi customer, gunakan field yang ada di invoices
      // name: invoice.customer?.name,
      // image_url: invoice.customer?.image_url,
      // email: invoice.customer?.email,
=======
      name: invoice.customer.name,
      image_url: invoice.customer.image_url,
      email: invoice.customer.email,
>>>>>>> 8305edb42fd3f83201536e74fa2033bad6dd0c2a
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
<<<<<<< HEAD
}

export default prisma;
=======
}
>>>>>>> 8305edb42fd3f83201536e74fa2033bad6dd0c2a
