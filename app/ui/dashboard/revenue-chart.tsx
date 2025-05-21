// 'use client';

// import React from 'react';
// import { CalendarIcon } from '@heroicons/react/24/outline';
// import { lusitana } from '@/app/ui/font';
// import { generateYAxis } from '@/app/lib/utils';

// interface RevenueChartProps {
//   revenue: { id: string; month: string; revenue: number }[];
// }

// export default function RevenueChart({ revenue }: RevenueChartProps) {
//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenue);

//   if (!revenue || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">Data tidak tersedia.</p>;
//   }

//   return (
//     <div className="w-full md:col-span-4 mb-8">
//       <div className="rounded-xl bg-gray-50 p-4">
//         <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
//           {/* Y-axis */}
//           <div
//             className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
//             style={{ height: `${chartHeight}px` }}
//           >
//             {yAxisLabels.map((label) => (
//               <p key={label}>{label}</p>
//             ))}
//           </div>

//           {/* Bars */}
//           {revenue.map((month, index) => (
//             <div
//               key={`${month.id}-${index}`}
//               className="flex flex-col items-center gap-2"
//             >
//               <div
//                 className="w-full rounded-md bg-blue-300"
//                 style={{
//                   height: `${(chartHeight / topLabel) * month.revenue}px`,
//                 }}
//               ></div>
//               <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
//                 {month.month}
//               </p>
//             </div>
//           ))}
//         </div>

//         <div className="flex items-center pb-2 pt-6">
//           <CalendarIcon className="h-5 w-5 text-gray-500" />
//           <h3 className="ml-2 text-sm text-gray-500">12 Bulan Terakhir</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { generateYAxis } from '@/app/lib/utils';
// import { CalendarIcon } from '@heroicons/react/24/outline';
// import { lusitana } from '@/app/ui/font';
// import { fetchRevenuePrisma } from '@/app/lib/prisma';

// export default async function RevenueChart() {
//   const res = await fetch('http://localhost:3000/api/revenue', {
//     cache: 'no-store',
//   });
//   const revenue = await res.json();
//   // sisanya sama seperti sebelumnya...
// }

//   return (
//     <div className="w-full md:col-span-4">
//       <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
//         Recent Revenue
//       </h2>

//       <div className="rounded-xl bg-gray-50 p-4">
//         <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
//           <div
//             className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
//             style={{ height: `${chartHeight}px` }}
//           >
//             {yAxisLabels.map((label) => (
//               <p key={label}>{label}</p>
//             ))}
//           </div>

//           {revenue.map((month, index) => (
//           <div key={`${month.id}-${index}`} className="flex flex-col items-center gap-2">
//             <div
//               className="w-full rounded-md bg-blue-300"
//               style={{
//                 height: `${(chartHeight / topLabel) * month.revenue}px`,
//               }}
//             ></div>
//             <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">
//               {month.month}
//             </p>
//           </div>
//         ))}

//         </div>
//         <div className="flex items-center pb-2 pt-6">
//           <CalendarIcon className="h-5 w-5 text-gray-500" />
//           <h3 className="ml-2 text-sm text-gray-500">Last 12 months</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// // import { generateYAxis } from '@/app/lib/utils';
// // import { CalendarIcon } from '@heroicons/react/24/outline';
// // import { lusitana } from '@/app/ui/font';
// // import { fetchRevenuePrisma } from '@/app/lib/prisma';

// // export default async function RevenueChart() {
// //   const revenue = await fetchRevenuePrisma();

// //   const chartHeight = 350;
// //   const { yAxisLabels, topLabel } = generateYAxis(revenue);

// //   if (!revenue || revenue.length === 0) {
// //     return <p className="mt-4 text-gray-400">No data available.</p>;
// //   }

// //   return (
// //     <div className="w-full md:col-span-4">
// //       <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
// //         Month Revenue
// //       </h2>

// //       <div className="rounded-xl bg-gray-50 p-4 overflow-hidden">
// //         <div className="grid grid-cols-[auto,1fr] gap-4">
// //           {/* Y Axis */}
// //           <div
// //             className="hidden sm:flex flex-col justify-between text-sm text-gray-400 w-12"
// //             style={{ height: `${chartHeight}px` }}
// //           >
// //             {yAxisLabels.map((label) => (
// //               <p key={label}>{label}</p>
// //             ))}
// //           </div>

// //           {/* Bars */}
// //           <div className="flex h-[350px] items-end overflow-x-auto gap-3">
// //             {revenue.map((week, index) => (
// //               <div
// //                 key={`${week.week}-${index}`}
// //                 className="flex flex-col items-center min-w-[30px]"
// //               >
// //                 <div
// //                   className="w-2 sm:w-4 bg-blue-300 rounded-md"
// //                   style={{
// //                     height: `${(chartHeight / topLabel) * week.revenue}px`,
// //                   }}
// //                 ></div>
// //                 <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
// //                   {new Date(week.week).toLocaleDateString('en-US', {
// //                     month: 'short',
// //                     day: 'numeric',
// //                   })}
// //                 </p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="flex items-center pb-2 pt-6">
// //           <CalendarIcon className="h-5 w-5 text-gray-500" />
// //           <h3 className="ml-2 text-sm text-gray-500">Last 12 weeks</h3>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import React, { useState } from 'react';
// import { nosifer } from '@/app/ui/font';
// import { generateYAxis } from '@/app/lib/utils';

// interface RevenueChartProps {
//   revenue?: { id: string; month: string; revenue: number }[]; // bisa optional
// }

// export default function RevenueChart({ revenue }: RevenueChartProps) {
//   // Pastikan revenue adalah array dan ada isinya sebelum generate Y axis dan render chart
//   if (!Array.isArray(revenue) || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">Data tidak tersedia.</p>;
//   }

//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenue);
//   const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

//   return (
//     <div>
//       {/* Floating Halloween Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
//         <div className="absolute top-20 left-10 text-6xl animate-bounce">🎃</div>
//         <div className="absolute top-40 right-20 text-4xl animate-pulse">👻</div>
//         <div className="absolute bottom-20 left-20 text-5xl animate-spin">🦇</div>
//         <div className="absolute top-60 left-1/2 text-3xl animate-bounce">🕷️</div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-4 bg-gray-900 p-6 rounded-lg border-2 border-orange-600 shadow-xl relative">
//           <div className="mb-6">
//             <h2 className={`${nosifer.className} text-2xl font-bold text-orange-500 mb-1 tracking-wider`}>
//               The Revenant Revenue
//             </h2>
//             <div className="h-1 w-36 bg-gradient-to-r from-orange-600 to-purple-700 rounded"></div>
//           </div>

//           {/* Chart */}
//           <div className="relative bg-gray-800 rounded-md p-2 flex items-end justify-between h-[400px] z-20">
//             {revenue.map((month, index) => (
//               <div
//                 key={`${month.id}-${index}`}
//                 className="flex flex-col items-center gap-2 w-full"
//                 onMouseEnter={() => setHoveredBarIndex(index)}
//                 onMouseLeave={() => setHoveredBarIndex(null)}
//               >
//                 <div
//                   className={`w-6 sm:w-8 rounded-t-md transition-all duration-300 relative ${
//                     hoveredBarIndex === index ? 'opacity-100 shadow-lg shadow-orange-500/30' : 'opacity-90'
//                   }`}
//                   style={{
//                     height: `${(chartHeight / topLabel) * month.revenue}px`,
//                     background: 'linear-gradient(to bottom, #FF6000, #7C3AED)',
//                     filter:
//                       hoveredBarIndex === index
//                         ? 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.5))'
//                         : 'none',
//                   }}
//                 >
//                   {hoveredBarIndex === index && (
//                     <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-orange-900 text-orange-100 p-2 rounded border border-orange-500 shadow-lg z-30 whitespace-nowrap">
//                       <p className="font-bold">{month.month}</p>
//                       <p className="text-orange-200">${month.revenue.toLocaleString()}</p>
//                     </div>
//                   )}
//                 </div>
//                 <p className="-rotate-90 sm:rotate-0 text-sm text-gray-400 mt-2">{month.month}</p>
//               </div>
//             ))}
//           </div>

//           {/* Decorative Elements */}
//           <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
//             <svg viewBox="0 0 100 100" className="w-full h-full">
//               <path
//                 d="M0,50 L100,50 M50,0 L50,100 M0,0 L100,100 M100,0 L0,100 M25,0 L25,100 M75,0 L75,100 M0,25 L100,25 M0,75 L100,75"
//                 stroke="white"
//                 strokeWidth="0.5"
//                 fill="none"
//               />
//             </svg>
//           </div>

//           <div className="absolute -top-3 left-1/4 w-2 h-6 bg-red-700 rounded-b-full"></div>
//           <div className="absolute -top-2 left-1/3 w-1 h-4 bg-red-800 rounded-b-full"></div>
//           <div className="absolute -top-4 left-2/3 w-3 h-8 bg-red-900 rounded-b-full"></div>
//           <div className="absolute -top-3 right-1/4 w-2 h-5 bg-red-700 rounded-b-full"></div>
//           <div className="absolute bottom-12 left-6 w-1 h-4 bg-red-800 rounded-b-full"></div>
//           <div className="absolute bottom-12 right-6 w-2 h-5 bg-red-900 rounded-b-full"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import { nosifer } from '@/app/ui/font';
import { generateYAxis } from '@/app/lib/utils';

interface Revenue {
  id: string;
  month: string;
  revenue: number;
}

function SkeletonChart() {
  return (
    <div className="relative bg-gray-800 rounded-md p-2 flex items-end justify-between h-[400px] z-20 animate-pulse">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2 w-full">
          <div className="w-6 sm:w-8 h-32 bg-gray-700 rounded-t-md" />
          <div className="h-3 w-8 bg-gray-600 rounded" />
        </div>
      ))}
    </div>
  );
}

export default function RevenueChart() {
  const [revenueData, setRevenueData] = useState<Revenue[] | null>(null);
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchRevenue() {
      try {
        await new Promise((res) => setTimeout(res, 3000)); // optional delay
        const res = await fetch('/api/revenue', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch revenue');
        const data: Revenue[] = await res.json();
        setRevenueData(data);
      } catch (error) {
        console.error('Error fetching revenue:', error);
        setRevenueData([]);
      }
    }

    fetchRevenue();
  }, []);

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenueData || []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-4 bg-gray-900 p-6 rounded-lg border-2 border-orange-600 shadow-xl relative">
        <div className="mb-6">
          <h2 className={`${nosifer.className} text-2xl font-bold text-orange-500 mb-1 tracking-wider`}>
            The Revenant Revenue
          </h2>
          <div className="h-1 w-36 bg-gradient-to-r from-orange-600 to-purple-700 rounded" />
        </div>

        {revenueData === null ? (
          <SkeletonChart />
        ) : revenueData.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No revenants rose this month. Revenue data is empty.</p>
        ) : (
          <div className="relative bg-gray-800 rounded-md p-2 flex items-end justify-between h-[400px] z-20">
            {revenueData.map((month, index) => (
              <div
                key={`${month.id}-${index}`}
                className="flex flex-col items-center gap-2 w-full"
                onMouseEnter={() => setHoveredBarIndex(index)}
                onMouseLeave={() => setHoveredBarIndex(null)}
              >
                <div
                  className={`w-6 sm:w-8 rounded-t-md transition-all duration-300 relative ${
                    hoveredBarIndex === index ? 'opacity-100 shadow-lg shadow-orange-500/30' : 'opacity-90'
                  }`}
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                    background: 'linear-gradient(to bottom, #FF6000, #7C3AED)',
                    filter:
                      hoveredBarIndex === index
                        ? 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.5))'
                        : 'none',
                  }}
                >
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-orange-900 text-orange-100 p-2 rounded border border-orange-500 shadow-lg z-30 whitespace-nowrap">
                      <p className="font-bold">{month.month}</p>
                      <p className="text-orange-200">${month.revenue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <p className="-rotate-90 sm:rotate-0 text-sm text-gray-400 mt-2">{month.month}</p>
              </div>
            ))}
          </div>
        )}

        {/* Blood drops decoration */}
        <div className="absolute -top-3 left-1/4 w-2 h-6 bg-red-700 rounded-b-full"></div>
        <div className="absolute -top-2 left-1/3 w-1 h-4 bg-red-800 rounded-b-full"></div>
        <div className="absolute -top-4 left-2/3 w-3 h-8 bg-red-900 rounded-b-full"></div>
        <div className="absolute -top-3 right-1/4 w-2 h-5 bg-red-700 rounded-b-full"></div>
        <div className="absolute bottom-12 left-6 w-1 h-4 bg-red-800 rounded-b-full"></div>
        <div className="absolute bottom-12 right-6 w-2 h-5 bg-red-900 rounded-b-full"></div>
      </div>
    </div>
  );
}
