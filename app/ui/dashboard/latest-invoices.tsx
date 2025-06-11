
// 'use client';

// import React, { useEffect, useState } from 'react';
// import clsx from 'clsx';
// import { lacquer, nosifer } from '@/app/ui/font';

// interface Invoice {
//   id: number;
//   name: string;
//   email: string;
//   amount: number;
// }

// function SkeletonLoader() {
//   return (
//     <div className="space-y-2">
//       {[...Array(3)].map((_, index) => (
//         <div key={index} className="flex items-center justify-between py-3 px-2 rounded-md bg-gray-800 animate-pulse">
//           <div className="w-3/4">
//             <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
//             <div className="h-3 bg-gray-700 rounded w-3/4"></div>
//           </div>
//           <div className="h-4 bg-gray-700 rounded w-1/4"></div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default function LatestInvoices() {
//   const [latestInvoices, setLatestInvoices] = useState<Invoice[] | null>(null);

//   useEffect(() => {
//     async function fetchInvoices() {
//       try {
//         console.log('Fetching haunted invoices from the abyss...');
//         await new Promise((resolve) => setTimeout(resolve, 1000)); // optional delay
//         const res = await fetch('/api/invoices', { cache: 'no-store' });
//         if (!res.ok) throw new Error('Failed to fetch invoices');

//         const data: Invoice[] = await res.json();
//         setLatestInvoices(data);
//       } catch (err) {
//         console.error('Failed to fetch invoices');
//         setLatestInvoices([]);
//       }
//     }

//     fetchInvoices();
//   }, []);

//   return (
//     <div className="flex w-full flex-col md:col-span-4">
//       <div className="flex grow flex-col justify-between rounded-xl bg-gray-950 p-4 border-2 border-orange-700 shadow-[0_0_20px_#fb923c33]">
//         <h2
//           className={`${nosifer.className} text-2xl font-bold mb-1 tracking-wider`}
//           style={{ color: '#800000', textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)' }}
//         >
//           👻 Haunted Invoices
//         </h2>

//         <div className="bg-black/70 px-6 py-4 rounded-lg border border-orange-800 space-y-2">
//           {latestInvoices === null ? (
//             <SkeletonLoader />
//           ) : latestInvoices.length > 0 ? (
//             latestInvoices.map((invoice) => (
//               <div
//                 key={invoice.id}
//                 className={clsx(
//                   'flex flex-row items-center justify-between py-3 px-2 rounded-md transition-all duration-300',
//                   'hover:bg-orange-900/10 hover:scale-[1.01] border-b border-orange-900'
//                 )}
//               >
//                 <div className="min-w-0">
//                   <p className="truncate text-sm font-semibold md:text-base text-orange-300">{invoice.name}</p>
//                   <p className="hidden text-sm text-gray-400 sm:block">{invoice.email}</p>
//                 </div>
//                 <p className={`${lacquer.className} truncate text-sm font-medium md:text-base text-red-500 drop-shadow-sm`}>
//                   ${invoice.amount.toFixed(2)}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-400 text-lg">The graveyard is empty. No invoices found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { chilanka, lacquer, nosifer } from '@/app/ui/font';

interface Invoice {
  id: number;
  name: string;
  email: string;
  amount: number;
}

function SkeletonLoader() {
  return (
    <div className="space-y-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-center justify-between py-3 px-2 rounded-md bg-gray-800 animate-pulse">
          <div className="w-3/4">
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-3/4"></div>
          </div>
          <div className="h-4 bg-gray-700 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

export default function LatestInvoices() {
  const [latestInvoices, setLatestInvoices] = useState<Invoice[] | null>(null);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        console.log('Fetching haunted invoices from the abyss...');
        await new Promise((resolve) => setTimeout(resolve, 1000)); // optional delay
        const res = await fetch('/api/invoices', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch invoices');

        const data: Invoice[] = await res.json();
        setLatestInvoices(data);
      } catch (err) {
        console.error('Failed to fetch invoices');
        setLatestInvoices([]);
      }
    }

    fetchInvoices();
  }, []);

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-950 p-4 border-2 border-orange-700 shadow-[0_0_20px_#fb923c33]">
        <h2
          className={`${nosifer.className} text-2xl font-bold mb-1 tracking-wider`}
          style={{ color: '#800000', textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)' }}
        >
          👻 Haunted Invoices
        </h2>

        <div className="bg-black/70 px-6 py-4 rounded-lg border border-orange-800 space-y-2">
          {latestInvoices === null ? (
            <SkeletonLoader />
          ) : latestInvoices.length > 0 ? (
            latestInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-3 px-2 rounded-md transition-all duration-300',
                  'hover:bg-orange-900/10 hover:scale-[1.01] border-b border-orange-900'
                )}
              >
                <div className="min-w-0">
                  <p className={`${lacquer.className} truncate text-sm font-semibold md:text-base bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent`}>{invoice.name}</p>
                  <p className={`${chilanka.className} truncate text-xs text-gray-400 sm:block`}>{invoice.email}</p>
                </div>
                <p className={`${chilanka.className} truncate text-sm font-medium md:text-base text-red-500 drop-shadow-sm`}>
                  Rp{invoice.amount.toFixed()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-lg">The graveyard is empty. No invoices found.</p>
          )}
        </div>
      </div>
    </div>
  );
}