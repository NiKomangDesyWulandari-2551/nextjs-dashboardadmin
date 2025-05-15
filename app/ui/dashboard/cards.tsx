import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  CakeIcon,
} from '@heroicons/react/24/outline';
import { lacquer } from '@/app/ui/font'; // Ganti lusitana dengan lacquer
import { fetchCardData } from '@/app/lib/data';


const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
  menu: CakeIcon, // Ikon untuk total menu
};


export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
    totalMenu,
  } = await fetchCardData();


  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
      <Card title="Total Menu" value={totalMenu} type="menu" />
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected' | 'menu';
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-900 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-orange-500" /> : null}
        <h3 className="ml-2 text-sm font-medium text-gray-200">{title}</h3>
      </div>
      <p
        className={`${lacquer.className} truncate rounded-xl bg-black px-4 py-8 text-center text-2xl text-gray-200`}
      >
        {value}
      </p>
    </div>
  );
}
