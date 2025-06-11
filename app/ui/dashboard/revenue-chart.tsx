
// 'use client';

// import React, { useEffect, useState } from 'react';
// import { nosifer } from '@/app/ui/font';
// import { generateYAxis } from '@/app/lib/utils';

// interface Revenue {
//   id: string;
//   month: string;
//   revenue: number;
// }

// function SkeletonChart() {
//   return (
//     <div className="relative bg-gray-800 rounded-md p-2 flex items-end justify-between h-[400px] z-20 animate-pulse">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="flex flex-col items-center gap-2 w-full">
//           <div className="w-6 sm:w-8 h-32 bg-gray-700 rounded-t-md" />
//           <div className="h-3 w-8 bg-gray-600 rounded" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function RevenueChart() {
//   const [revenueData, setRevenueData] = useState<Revenue[] | null>(null);
//   const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

//   useEffect(() => {
//     async function fetchRevenue() {
//       try {
//         await new Promise((res) => setTimeout(res, 3000)); // optional delay
//         const res = await fetch('/api/revenue', { cache: 'no-store' });
//         if (!res.ok) throw new Error('Failed to fetch revenue');
//         const data: Revenue[] = await res.json();
//         setRevenueData(data);
//       } catch (error) {
//         console.error('Error fetching revenue:', error);
//         setRevenueData([]);
//       }
//     }

//     fetchRevenue();
//   }, []);

//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenueData || []);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-4 bg-gray-900 p-6 rounded-lg border-2 border-orange-600 shadow-xl relative">
//         <div className="mb-6">
//           <h2
//               className={`${nosifer.className} text-2xl font-bold mb-1 tracking-wider`}
//               style={{ color: '#800000', textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)' }}
//             >
//             The Revenant Revenue
//           </h2>
//           <div className="h-1 w-36 bg-gradient-to-r from-orange-600 to-purple-700 rounded" />
//         </div>

//         {revenueData === null ? (
//           <SkeletonChart />
//         ) : revenueData.length === 0 ? (
//           <p className="text-gray-400 text-lg mt-10">No revenants rose this month. Revenue data is empty.</p>
//         ) : (
//           <div className="relative bg-gray-800 rounded-md p-2 flex items-end justify-between h-[400px] z-20">
//             {revenueData.map((month, index) => (
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
//         )}

//         {/* Blood drops decoration */}
//         <div className="absolute -top-3 left-1/4 w-2 h-6 bg-red-700 rounded-b-full"></div>
//         <div className="absolute -top-2 left-1/3 w-1 h-4 bg-red-800 rounded-b-full"></div>
//         <div className="absolute -top-4 left-2/3 w-3 h-8 bg-red-900 rounded-b-full"></div>
//         <div className="absolute -top-3 right-1/4 w-2 h-5 bg-red-700 rounded-b-full"></div>
//         <div className="absolute bottom-12 left-6 w-1 h-4 bg-red-800 rounded-b-full"></div>
//         <div className="absolute bottom-12 right-6 w-2 h-5 bg-red-900 rounded-b-full"></div>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { lacquer, nosifer } from '@/app/ui/font';
// import { generateYAxis } from '@/app/lib/utils';

// interface Revenue {
//   id: string;
//   month: string;
//   revenue: number;
// }

// function SkeletonChart() {
//   return (
//     <div className="relative bg-black rounded-md p-2 flex items-end justify-between h-[400px] z-20 animate-pulse">
//       {[...Array(6)].map((_, i) => (
//         <div key={i} className="flex flex-col items-center gap-2 w-full">
//           <div className="w-6 sm:w-8 h-32 bg-gray-700 rounded-t-md" />
//           <div className="h-3 w-8 bg-gray-600 rounded" />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function RevenueChart() {
//   const [revenueData, setRevenueData] = useState<Revenue[] | null>(null);
//   const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

//   useEffect(() => {
//     async function fetchRevenue() {
//       try {
//         await new Promise((res) => setTimeout(res, 3000)); // optional delay
//         const res = await fetch('/api/revenue', { cache: 'no-store' });
//         if (!res.ok) throw new Error('Failed to fetch revenue');
//         const data: Revenue[] = await res.json();
//         setRevenueData(data);
//       } catch (error) {
//         console.error('Error fetching revenue:', error);
//         setRevenueData([]);
//       }
//     }

//     fetchRevenue();
//   }, []);

//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenueData || []);

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//       <div className="lg:col-span-4 bg-gray-900 p-6 rounded-lg border-2 border-orange-600 shadow-xl relative">
//         <div className="mb-6">
//           <h2
//             className={`${nosifer.className} text-2xl font-bold mb-1 tracking-wider`}
//             style={{ color: '#800000', textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)' }}
//           >
//             The Revenant Revenue
//           </h2>
//           <div className="h-1 w-36 bg-gradient-to-r from-orange-600 to-purple-700 rounded" />
//         </div>

//         {revenueData === null ? (
//           <SkeletonChart />
//         ) : revenueData.length === 0 ? (
//           <p className="text-gray-400 text-lg mt-10">No revenants rose this month. Revenue data is empty.</p>
//         ) : (
//           <div className="relative bg-black rounded-md p-2 flex items-end justify-between h-[400px] z-20">
//             {revenueData.map((month, index) => (
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
//                     background: 'linear-gradient(to bottom, #FF0000, #FF6000)',
//                     filter:
//                       hoveredBarIndex === index
//                         ? 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.5))'
//                         : 'none',
//                   }}
//                 >
//                   {hoveredBarIndex === index && (
//                     <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-orange-900 text-orange-100 p-2 rounded border border-orange-500 shadow-lg z-30 whitespace-nowrap">
//                       <p className="font-bold">{month.month}</p>
//                       <p className="text-orange-200">Rp{month.revenue.toLocaleString()}</p>
//                     </div>
//                   )}
//                 </div>
//                 <p className={`${lacquer.className} -rotate-90 sm:rotate-0 text-sm bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-2`}>{month.month}</p>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Blood drops decoration */}
//         <div className="absolute -top-3 left-1/4 w-2 h-6 bg-red-700 rounded-b-full"></div>
//         <div className="absolute -top-2 left-1/3 w-1 h-4 bg-red-800 rounded-b-full"></div>
//         <div className="absolute -top-4 left-2/3 w-3 h-8 bg-red-900 rounded-b-full"></div>
//         <div className="absolute -top-3 right-1/4 w-2 h-5 bg-red-700 rounded-b-full"></div>
//         <div className="absolute bottom-12 left-6 w-1 h-4 bg-red-800 rounded-b-full"></div>
//         <div className="absolute bottom-12 right-6 w-2 h-5 bg-red-900 rounded-b-full"></div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { lacquer, nosifer } from '@/app/ui/font';
import { generateYAxis } from '@/app/lib/utils';

interface Revenue {
  id: string;
  month: string;
  revenue: number;
}

interface RevenueChartProps {
  revenue: Revenue[];
}

export default function RevenueChart({ revenue }: RevenueChartProps) {
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);
  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(revenue);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-4 bg-gray-900 p-6 rounded-lg border-2 border-orange-600 shadow-xl relative">
        <div className="mb-6">
          <h2
            className={`${nosifer.className} text-2xl font-bold mb-1 tracking-wider`}
            style={{
              color: '#800000',
              textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)',
            }}
          >
            The Revenant Revenue
          </h2>
          <div className="h-1 w-36 bg-gradient-to-r from-orange-600 to-purple-700 rounded" />
        </div>

        {revenue.length === 0 ? (
          <p className="text-gray-400 text-lg mt-10">No revenants rose this month. Revenue data is empty.</p>
        ) : (
          <div className="relative bg-black rounded-md p-2 flex items-end justify-between h-[400px] z-20">
            {revenue.map((month, index) => (
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
                    background: 'linear-gradient(to bottom, #FF0000, #FF6000)',
                    filter:
                      hoveredBarIndex === index
                        ? 'drop-shadow(0 0 8px rgba(234, 88, 12, 0.5))'
                        : 'none',
                  }}
                >
                  {hoveredBarIndex === index && (
                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-orange-900 text-orange-100 p-2 rounded border border-orange-500 shadow-lg z-30 whitespace-nowrap">
                      <p className="font-bold">{month.month}</p>
                      <p className="text-orange-200">Rp{month.revenue.toLocaleString()}</p>
                    </div>
                  )}
                </div>
                <p className={`${lacquer.className} -rotate-90 sm:rotate-0 text-sm bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mt-2`}>
                  {month.month}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Blood drops decoration */}
        <div className="absolute -bottom-4 left-8 w-3 h-3 bg-red-600 rounded-full shadow-md animate-bounce" />
        <div className="absolute -bottom-6 left-10 w-2 h-2 bg-red-700 rounded-full shadow-md animate-bounce delay-100" />
        <div className="absolute -bottom-8 left-12 w-1.5 h-1.5 bg-red-800 rounded-full shadow-md animate-bounce delay-200" />
      </div>
    </div>
  );
}
