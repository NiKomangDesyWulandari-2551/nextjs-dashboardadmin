// 'use client';

// import React, { useEffect, useState } from 'react';
// import { ArrowPathIcon } from '@heroicons/react/24/outline';
// import clsx from 'clsx';
// import { lusitana } from '@/app/ui/font';

// // Define the shape of an invoice
// interface Invoice {
//   id: number;
//   name: string;
//   email: string;
//   amount: number;
// }

// export default function LatestInvoices() {
//   const [latestInvoices, setLatestInvoices] = useState<Invoice[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     async function fetchInvoices() {
//       try {
//         setIsLoading(true);
//         const res = await fetch('/api/invoices', { cache: 'no-store' });
//         if (!res.ok) throw new Error('Failed to fetch invoices');
//         const data: Invoice[] = await res.json();
//         setLatestInvoices(data);
//       } catch (err: any) {
//         setError(err.message || 'An error occurred while fetching invoices');
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     fetchInvoices();
//   }, []);

//   if (isLoading) {
//     return <p className="text-gray-500">Loading invoices...</p>;
//   }

//   if (error) {
//     return <p className="text-red-500">Failed to load latest data: {error}</p>;
//   }

//   if (!latestInvoices.length) {
//     return <p className="text-gray-500">No invoices found.</p>;
//   }

//   return (
//     <div className="flex w-full flex-col md:col-span-4">
//       <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
//       <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
//         <div className="bg-white px-6">
//           {latestInvoices.map((invoice) => (
//             <div
//               key={invoice.id}
//               className={clsx('flex flex-row items-center justify-between py-4')}
//             >
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
//                 <p className="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
//               </div>
//               <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
//                 ${invoice.amount.toFixed(2)}
//               </p>
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center pb-2 pt-6">
//           <ArrowPathIcon className="h-5 w-5 text-gray-500" />
//           <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
//         </div>
//       </div>
//     </div>
//   );
// }

// 
'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { lacquer, nosifer } from '@/app/ui/font';

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
        <h2 className={`${nosifer.className} mb-4 text-xl md:text-2xl text-orange-500 font-bold tracking-wide`}>
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
                  <p className="truncate text-sm font-semibold md:text-base text-orange-300">{invoice.name}</p>
                  <p className="hidden text-sm text-gray-400 sm:block">{invoice.email}</p>
                </div>
                <p className={`${lacquer.className} truncate text-sm font-medium md:text-base text-red-500 drop-shadow-sm`}>
                  ${invoice.amount.toFixed(2)}
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
