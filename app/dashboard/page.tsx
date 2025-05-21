import React from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import Cards from '@/app/ui/dashboard/cards';
import { lacquer } from '@/app/ui/font';

export default async function Page() {
  // Fetch data untuk cards
  const cardsRes = await fetch('http://localhost:3000/api/cards', { cache: 'no-store' });
  if (!cardsRes.ok) {
    return <p className="text-red-500">Gagal memuat data kartu.</p>;
  }
  const cardsData = await cardsRes.json();

  // Fetch data untuk revenue chart
  const revenueRes = await fetch('http://localhost:3000/api/revenue', { cache: 'no-store' });
  if (!revenueRes.ok) {
    return <p className="text-red-500">Gagal memuat data revenue.</p>;
  }
  const revenueData = await revenueRes.json();

  return (
    <main>
      <div className="flex flex-nowrap overflow-x-auto space-x-6 mb-8 pb-4">
        <Cards
          totalCustomers={cardsData.totalCustomers}
          totalRevenue={cardsData.totalRevenue}
          totalProducts={cardsData.totalProducts}
          totalTransactions={cardsData.totalTransactions}
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {/* <h2 className="text-lg font-semibold mb-4">Recent Invoices</h2> */}
        <div className="overflow-x-auto">
          <RevenueChart revenue={revenueData} />
          <LatestInvoices />
        </div>
      </div>
    </main>
  );
}


// import React from 'react';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import Cards from '@/app/ui/dashboard/cards';
// import { lacquer } from '@/app/ui/font';

// export default async function Page() {
//   // Fetch revenue data
//   const revenueRes = await fetch('http://localhost:3000/api/revenue', {
//     cache: 'no-store',
//   });
//   if (!revenueRes.ok) return <p>Failed to load revenue data</p>;
//   const revenue = await revenueRes.json();

//   // Fetch card data
//   const cardsRes = await fetch('http://localhost:3000/api/dashboard-cards', {
//     cache: 'no-store',
//   });
//   if (!cardsRes.ok) return <p>Failed to load dashboard cards data</p>;
//   const cardData = await cardsRes.json();

//   return (
//     <main>
//       <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         {/* Render cards with data from server */}
//         <Cards
//           numberOfInvoices={cardData.numberOfInvoices}
//           numberOfCustomers={cardData.numberOfCustomers}
//           totalPaidInvoices={cardData.totalPaidInvoices}
//           totalPendingInvoices={cardData.totalPendingInvoices}
//         />

//         {/* Revenue chart */}
//         <RevenueChart revenue={revenue} />

//         {/* Client component, fetches own data */}
//         <LatestInvoices />
//       </div>
//     </main>
//   );
// }
