import React from 'react';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices />
      </div>
    </main>
  );
}
