import React, { Suspense } from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import Cards from '@/app/ui/dashboard/cards';
import { lacquer } from '@/app/ui/font';
import { CardsSkeleton } from '@/app/ui/skeletons';

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
  // console.log(revenueData)

  return (
  <main>
    <div >
      {/* Halloween Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
        <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
        <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
      </div>
    <div className="flex flex-nowrap overflow-x-auto space-x-6 mb-8 pb-4">
      {/* <Suspense fallback={<CardsSkeleton />} >
      <Cards
        totalCustomers={cardsData.totalCustomers}
        totalRevenue={cardsData.totalRevenue}
        totalProducts={cardsData.totalProducts}
        totalTransactions={cardsData.totalTransactions}
      />
      </Suspense> */}
      <Suspense fallback={<CardsSkeleton />}>
        <Cards />
      </Suspense>
    </div>

    <div className="rounded-lg shadow p-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/2 w-full">
          <Suspense fallback={<CardsSkeleton />} >
            <RevenueChart revenue={revenueData} />
          </Suspense>

        </div>
        <div className="lg:w-2/2 w-full">
          <Suspense fallback={<CardsSkeleton />} >
            <LatestInvoices />
          </Suspense>
        </div>
      </div>
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
// // }
// import React, { Suspense } from 'react';
// import Cards from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import { RevenueChartSkeleton, LatestInvoicesSkeleton } from '@/app/ui/skeletons';

// export default async function Page() {
//   // Fetch data Cards langsung (biar cepat tampil duluan)
//   const cardsRes = await fetch('http://localhost:3000/api/cards', { cache: 'no-store' });
//   if (!cardsRes.ok) {
//     return <p className="text-red-500">Gagal memuat data kartu.</p>;
//   }
//   const cardsData = await cardsRes.json();

//   // Komponen async inline untuk RevenueChart
//   async function RevenueSection() {
//     const res = await fetch('http://localhost:3000/api/revenue', { cache: 'no-store' });
//     if (!res.ok) {
//       return <p className="text-red-500">Gagal memuat data revenue.</p>;
//     }
//     const data = await res.json();
//     return <RevenueChart revenue={data} />;
//   }

//   // Komponen async inline untuk LatestInvoices (supaya fetch dan tampil setelah Revenue)
//   async function InvoicesSection() {
//     const res = await fetch('http://localhost:3000/api/invoices/latest', { cache: 'no-store' });
//     if (!res.ok) {
//       return <p className="text-red-500">Gagal memuat data invoice terbaru.</p>;
//     }
//     const invoices = await res.json();
//     return <LatestInvoices  />;
//   }

//   return (
//     <main>
//       <div className="flex flex-nowrap overflow-x-auto space-x-6 mb-8 pb-4">
//         <Cards
//           totalCustomers={cardsData.totalCustomers}
//           totalRevenue={cardsData.totalRevenue}
//           totalProducts={cardsData.totalProducts}
//           totalTransactions={cardsData.totalTransactions}
//         />
//       </div>

//       <div className="rounded-lg shadow p-6">
//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="lg:w-1/2 w-full">
//             <Suspense fallback={<RevenueChartSkeleton />}>
//               <RevenueSection />
//             </Suspense>
//           </div>

//           <div className="lg:w-1/2 w-full">
//             <Suspense fallback={<LatestInvoicesSkeleton />}>
//               <InvoicesSection />
//             </Suspense>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
