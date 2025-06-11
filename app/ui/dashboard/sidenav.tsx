'use client';

import NavLinks from '@/app/ui/dashboard/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function SideNav() {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    router.push('/auth/login');
  };

  return (
    <>
      {/* Sidebar Navigasi */}
      <div className="fixed left-0 top-0 h-full w-20 md:w-24 bg-[#12122c] flex flex-col items-center py-4 space-y-6 shadow-lg z-20 border-r-2 border-gray-500">
        {/* Logo */}
        <div
          className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer"
          onClick={() => router.push('/dashboard')}
          title="Dashboard"
        >
          🎃
        </div>

        <NavLinks />

        <div className="flex-grow"></div>
      </div>
    </>
  );
}
