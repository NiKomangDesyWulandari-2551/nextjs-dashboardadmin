'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Head from 'next/head';
import AddTransactionForm from '@/app/components/AddTransactionForm'; // Pastikan file ini ada dan benar

interface Transaction {
  transactionId: string;
  product: string;
  unitPrice: number;
  purchaseAmount: number;
  totalPrice: number;
  customers: string;
  date: string;
}

export default function Page() {
  const [showForm, setShowForm] = useState(false); // Mengontrol tampilan form
  const [searchQuery, setSearchQuery] = useState('');

  const [transactions, setTransactions] = useState<Transaction[]>([
    { transactionId: 'TR0000001', customers: 'Phuwin', product: 'Bloody Vision', unitPrice: 60000, purchaseAmount: 1, totalPrice: 60000, date: '2025/03/28' },
    { transactionId: 'TR0000002', customers: 'Desy', product: 'Bloody Elixir', unitPrice: 60000, purchaseAmount: 1, totalPrice: 60000, date: '2025/03/29' },
    { transactionId: 'TR0000003', customers: 'Luna', product: "Witch's Fingers", unitPrice: 30000, purchaseAmount: 1, totalPrice: 30000, date: '2025/03/30' },
    { transactionId: 'TR0000004', customers: 'Audrey', product: "Ghoul's Delight Pasta", unitPrice: 30000, purchaseAmount: 1, totalPrice: 30000, date: '2025/03/31' },
    { transactionId: 'TR0000005', customers: 'Pond', product: "Ghoul's Delight Pasta", unitPrice: 50000, purchaseAmount: 1, totalPrice: 50000, date: '2025/03/31' },
  ]);

  const handleAddTransaction = (newTransaction: Transaction) => {
    setTransactions([...transactions, newTransaction]); // Tambahkan transaksi baru ke daftar
    setShowForm(false); // Tutup form setelah menyimpan
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.customers.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 relative">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap=Chilanka&display=swap" rel="stylesheet" />
      </Head>

      {!showForm && (
        <div className="flex justify-between items-center mb-4 relative -top-10">
          <button
            className="bg-orange-500 text-white px-8 py-2 rounded-full"
            style={{ fontFamily: 'Lacquer, cursive', fontSize: '23px' }}
            onClick={() => setShowForm(true)} // Aktifkan form tambah transaksi
          >
            + Add Transaction
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search ID Transaction..."
              className="pl-10 pr-4 py-2 rounded-full w-80 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
              style={{ fontFamily: 'Chilanka, cursive' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      )}

      {showForm ? (
        <AddTransactionForm
          onCancel={() => setShowForm(false)} // Fungsi untuk menutup form
          onSave={handleAddTransaction} // Simpan transaksi baru
        />
      ) : (
        <div className="overflow-x-auto bg-[#374253] bg-opacity-10 backdrop-blur-lg rounded-xl p-4 shadow-lg text-white">
          <table className="min-w-full text-center">
            <thead>
              <tr className="text-sm text-[#8FAFBC] uppercase border-b border-white">
                <th className="py-3" style={{ fontFamily: 'Baloo, cursive' }}>No.</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Transaction Id</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Customer</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Product</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Unit Price</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Purchase Amount</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Total Price</th>
                <th style={{ fontFamily: 'Baloo, cursive' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, index) => (
                <tr key={tx.transactionId} className="border-b border-white hover:bg-white hover:bg-opacity-10 transition duration-200">
                  <td className="py-3 text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{index + 1}.</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.transactionId}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.customers}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.product}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.unitPrice}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.purchaseAmount}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.totalPrice}</td>
                  <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}