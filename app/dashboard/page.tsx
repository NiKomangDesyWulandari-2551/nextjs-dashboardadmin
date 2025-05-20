import React from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import CardWrapper from '../ui/dashboard/cards';
import { lacquer } from '@/app/ui/font';

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/revenue', {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <p>Failed to load revenue data</p>;
  }

  const revenue = await res.json();

  return (
    <main>
       <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices />
      </div>
    </main>
  );
}

// import React from 'react';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { lacquer } from '@/app/ui/font';
// import { fetchCardData } from '@/app/lib/data/fetchCardData';
// import Card from '@/app/ui/dashboard/cards';

// export default async function Page() {
//   const res = await fetch('http://localhost:3000/api/revenue', {
//     cache: 'no-store',
//   });

//   if (!res.ok) {
//     return <p>Failed to load revenue data</p>;
//   }

//   const revenue = await res.json();
//   const cardData = await fetchCardData();

//   return (
//     <main>
//       <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>Dashboard</h1>
      
//       {/* Cards */}
//       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//         <Card title="Customers" value={cardData.totalCustomers} />
//         <Card title="Revenue" value={`Rp${cardData.totalRevenue.toLocaleString()}`} />
//         <Card title="Products" value={cardData.totalProducts} />
//         <Card title="Transactions" value={cardData.totalTransactions} />
//       </div>

//       {/* Chart + Invoices */}
//       <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
//         <RevenueChart revenue={revenue} />
//         <LatestInvoices />
//       </div>
//     </main>
//   );
// }
