// import {
//   BanknotesIcon,
//   ClockIcon,
//   UserGroupIcon,
//   InboxIcon,
// } from '@heroicons/react/24/outline';
// import { lusitana } from '@/app/ui/font';

// import { fetchCardData } from '@/app/lib/data';


// const iconMap = {
//   collected: BanknotesIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   invoices: InboxIcon,
// };

// export default async function CardWrapper() {
//     const {
//     numberOfInvoices,
//     numberOfCustomers,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   } = await fetchCardData();

//   return (
//     <>
//       {/* NOTE: Uncomment this code in Chapter 9 */}

//       <Card title="Collected" value={totalPaidInvoices} type="collected" />
//       <Card title="Pending" value={totalPendingInvoices} type="pending" />
//       <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
//       <Card
//         title="Total Customers"
//         value={numberOfCustomers}
//         type="customers"
//       /> 
//     </>
//   );
// }

// export function Card({
//   title,
//   value,
//   type,
// }: {
//   title: string;
//   value: number | string;
//   type: 'invoices' | 'customers' | 'pending' | 'collected';
// }) {
//   const Icon = iconMap[type];

//   return (
//     <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
//       <div className="flex p-4">
//         {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
//         <h3 className="ml-2 text-sm font-medium">{title}</h3>
//       </div>
//       <p
//         className={`${lusitana.className}
//           truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// app/ui/dashboard/cards.tsx
// import React from 'react';
// import { BanknotesIcon, ClockIcon, UserGroupIcon, InboxIcon } from '@heroicons/react/24/outline';
// import { lacquer } from '@/app/ui/font';

// const iconMap = {
//   collected: BanknotesIcon,
//   customers: UserGroupIcon,
//   pending: ClockIcon,
//   invoices: InboxIcon,
// };

// type CardType = 'invoices' | 'customers' | 'pending' | 'collected';

// interface CardProps {
//   title: string;
//   value: number | string;
//   type: CardType;
// }

// export function Card({ title, value, type }: CardProps) {
//   const Icon = iconMap[type];
//   return (
//     <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
//       <div className="flex p-4">
//         {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
//         <h3 className="ml-2 text-sm font-medium">{title}</h3>
//       </div>
//       <p
//         className={`${lacquer.className} truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
//       >
//         {value}
//       </p>
//     </div>
//   );
// }

// interface CardsProps {
//   totalCustomers: number;
//   totalRevenue: number;
//   totalProducts: number;
//   totalTransactions: number;
// }

// export default function Cards({
//   totalCustomers,
//   totalRevenue,
//   totalProducts,
//   totalTransactions,
// }: CardsProps) {
//   if (
//     totalCustomers === 0 &&
//     totalRevenue === 0 &&
//     totalProducts === 0 &&
//     totalTransactions === 0
//   ) {
//     return <p>Data tidak tersedia atau gagal dimuat.</p>;
//   }

//   return (
//     <>
//       <Card title="Total Pendapatan" value={totalRevenue} type="collected" />
//       <Card title="Total Produk" value={totalProducts} type="invoices" />
//       <Card title="Total Pelanggan" value={totalCustomers} type="customers" />
//       <Card title="Total Transaksi" value={totalTransactions} type="pending" />
//     </>
//   );
// }

// 



import React from 'react';
import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { nosifer } from '@/app/ui/font';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

const colorMap = {
  collected: {
    border: 'border-orange-900/30',
    shadow: 'shadow-orange-900/50',
    text: 'text-white',
    gradient: 'from-red-800 to-red-900',
    via: 'via-red-800',
    icon: 'text-orange-300',
  },
  customers: {
    border: 'border-orange-900/30',
    shadow: 'shadow-orange-900/50',
    text: 'text-white',
    gradient: 'from-red-800 to-red-900',
    via: 'via-red-800',
    icon: 'text-orange-300',
  },
  pending: {
    border: 'border-orange-900/30',
    shadow: 'shadow-orange-900/50',
    text: 'text-white',
    gradient: 'from-red-800 to-red-900',
    via: 'via-red-800',
    icon: 'text-orange-300',
  },
  invoices: {
    border: 'border-orange-900/30',
    shadow: 'shadow-orange-900/50',
    text: 'text-white',
    gradient: 'from-red-800 to-red-900',
    via: 'via-red-800',
    icon: 'text-orange-300',
  },
};

export type CardType = 'invoices' | 'customers' | 'pending' | 'collected';

interface CardProps {
  title: string;
  value: number | string;
  type: CardType;
}

function Card({ title, value, type }: CardProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${colors.gradient} p-6 text-white shadow-xl border ${colors.border} ${colors.shadow} transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-black/60 opacity-90 blur-[1px]`}
      ></div>

      {type === 'collected' && (
        <>
          <div className="absolute top-0 left-4 w-1 h-8 bg-red-600 rounded-b-full animate-pulse"></div>
          <div className="absolute top-0 right-5 w-1 h-6 bg-red-700 rounded-b-full animate-pulse"></div>
        </>
      )}

      {type === 'invoices' && (
        <div className="absolute top-0 right-0 w-12 h-12 opacity-50">
          <svg viewBox="0 0 100 100" className="w-full h-full text-gray-500">
            <path
              d="M0,0 L100,100 M20,0 L100,80 M40,0 L100,60 M60,0 L100,40 M80,0 L100,20 M0,20 L80,100 M0,40 L60,100 M0,60 L40,100 M0,80 L20,100"
              stroke="currentColor"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>
      )}

      {type === 'customers' && (
        <div className="absolute top-4 right-4 opacity-20 animate-bounce">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 1C7.239 1 5 3.239 5 6v5.5c0 1.381 1.119 2.5 2.5 2.5H8v-1a1 1 0 112 0v1h2a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 110-2h6v-1H9a1 1 0 01-1-1v-1H7.5A3.5 3.5 0 014 11.5V6a6 6 0 1112 0v5.5a3.5 3.5 0 01-3.5 3.5H12v-1h1a1 1 0 110 2H9a1 1 0 010-2h.5v-1H8v1a1 1 0 01-1 1H5a1 1 0 010-2h2v-1H6a1 1 0 01-1-1v-1H4.5A3.5 3.5 0 011 11.5V6a9 9 0 0118 0v5.5a3.5 3.5 0 01-3.5 3.5H13v-1h1a1 1 0 011 1v1h1a1 1 0 110 2h-4a1 1 0 010-2h1v-1H9v1a1 1 0 01-1 1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      {type === 'pending' && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-6 bg-green-600 rounded-b-full animate-pulse"></div>
      )}

      <div className="p-6 relative z-10">
        <div className={`flex items-center ${colors.icon} mb-4`}>
          {Icon ? <Icon className="h-7 w-7 mr-2 drop-shadow-md" /> : null}
          <h3 className="text-md font-bold uppercase tracking-widest text-orange-200">
            {title}
          </h3>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <p
            className={`${nosifer.className} text-3xl md:text-4xl font-bold ${colors.text} tracking-wide text-center`}
            style={{ textShadow: '0 0 8px rgba(255, 0, 0, 0.5)' }}
          >
            <span className="animate-pulse drop-shadow-lg">
              {String(value).charAt(0)}
            </span>
            {String(value).substring(1)}
          </p>
        </div>
      </div>

      <div
        className={`h-1 w-full bg-gradient-to-r from-transparent ${colors.via} to-transparent`}
      ></div>
    </div>
  );
}

// Fungsi fetching data (asumsikan API-nya ada)
async function fetchCardsData() {
  console.log('Fetching revenue data...');
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi delay 2 detik

  const res = await fetch('http://localhost:3000/api/cards', {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Gagal memuat data');
  return res.json();
}

// Komponen Cards (default export)
export default async function Cards() {
  try {
    const {
      totalCustomers,
      totalRevenue,
      totalProducts,
      totalTransactions,
    } = await fetchCardsData();

    return (
      <div
        className="p-8 bg-gray-950 w-full relative z-0 overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle at top left, rgba(255,0,0,0.1), transparent 70%), url("/api/placeholder/1500/800")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          <Card title="Total Customers" value={totalCustomers} type="customers" />
          <Card title="Total Revenue" value={`${totalRevenue}`} type="collected" />
          <Card title="Total Products" value={totalProducts} type="invoices" />
          <Card title="Total Transactions" value={totalTransactions} type="pending" />
        </div>
      </div>
    );
  } catch (error) {
    return (
      <p className="text-center text-red-500 font-serif my-4 text-lg">
        Data tidak tersedia atau gagal dimuat.
      </p>
    );
  }
}
