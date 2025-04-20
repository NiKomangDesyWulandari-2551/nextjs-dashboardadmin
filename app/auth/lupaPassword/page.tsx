"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Head from "next/head";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Link reset password telah dikirim ke ${email}`);
    router.push("/");
  };

  return (
    <div 
        className="relative flex justify-center items-center min-h-screen"
        style={{
            background: "radial-gradient(circle, #F67706 11%, #E6341A 32%, #BC1F28 50%, #831D27 65%, #20063A 100%)",
        }}>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&family=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="relative z-10 bg-black bg-opacity-90 text-white p-8 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ fontFamily: "'Lacquer', cursive" }}
        >
          LUPA PASSWORD?
        </h2>

        <form onSubmit={handleReset}>
          <div className="mb-4">
            <label
              className="block text-sm font-semibold mb-1"
              style={{ fontFamily: "'Baloo', cursive", fontSize: '15px' }}
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan Email...."
              className="w-full p-3 rounded bg-[#ECF0F1] text-black border border-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ fontFamily: "'Baloo', cursive", color: '#605B5B', fontSize: '15px' }}
            />
          </div>

          <p
            className="text-sm mb-4 "
            style={{ fontFamily: "'Baloo', cursive", color: '#D6EDF5' }}
          >
            Masukkan Email untuk Reset Password
          </p>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded text-lg font-semibold hover:bg-orange-600 mb-4"
            style={{ fontFamily: "'Baloo', cursive", fontSize: '20px' }}
          >
            Kirim
          </button>
        </form>

        <div className="text-center">
          <Link
            href="/"
            className="text-yellow-300 hover:underline text-sm"
            style={{ fontFamily: "'Baloo', cursive" }}
          >
            Kembali ke Halaman Login
          </Link>
        </div>
      </div>
    </div>
  );
}
