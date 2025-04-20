'use client';
import { FaUtensils, FaCocktail } from "react-icons/fa";

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { href: "/dashboard/foods", icon: FaUtensils },
  { href: "/dashboard/drinks", icon: FaCocktail },
];


export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon; // Ambil ikon dari array

        return (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-full bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname.startsWith(link.href),
              }
            )}
          >
            <LinkIcon className="w-5 h-5" /> {/* Gunakan ikon di sini */}
          </Link>
        );
      })}
    </>
  );
}