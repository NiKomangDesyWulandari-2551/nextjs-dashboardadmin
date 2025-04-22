'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import { usePathname } from 'next/navigation';
import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let pageTitle = 'Dashboard';
  if (pathname.includes('/dashboard/foods')) {
    pageTitle = 'FOODS';
  } else if (pathname.includes('/dashboard/drinks')) {
    pageTitle = 'DRINKS';
  }else if (pathname.includes('/dashboard/transaksi')) {
    pageTitle = 'TRANSACTION';
  }

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/latarbelakanggerak.mp4" type="video/mp4" />
          Browser Anda tidak mendukung video tag.
        </video>
      </div>

      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-20 md:ml-24 relative z-10 flex flex-col min-h-screen">
        {/* Header Dinamis */}
        <div
          className="w-full bg-[#12122c] text-white text-center text-3xl font-bold tracking-widest p-4 shadow-md border-b-2 border-gray-500"
          style={{ fontFamily: "'Lacquer', cursive", fontSize: '35px' }}
        >
          {pageTitle}
        </div>


        {/* Kontainer Anak */}
        <main className="flex-grow p-6 md:p-12 overflow-y-auto mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
