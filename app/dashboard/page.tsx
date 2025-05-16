// import React from 'react';
// // import SoulCounter from '@/app/components/SoulCounter';
// // import RecentSouls from '@/app/components/RecentSouls';
// // import BanquetProgress from '@/app/components/BanquetProgress';
// import RevenueChart from '../ui/dashboard/revenue-chart';
// import LatestInvoices from '../ui/dashboard/latest-invoices';
// import { lacquer } from '../ui/font';
// import { fetchRevenuePrisma } from '@/app/lib/prisma';

// // interface DashboardProps {
// //   soulCount: number;
// //   recentCount: number;
// //   banquetProgress: number;

// // }

// export default async function Page() {
//   const revenue= await fetchRevenuePrisma();
//   return ( 
//     <main>
//       <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>
//       </h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {}
//       </div>
//       <div className="mt-6 grid grid-cols-l gap-6 md:grid-cols-4 lg:grid-cols-8">
//         {<RevenueChart revenue={revenue} />}
//         {/* {<LatestInvoices latestInvoices={latestInvoices} />} */}
//       </div>
//     </main>
//   );
// }

// // const Dashboard: React.FC<DashboardProps> = ({ soulCount, recentCount, banquetProgress }) => {
// //   return (
// //     <div className="relative min-h-screen flex items-center justify-center px-8 pt-0">
      
// //       {/* Grid Container */}
// //       <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mt-0 absolute top-0">
// //         <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
// //           <SoulCounter count={soulCount} className="w-full h-full flex justify-center items-center" />
// //         </div>
// //         <div className="flex justify-start" style={{ width: '325px', height: '195px' }}>
// //           <RecentSouls count={recentCount} className="w-full h-full flex justify-center items-center" />
// //         </div>
// //         <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
// //           <BanquetProgress progress={banquetProgress} className="w-full h-full flex justify-center items-center" />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default function DashboardPage() {
// //   return <Dashboard soulCount={40} recentCount={10} banquetProgress={30} />;
// // }

import React from 'react';
import { lacquer } from '../ui/font';
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import ProductCatalog from '../components/ProductCard';
import TransactionHistory from '../components/TransactionHistory';
import { fetchRevenuePrisma, fetchLatestInvoicesPrisma, fetchProducts  } from '@/app/lib/prisma';

export default async function Page() {
  let revenue: { week: string; revenue: number }[] = [];
  let latestInvoices: LatestInvoice[] = [];
  let products: { id: string; name: string; price: number }[] = [];

  try {
    [revenue, latestInvoices, products] = await Promise.all([
      fetchRevenuePrisma(),
      fetchLatestInvoicesPrisma(),
      fetchProducts(),
    ]);
  } catch (error) {
    console.error("Gagal mengambil data dashboard:", error);
    // Berikan nilai default untuk mencegah undefined
    revenue = [];
    latestInvoices = [];
    products = [];
  }

// export default async function Page() {
//   const revenue = await fetchRevenuePrisma();
//   const latestInvoices = await fetchLatestInvoicesPrisma();
//   const {
//     numberOfInvoices,
//     numberOfCustomers,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   } = await fetchCardDataPrisma();
 
//   return (
//     <main>
//       <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
//         Dashboard
//       </h1>
//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         <Card title="Collected" value={totalPaidInvoices} type="collected" />
//         <Card title="Pending" value={totalPendingInvoices} type="pending" />
//         <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//         <Card
//           title="Total Customers"
//           value={numberOfCustomers}
//           type="customers"
//         />
//       </div>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         <RevenueChart revenue={revenue} />
//         <LatestInvoices latestInvoices={latestInvoices} />
//       </div>
//       <ProductCatalog products={products} />
//       <div className="mt-6">
//         <TransactionHistory />
//       </div>
//     </main>
//   );
// }