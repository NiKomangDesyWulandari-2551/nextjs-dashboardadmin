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
        >
          🎃
        </div>

        <NavLinks />

        <div className="flex-grow"></div>

        {/* Tombol Logout */}
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          className="flex flex-col items-center text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md"
        >
          <PowerIcon className="w-6 h-6" />
          <span className="text-xs"></span>
        </button>
      </div>

      {/* Modal Logout */}
      {showConfirm && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[70px] inset-x-0 mx-auto bg-gray-800 px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center space-y-3 z-50 max-w-[280px] w-auto pointer-events-auto"
          >
            <p className="text-white text-sm font-semibold">Do you want to logout?</p>
            <div className="flex space-x-10">
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-600"
              >
                No
              </button>
              <button
                onClick={handleSignOut}
                className="bg-green-500 text-white px-5 py-1 rounded-full text-sm hover:bg-green-600"
              >
                Yes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </>
  );
}
