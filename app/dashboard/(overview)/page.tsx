// import React, { Suspense } from 'react';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
// import Cards from '@/app/ui/dashboard/cards';
// import { lacquer } from '@/app/ui/font';
// import { CardsSkeleton } from '@/app/ui/skeletons';

// export default async function Page() {
//   // Fetch data untuk cards
//   const cardsRes = await fetch('http://localhost:3000/api/cards', { cache: 'no-store' });
//   if (!cardsRes.ok) {
//     return <p className="text-red-500">Gagal memuat data kartu.</p>;
//   }
//   const cardsData = await cardsRes.json();

//   // Fetch data untuk revenue chart
//   const revenueRes = await fetch('http://localhost:3000/api/revenue', { cache: 'no-store' });
//   if (!revenueRes.ok) {
//     return <p className="text-red-500">Gagal memuat data revenue.</p>;
//   }
//   const revenueData = await revenueRes.json();
//   // console.log(revenueData)

//   return (
//   <main>
//     <div >
//       {/* Halloween Decorations */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
//       </div>
//     <div className="flex flex-nowrap overflow-x-auto space-x-6 mb-8 pb-4">
//       <Suspense fallback={<CardsSkeleton />}>
//         <Cards />
//       </Suspense>
//     </div>

//     <div className="rounded-lg shadow p-6">
//       <div className="flex flex-col lg:flex-row gap-6">
//         <div className="lg:w-2/2 w-full">
//           <Suspense fallback={<CardsSkeleton />} >
//             <RevenueChart revenue={revenueData} />
//           </Suspense>

//         </div>
//         <div className="lg:w-2/2 w-full">
//           <Suspense fallback={<CardsSkeleton />} >
//             <LatestInvoices />
//           </Suspense>
//         </div>
//       </div>
//     </div>
//     </div>
//   </main>
// );

// }

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
      <div>
        {/* Halloween Decorations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
          <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
          <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
          <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
          {/* Additional Horror Stickers */}
          <div className="absolute top-1/4 left-1/6 text-4xl text-red-700 animate-flicker" style={{ textShadow: '0 0 10px rgba(255, 0, 0, 0.8)' }}>💉</div>
          <div className="absolute bottom-1/3 right-1/5 text-5xl text-gray-500 animate-pulse" style={{ textShadow: '0 0 5px rgba(0, 0, 0, 0.7)' }}>🕯️</div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-red-800 rounded-full opacity-50 animate-spin" style={{ 
            filter: 'blur(2px)',
            transform: 'rotate(45deg)',
          }}></div>
        </div>
        <div className="flex flex-nowrap overflow-x-auto space-x-6 mb-8 pb-4">
          <Suspense fallback={<CardsSkeleton />}>
            <Cards />
          </Suspense>
        </div>

        <div className="rounded-lg shadow p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/2 w-full">
              <Suspense fallback={<CardsSkeleton />}>
                <RevenueChart revenue={revenueData} />
              </Suspense>
            </div>
            <div className="lg:w-2/2 w-full">
              <Suspense fallback={<CardsSkeleton />}>
                <LatestInvoices />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}