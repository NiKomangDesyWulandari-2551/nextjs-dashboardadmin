// 'use client';

// import SideNav from '@/app/ui/dashboard/sidenav';
// import { usePathname } from 'next/navigation';
// import Head from "next/head";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   let pageTitle = 'Dashboard';
//   if (pathname.includes('/dashboard/foods')) {
//     pageTitle = 'FOODS';
//   } else if (pathname.includes('/dashboard/drinks')) {
//     pageTitle = 'DRINKS';
//   }else if (pathname.includes('/dashboard/transaksi')) {
//     pageTitle = 'TRANSACTION';
//   }

//   return (
//     <div className="relative min-h-screen bg-gray-900">
//       {/* Import Google Font */}
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//       {/* Background Photo */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gradient-to-br from-black via-gray-900 to-orange-950"></div>

//       {/* Sidebar */}
//       <SideNav />

//       {/* Main Content */}
//       <div className="ml-20 md:ml-24 relative z-10 flex flex-col min-h-screen">
//         {/* Header Dinamis */}
//         <div
//           className="w-full bg-[#12122c] text-center text-3xl font-bold tracking-widest p-4 shadow-md border-b-2 border-gray-500"
//           style={{
//             color: '#800000',
//             textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)',
//             fontFamily: "'Nosifer', cursive",
//             fontSize: '35px',
//           }}
//         >
//           {pageTitle}
//         </div>


//         {/* Kontainer Anak */}
//         <main className="flex-grow p-6 md:p-12 overflow-y-auto mt-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// "use client";

// import SideNav from "@/app/ui/dashboard/sidenav";
// import { usePathname } from "next/navigation";
// import Head from "next/head";
// import { useEffect, useState } from "react";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   let pageTitle = "Dashboard";
//   if (pathname?.includes("/dashboard/foods")) {
//     pageTitle = "FOODS";
//   } else if (pathname?.includes("/dashboard/drinks")) {
//     pageTitle = "DRINKS";
//   } else if (pathname?.includes("/dashboard/transaksi")) {
//     pageTitle = "TRANSACTION";
//   }

//   const [adminInfo, setAdminInfo] = useState({ username: "", email: "" });
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true); // State loading
//   const [showConfirm, setShowConfirm] = useState(false); // State untuk notifikasi konfirmasi

//   // Ambil data admin dari localStorage setelah login
//   useEffect(() => {
//     const storedUsername = localStorage.getItem("adminUsername");
//     if (storedUsername) {
//       setAdminInfo({ username: storedUsername, email: `${storedUsername}@gmail.com` });
//     }
//     setLoading(false); // Set loading ke false setelah data diambil
//   }, []);

//   const handleLogout = () => {
//     setShowConfirm(true); // Tampilkan notifikasi konfirmasi
//   };

//   const confirmLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("adminUsername");
//     setShowConfirm(false); // Tutup notifikasi
//     window.location.href = "/auth/login";
//   };

//   const cancelLogout = () => {
//     setShowConfirm(false); // Tutup notifikasi
//   };

//   const toggleModal = () => {
//     setIsModalOpen(!isModalOpen);
//   };

//   return (
//     <div className="relative min-h-screen bg-gray-900">
//       {/* Import Google Font */}
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap&family=Baloo&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//       <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[url('/halloween-bg.jpg')] bg-cover bg-center opacity-90"></div>

//       {/* Sidebar */}
//       <SideNav />

//       {/* Main Content */}
//       <div className="ml-20 md:ml-24 relative z-10 flex flex-col min-h-screen">
//         {/* Header Dinamis */}
//         <div
//           className="w-full bg-[#1a1a2e] text-center text-3xl font-bold tracking-widest p-4 shadow-md border-b-2 border-gray-700"
//           style={{
//             color: '#800000',
//             textShadow: "2px 2px 4px rgba(255, 69, 0, 0.7)",
//             fontFamily: "'Nosifer', cursive",
//             fontSize: "35px",
//           }}
//         >
//           {pageTitle}
//         </div>

//         {/* Admin Profile Icon - Top Right Corner */}
//         <div className="absolute top-2 right-4 z-20">
//           <button onClick={toggleModal} className="focus:outline-none">
//             <div className="w-12 h-12 bg-orange-800 rounded-full overflow-hidden border-2 border-gradient-to-r from-orange-500 to-red-600 cursor-pointer">
//               <img
//                 src={process.env.NODE_ENV === "development" ? "/admin.jpg" : "admin.jpg"}
//                 alt="Admin Avatar"
//                 className="w-full h-full object-cover filter grayscale opacity-90"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src = "https://via.placeholder.com/48?text=🎃";
//                 }}
//               />
//             </div>
//           </button>

//           {/* Modal */}
//           {isModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//               <div className="bg-[#0a0a1a] bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-orange-500 text-white">
//                 <div className="w-16 h-16 bg-orange-800 rounded-full overflow-hidden border-2 border-yellow-400">
//                   <img
//                     src="admin.jpg"
//                     alt="Admin Avatar"
//                     className="w-full h-full object-cover filter grayscale opacity-90"
//                     onError={(e) => {
//                       (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=🎃";
//                     }}
//                   />
//                 </div>
//                 <div className="text-sm">
//                   {loading ? (
//                     <p className="text-gray-300">Memuat...</p>
//                   ) : (
//                     <>
//                       <p className="font-bold text-orange-300">
//                         {adminInfo.username || "Admin"}
//                       </p>
//                       <p className="text-xs opacity-80 text-gray-300">
//                         {adminInfo.username || "Admin"}
//                       </p>
//                     </>
//                   )}
//                 </div>
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-700 text-white text-xs px-3 py-2 rounded hover:bg-red-800 transition duration-200 ml-4"
//                   style={{ fontFamily: "Lacquer, cursive" }}
//                 >
//                   LOGOUT
//                 </button>
//                 <button
//                   onClick={toggleModal}
//                   className="text-white text-xl font-bold absolute top-2 right-2 hover:text-red-500"
//                 >
//                   ×
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Notifikasi Konfirmasi Logout */}
//           {showConfirm && (
//             <div className="fixed top-[70px] inset-x-0 mx-auto bg-gray-800 px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center space-y-3 z-50 max-w-[280px] w-auto animate-fade">
//               <p className="text-white text-sm font-semibold">Do you want to logout?</p>
//               <div className="flex space-x-10">
//                 <button
//                   onClick={cancelLogout}
//                   className="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-600"
//                 >
//                   No
//                 </button>
//                 <button
//                   onClick={confirmLogout}
//                   className="bg-green-500 text-white px-5 py-1 rounded-full text-sm hover:bg-green-600"
//                 >
//                   Yes
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Kontainer Anak */}
//         <main className="flex-grow p-6 md:p-12 overflow-y-auto mt-4">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

'use client';

import SideNav from '@/app/ui/dashboard/sidenav';
import { usePathname } from 'next/navigation';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  let pageTitle = 'Dashboard';
  if (pathname.includes('/dashboard/foods')) {
    pageTitle = 'FOODS';
  } else if (pathname.includes('/dashboard/drinks')) {
    pageTitle = 'DRINKS';
  } else if (pathname.includes('/dashboard/transaksi')) {
    pageTitle = 'TRANSACTION';
  }

  const [adminInfo, setAdminInfo] = useState({ username: '', email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('adminUsername');
    if (storedUsername) {
      setAdminInfo({
        username: storedUsername,
        email: `${storedUsername}@gmail.com`,
      });
    }
    setLoading(false);
  }, []);

  const handleLogout = () => setShowConfirm(true);
  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('adminUsername');
    setShowConfirm(false);
    window.location.href = '/auth/login';
  };
  const cancelLogout = () => setShowConfirm(false);
  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <div className="relative min-h-screen bg-gray-900">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap&family=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-gradient-to-br from-black via-gray-900 to-orange-950"></div>

      {/* Sidebar */}
      <SideNav />

      {/* Main Content */}
      <div className="ml-20 md:ml-24 relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div
          className="w-full bg-[#12122c] text-center text-3xl font-bold tracking-widest p-4 shadow-md border-b-2 border-gray-500"
          style={{
            color: '#800000',
            textShadow: '2px 2px 4px rgba(255, 69, 0, 0.7)',
            fontFamily: "'Nosifer', cursive",
            fontSize: '35px',
          }}
        >
          {pageTitle}
        </div>

        {/* Admin Profile */}
        <div className="absolute top-2 right-4 z-20">
          <button onClick={toggleModal} className="focus:outline-none">
            <div className="w-12 h-12 bg-orange-800 rounded-full overflow-hidden border-2 border-gradient-to-r from-orange-500 to-red-600 cursor-pointer">
              <img
                src={process.env.NODE_ENV === 'development' ? '/admin.jpg' : 'admin.jpg'}
                alt="Admin Avatar"
                className="w-full h-full object-cover filter grayscale opacity-90"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/48?text=🎃';
                }}
              />
            </div>
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#0a0a1a] bg-opacity-90 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-orange-500 text-white relative">
                <div className="w-16 h-16 bg-orange-800 rounded-full overflow-hidden border-2 border-yellow-400">
                  <img
                    src="admin.jpg"
                    alt="Admin Avatar"
                    className="w-full h-full object-cover filter grayscale opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/64?text=🎃';
                    }}
                  />
                </div>
                <div className="text-sm">
                  {loading ? (
                    <p className="text-gray-300">Memuat...</p>
                  ) : (
                    <>
                      <p className="font-bold text-orange-300">
                        {adminInfo.username || 'Admin'}
                      </p>
                      <p className="text-xs opacity-80 text-gray-300">
                        {adminInfo.email || 'admin@example.com'}
                      </p>
                    </>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-700 text-white text-xs px-3 py-2 rounded hover:bg-red-800 transition duration-200 ml-4"
                  style={{ fontFamily: 'Lacquer, cursive' }}
                >
                  LOGOUT
                </button>
                <button
                  onClick={toggleModal}
                  className="text-white text-xl font-bold absolute top-2 right-2 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Logout Confirm */}
          {showConfirm && (
            <div className="fixed top-[70px] inset-x-0 mx-auto bg-gray-800 px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center space-y-3 z-50 max-w-[280px] w-auto animate-fade">
              <p className="text-white text-sm font-semibold">
                Do you want to logout?
              </p>
              <div className="flex space-x-10">
                <button
                  onClick={cancelLogout}
                  className="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-600"
                >
                  No
                </button>
                <button
                  onClick={confirmLogout}
                  className="bg-green-500 text-white px-5 py-1 rounded-full text-sm hover:bg-green-600"
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Kontainer Anak */}
        <main className="flex-grow p-6 md:p-12 overflow-y-auto mt-4">
          {children}
        </main>
      </div>
    </div>
  );
}
