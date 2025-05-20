// import { generateYAxis } from '@/app/lib/utils';
// import { CalendarIcon } from '@heroicons/react/24/outline';
// import { lusitana } from '@/app/ui/font';
// import { fetchRevenuePrisma } from '@/app/lib/prisma';

// export default async function RevenueChart() {
//   const revenue = await fetchRevenuePrisma();
  
//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenue);

//   if (!revenue || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">No data available.</p>;
//   }

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

// import { generateYAxis } from '@/app/lib/utils';
// import { CalendarIcon } from '@heroicons/react/24/outline';
// import { lusitana } from '@/app/ui/font';
// import { fetchRevenuePrisma } from '@/app/lib/prisma';

// export default async function RevenueChart() {
//   const revenue = await fetchRevenuePrisma();

//   const chartHeight = 350;
//   const { yAxisLabels, topLabel } = generateYAxis(revenue);

//   if (!revenue || revenue.length === 0) {
//     return <p className="mt-4 text-gray-400">No data available.</p>;
//   }

//   return (
//     <div className="w-full md:col-span-4">
//       <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
//         Month Revenue
//       </h2>

//       <div className="rounded-xl bg-gray-50 p-4 overflow-hidden">
//         <div className="grid grid-cols-[auto,1fr] gap-4">
//           {/* Y Axis */}
//           <div
//             className="hidden sm:flex flex-col justify-between text-sm text-gray-400 w-12"
//             style={{ height: `${chartHeight}px` }}
//           >
//             {yAxisLabels.map((label) => (
//               <p key={label}>{label}</p>
//             ))}
//           </div>

//           {/* Bars */}
//           <div className="flex h-[350px] items-end overflow-x-auto gap-3">
//             {revenue.map((week, index) => (
//               <div
//                 key={`${week.week}-${index}`}
//                 className="flex flex-col items-center min-w-[30px]"
//               >
//                 <div
//                   className="w-2 sm:w-4 bg-blue-300 rounded-md"
//                   style={{
//                     height: `${(chartHeight / topLabel) * week.revenue}px`,
//                   }}
//                 ></div>
//                 <p className="mt-1 text-[10px] text-gray-500 sm:text-xs">
//                   {new Date(week.week).toLocaleDateString('en-US', {
//                     month: 'short',
//                     day: 'numeric',
//                   })}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center pb-2 pt-6">
//           <CalendarIcon className="h-5 w-5 text-gray-500" />
//           <h3 className="ml-2 text-sm text-gray-500">Last 12 weeks</h3>
//         </div>
//       </div>
//     </div>
//   );
// }
