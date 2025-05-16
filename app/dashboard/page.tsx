import React from 'react';
// import SoulCounter from '@/app/components/SoulCounter';
// import RecentSouls from '@/app/components/RecentSouls';
// import BanquetProgress from '@/app/components/BanquetProgress';
import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { lacquer } from '../ui/font';
import { fetchRevenuePrisma } from '@/app/lib/prisma';

// interface DashboardProps {
//   soulCount: number;
//   recentCount: number;
//   banquetProgress: number;

// }

export default async function Page() {
  const revenue= await fetchRevenuePrisma();
  return ( 
    <main>
      <h1 className={`${lacquer.className} mb-4 text-xl md:text-2xl`}>
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {}
      </div>
      <div className="mt-6 grid grid-cols-l gap-6 md:grid-cols-4 lg:grid-cols-8">
        {<RevenueChart revenue={revenue} />}
        {/* {<LatestInvoices latestInvoices={latestInvoices} />} */}
      </div>
    </main>
  );
}

// const Dashboard: React.FC<DashboardProps> = ({ soulCount, recentCount, banquetProgress }) => {
//   return (
//     <div className="relative min-h-screen flex items-center justify-center px-8 pt-0">
      
//       {/* Grid Container */}
//       <div className="grid grid-cols-2 gap-6 w-full max-w-4xl mt-0 absolute top-0">
//         <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
//           <SoulCounter count={soulCount} className="w-full h-full flex justify-center items-center" />
//         </div>
//         <div className="flex justify-start" style={{ width: '325px', height: '195px' }}>
//           <RecentSouls count={recentCount} className="w-full h-full flex justify-center items-center" />
//         </div>
//         <div className="flex justify-end" style={{ width: '325px', height: '195px' }}>
//           <BanquetProgress progress={banquetProgress} className="w-full h-full flex justify-center items-center" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function DashboardPage() {
//   return <Dashboard soulCount={40} recentCount={10} banquetProgress={30} />;
// }
