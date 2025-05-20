'use client';

import React, { useEffect, useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/font';

// Define the shape of an invoice
interface Invoice {
  id: number;
  name: string;
  email: string;
  amount: number;
}

export default function LatestInvoices() {
  const [latestInvoices, setLatestInvoices] = useState<Invoice[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/invoices', { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch invoices');
        const data: Invoice[] = await res.json();
        setLatestInvoices(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching invoices');
      } finally {
        setIsLoading(false);
      }
    }
    fetchInvoices();
  }, []);

  if (isLoading) {
    return <p className="text-gray-500">Loading invoices...</p>;
  }

  if (error) {
    return <p className="text-red-500">Failed to load latest data: {error}</p>;
  }

  if (!latestInvoices.length) {
    return <p className="text-gray-500">No invoices found.</p>;
  }

  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Latest Invoices</h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        <div className="bg-white px-6">
          {latestInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className={clsx('flex flex-row items-center justify-between py-4')}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold md:text-base">{invoice.name}</p>
                <p className="hidden text-sm text-gray-500 sm:block">{invoice.email}</p>
              </div>
              <p className={`${lusitana.className} truncate text-sm font-medium md:text-base`}>
                ${invoice.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}
