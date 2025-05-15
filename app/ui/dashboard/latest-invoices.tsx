import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lacquer } from '@/app/ui/font'; // Ganti lusitana dengan lacquer
import { fetchLatestInvoices } from '@/app/lib/data';


export default async function LatestInvoices() {
  const latestInvoices = await fetchLatestInvoices();


  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lacquer.className} mb-4 text-xl md:text-2xl text-orange-500`}>
        Latest Invoices
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-900 p-4">
        <div className="bg-black px-6">
          {latestInvoices.map((invoice, i) => (
            <div
              key={invoice.id}
              className={clsx(
                'flex flex-row items-center justify-between py-4',
                {
                  'border-t border-gray-600': i !== 0,
                },
              )}
            >
              <div className="flex items-center">
                <Image
                  src={invoice.image_url}
                  alt={`${invoice.name}'s profile picture`}
                  className="mr-4 rounded-full"
                  width={32}
                  height={32}
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-200 md:text-base">
                    {invoice.name}
                  </p>
                  <p className="hidden text-sm text-gray-400 sm:block">
                    {invoice.email}
                  </p>
                </div>
              </div>
              <p
                className={`${lacquer.className} truncate text-sm font-medium text-gray-200 md:text-base`}
              >
                {invoice.amount}
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
