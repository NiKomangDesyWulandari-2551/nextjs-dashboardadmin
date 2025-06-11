'use client';
import { FaUtensils, FaCocktail, FaMoneyBillWave, FaHome } from "react-icons/fa"; // Added FaHome for dashboard
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: "/dashboard/foods", icon: FaUtensils, title: "Foods" },
  { href: "/dashboard/drinks", icon: FaCocktail, title: "Drinks" },
  { href: "/dashboard/transaksi", icon: FaMoneyBillWave, title: "Transaksi" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            title={link.title}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-full bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href)),
              }
            )}
          >
            <LinkIcon className="w-5 h-5" />
          </Link>
        );
      })}
    </>
  );
}