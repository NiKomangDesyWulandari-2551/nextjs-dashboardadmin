"use client";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SocialAuth from "@/app/components/SocialAuth";
import Head from "next/head";


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulasi autentikasi sederhana
    if (username === "admin123" && password === "12345") {
      console.log("Login Berhasil!");
      router.push("/dashboard"); // Redirect ke halaman dashboard
    } else {
      alert("Email atau password salah!");
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-900">
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/latarbelakanggerak.mp4" type="video/mp4" />
        Browser Anda tidak mendukung video tag.
      </video>

      {/* Login Card */}
      <div className="relative z-10 bg-black bg-opacity-80 text-white p-8 rounded-lg shadow-lg w-96">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ fontFamily: "'Lacquer', cursive", color: "#D6EDF5"}}
        >
          LOGIN
        </h2>

        {/* Form Login */}
        <form onSubmit={handleLogin}>
          {/* Username input */}
          <div className="mb-4">
            <label
              className="block text-sm font-semibold"
              style={{ fontFamily: "'Baloo', cursive", color: "#D6EDF5", fontSize: '19px'}}
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Masukkan Username..."
              className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px' }}
            />
          </div>

          {/* Password Input */}
          <div className="mb-4 relative">
            <label
              className="block text-sm font-semibold"
              style={{ fontFamily: "'Baloo', cursive", color: "#D6EDF5", fontSize: '19px'}}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Masukkan Password..."
              className="w-full mt-1 p-3 rounded bg-[#ECF0F1] text-black border border-gray-600 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px'}}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-400"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span></span>
            <Link
              href="/auth/lupaPassword"
              className="text-gray-300 hover:underline"
              style={{ fontFamily: "'Baloo', cursive" }}
            >
              Lupa Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600"
            style={{ fontFamily: "'Baloo', cursive", fontSize: '25px' }}
          >
            Login
          </button>
        </form>

        {/* Social Authentication */}
        <SocialAuth />
      </div>
    </div>
  );
}
