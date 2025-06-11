// "use client";
// import { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import SocialAuth from "@/app/components/SocialAuth";
// import Head from "next/head";


// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Simulasi autentikasi sederhana
//     if (username === "admin123" && password === "12345") {
//       console.log("Login Berhasil!");
//       router.push("/dashboard"); 
//     } else {
//       alert("Email atau password salah!");
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
//       {/* Import Google Font */}
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//     {/* Background Photo */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
//         <img
//           src="/Halloween wallpaper.jpeg" // Pastikan file ini ada di folder public
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Login Card */}
//       <div className="relative z-10 bg-black bg-opacity-80 text-white p-8 rounded-lg shadow-lg w-96">
//         <h2
//           className="text-3xl font-bold text-center mb-6"
//           style={{ fontFamily: "'Lacquer', cursive", color: "#D6EDF5"}}
//         >
//           LOGIN
//         </h2>

//         {/* Form Login */}
//         <form onSubmit={handleLogin}>
//           {/* Username input */}
//           <div className="mb-4">
//             <label
//               className="block text-sm font-semibold"
//               style={{ fontFamily: "'Baloo', cursive", color: "#D6EDF5", fontSize: '19px'}}
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Masukkan Username..."
//               className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px' }}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-4 relative">
//             <label
//               className="block text-sm font-semibold"
//               style={{ fontFamily: "'Baloo', cursive", color: "#D6EDF5", fontSize: '19px'}}
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Masukkan Password..."
//               className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600 pr-10"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px'}}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 text-gray-400"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </button>
//           </div>

//           <div className="flex justify-between text-sm mb-4">
//             <span></span>
//             <Link
//               href="/auth/lupaPassword"
//               className="text-gray-300 hover:underline"
//               style={{ fontFamily: "'Baloo', cursive" }}
//             >
//               Lupa Password?
//             </Link>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600"
//             style={{ fontFamily: "'Baloo', cursive", fontSize: '25px' }}
//           >
//             Login
//           </button>
//         </form>

//         {/* Social Authentication */}
//         <SocialAuth />
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import SocialAuth from '@/app/components/SocialAuth';
// import Head from 'next/head';

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Simpan token atau data sesi (misalnya di localStorage)
//         localStorage.setItem('token', data.token); // Asumsi API mengembalikan token
//         localStorage.setItem('adminUsername', username); // Simpan username untuk ditampilkan di dashboard
//         router.push('/dashboard');
//       } else {
//         setError(data.message || 'Login gagal!');
//       }
//     } catch (err) {
//       setError('Terjadi kesalahan saat login.');
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
//       {/* Import Google Font */}
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//       {/* Background Photo */}
//       <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
//         <img
//           src="/Halloween wallpaper.jpeg" // Pastikan file ini ada di folder public
//           alt="Background"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Login Card */}
//       <div className="relative z-10 bg-gray-900 text-white p-8 rounded-lg shadow-lg w-96">
//         <button
//           type="submit"
//           className="w-full text-5xl font-bold text-center mb-6 text-white"
//           style={{
//             fontFamily: "'Lacquer', sans-serif",
//             textShadow: "1px 1px 3px rgba(255, 69, 0, 0.4)",
//           }}
//           aria-label="Submit login form"
//         >
//           Login
//         </button>

//         {/* Form Login */}
//         <form onSubmit={handleLogin}>
//           {/* Username input */}
//           <div className="mb-4 relative">
//             <label
//               className="block text-sm font-semibold text-white"
//               style={{ fontFamily: "'Chilanka', cursive", fontSize: '19px' }}
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               placeholder="Masukkan Username..."
//               className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//               style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px' }}
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-4 relative">
//             <label
//               className="block text-sm font-semibold text-white"
//               style={{ fontFamily: "'Chilanka', cursive", fontSize: '19px' }}
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Masukkan Password..."
//               className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600 pr-10"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px' }}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 text-gray-400"
//             >
//               {showPassword ? <FaEye /> : <FaEyeSlash />}
//             </button>
//           </div>

//           {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

//           <div className="flex justify-between text-sm mb-4">
//             <span></span>
//             <Link
//               href="/auth/forgot"
//               className="text-white hover:underline"
//               style={{ fontFamily: "'Chilanka', cursive" }}
//             >
//               Lupa Password?
//             </Link>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600"
//             style={{ fontFamily: "'Chilanka', cursive", fontSize: '25px' }}
//           >
//             Login
//           </button>
//         </form>

//         {/* Social Authentication */}
//         <SocialAuth />
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SocialAuth from '@/app/components/SocialAuth';
import Head from 'next/head';
import { Lacquer } from 'next/font/google';

// Define font with Next.js font optimization
const lacquer = Lacquer({ subsets: ['latin'], weight: '400' });

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('adminUsername', username);
        router.push('/dashboard');
      } else {
        setError(data.message || 'Login gagal!');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login.');
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen" style={{ backgroundColor: '#1a1a2e' }}>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0" style={{ opacity: 0.5 }}>
        <img
          src="/Halloween wallpaper.jpeg" // Ensure this file exists in the public folder
          alt="Background"
          className="w-full h-full object-cover"
          onError={(e) => { console.error('Image failed to load:', e); }}
        />
      </div>

      {/* Login Card */}
      <div className="relative z-10 p-6 rounded-lg w-96 bg-gray-900 bg-opacity-90">
        <h2
          className={`${lacquer.className} text-5xl font-bold text-center text-white mb-4`}
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}
        >
          LOGIN
        </h2>

        {/* Form Login */}
        <form onSubmit={handleLogin} className="space-y-2">
          {/* Username Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">Username</label>
            <input
              type="text"
              placeholder="Masukkan Username..."
              className="w-full mt-1 p-3 rounded bg-gray-200 text-black border border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4">
            <label className="block text-sm font-medium text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan Password..."
              className="w-full mt-1 p-3 rounded bg-gray-200 text-black border border-blue-500 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/3 text-gray-500"
              style={{ fontSize: '1rem' }} // Adjust icon size to match reference
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Moved outside password div */}

          {/* Forgot Password */}
          <div className="text-sm text-white flex justify-end mb-4">
            <Link href="/auth/forgot" className="hover:underline">
              Lupa Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600"
          >
            Login
          </button>

          {/* Social Authentication */}
            <SocialAuth />
        </form>
      </div>
    </div>
  );
}
