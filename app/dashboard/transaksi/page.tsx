'use client';

import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import Head from 'next/head';
import AddTransactionForm from 'app/components/addTransaksiForm';

export default function Page() {
  const [showForm, setShowForm] = useState(false);

  const transactions = [
    {
      id: 'TR0000001',
      customer: 'Phuwin',
      product: 'Bloody Vision',
      price: 'Rp 60.000',
      date: '2025/03/28',
    },
    {
      id: 'TR0000002',
      customer: 'Desy',
      product: 'Bloody Elixir',
      price: 'Rp 60.000',
      date: '2025/03/29',
    },
    {
      id: 'TR0000003',
      customer: 'Luna',
      product: "Witch's Fingers",
      price: 'Rp 30.000',
      date: '2025/03/30',
    },
    {
      id: 'TR0000004',
      customer: 'Audrey',
      product: "Ghoul's Delight Pasta",
      price: 'Rp 30.000',
      date: '2025/03/31',
    },
    {
      id: 'TR0000005',
      customer: 'Pond',
      product: "Ghoul's Delight Pasta",
      price: 'Rp 50.000',
      date: '2025/03/31',
    },
  ];

  return (
    <div className="p-6 relative">
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap=Chilanka&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Tombol + Search (disamakan ukurannya) */}
      <div className="flex justify-between items-center mb-4 relative -top-10">
        <button
          className="bg-orange-500 text-white px-8 py-2 rounded-full"
          style={{ fontFamily: 'Lacquer, cursive', fontSize: '23px' }}
          onClick={() => setShowForm(true)}
        >
          + Add Transaction
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-full w-80 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
            style={{ fontFamily: 'Chilanka, cursive' }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto bg-[#374253] bg-opacity-10 backdrop-blur-lg rounded-xl p-4 shadow-lg text-white">
        <table className="min-w-full text-center">
          <thead>
            <tr className="text-sm text-[#8FAFBC] uppercase border-b border-white">
              <th className="py-3" style={{ fontFamily: 'Baloo, cursive' }}>No.</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Transaction Id</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Customer</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Product</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Price</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Date</th>
              <th style={{ fontFamily: 'Baloo, cursive' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx.id}
                className="border-b border-white hover:bg-white hover:bg-opacity-10 transition duration-200"
              >
                <td className="py-3 text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{index + 1}.</td>
                <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.id}</td>
                <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.customer}</td>
                <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.product}</td>
                <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.price}</td>
                <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.date}</td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                      Edit
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm flex items-center gap-1">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tampilkan form jika showForm true */}
      {showForm && (
        <AddTransactionForm onCancel={() => setShowForm(false)} />
      )}
    </div>
  );
}
