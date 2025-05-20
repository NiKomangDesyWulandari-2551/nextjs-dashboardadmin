'use client';
import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  productId: number;
  buyerName: string;
  date: string;
  totalPrice: number | null;
}

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transaction'); // sesuaikan endpoint API-mu
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };
    fetchTransactions();
  }, []);

  // Filter transaksi berdasarkan id, buyerName, atau productId
  const filteredTransactions = transactions.filter(tx => {
    const query = searchQuery.toLowerCase();
    const id = (tx.id !== undefined && tx.id !== null) ? String(tx.id).toLowerCase() : '';
    const buyer = tx.buyerName?.toLowerCase() ?? '';
    const product = tx.productId !== undefined && tx.productId !== null ? String(tx.productId).toLowerCase() : '';
    return id.includes(query) || buyer.includes(query) || product.includes(query);
  });

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari transaksi..."
          className="w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">ID Transaksi</th>
            <th className="px-4 py-2">Nama Customer</th>
            <th className="px-4 py-2">ID Produk</th>
            <th className="px-4 py-2">Total Harga</th>
            <th className="px-4 py-2">Tanggal</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx, idx) => (
              <tr key={tx.id} className="bg-white border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-center">{idx + 1}</td>
                <td className="px-4 py-2">{tx.id ?? '-'}</td>
                <td className="px-4 py-2">{tx.buyerName ?? '-'}</td>
                <td className="px-4 py-2">{tx.productId ?? '-'}</td>
                <td className="px-4 py-2">
                  Rp {typeof tx.totalPrice === 'number' ? tx.totalPrice.toLocaleString() : '-'}
                </td>
                {/* <td className="px-4 py-2">{tx.date ?? '-'}</td> */}
                {/* <td className="px-4 py-2">{transactions.date ? new Date (transactions.date).toLocaleDateString('id-ID', {year: 'numeric', month: 'short', day: 'numeric'}) : ''}</td> */}
                <td className="px-4 py-2">
                  {tx.date ? new Date(tx.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                </td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="py-4 text-center text-gray-500">
                Tidak ada transaksi ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
