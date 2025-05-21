// 'use client';
// import { useEffect, useState } from 'react';

// interface Transaction {
//   id: number;
//   productId: number;
//   buyerName: string;
//   date: string;
//   totalPrice: number | null;
// }

// export default function TransactionPage() {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const res = await fetch('/api/transaction'); // sesuaikan endpoint API-mu
//         if (!res.ok) throw new Error('Failed to fetch');
//         const data = await res.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error('Fetch error:', error);
//       }
//     };
//     fetchTransactions();
//   }, []);

//   // Filter transaksi berdasarkan id, buyerName, atau productId
//   const filteredTransactions = transactions.filter(tx => {
//     const query = searchQuery.toLowerCase();
//     const id = (tx.id !== undefined && tx.id !== null) ? String(tx.id).toLowerCase() : '';
//     const buyer = tx.buyerName?.toLowerCase() ?? '';
//     const product = tx.productId !== undefined && tx.productId !== null ? String(tx.productId).toLowerCase() : '';
//     return id.includes(query) || buyer.includes(query) || product.includes(query);
//   });

//   return (
//     <div className="p-6">
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Cari transaksi..."
//           className="w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="px-4 py-2">No</th>
//             <th className="px-4 py-2">ID Transaksi</th>
//             <th className="px-4 py-2">Nama Customer</th>
//             <th className="px-4 py-2">ID Produk</th>
//             <th className="px-4 py-2">Total Harga</th>
//             <th className="px-4 py-2">Tanggal</th>
//             <th className="px-4 py-2">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTransactions.length > 0 ? (
//             filteredTransactions.map((tx, idx) => (
//               <tr key={tx.id} className="bg-white border-t hover:bg-gray-50">
//                 <td className="px-4 py-2 text-center">{idx + 1}</td>
//                 <td className="px-4 py-2">{tx.id ?? '-'}</td>
//                 <td className="px-4 py-2">{tx.buyerName ?? '-'}</td>
//                 <td className="px-4 py-2">{tx.productId ?? '-'}</td>
//                 <td className="px-4 py-2">
//                   Rp {typeof tx.totalPrice === 'number' ? tx.totalPrice.toLocaleString() : '-'}
//                 </td>
//                 {/* <td className="px-4 py-2">{tx.date ?? '-'}</td> */}
//                 {/* <td className="px-4 py-2">{transactions.date ? new Date (transactions.date).toLocaleDateString('id-ID', {year: 'numeric', month: 'short', day: 'numeric'}) : ''}</td> */}
//                 <td className="px-4 py-2">
//                   {tx.date ? new Date(tx.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
//                 </td>
//                 <td className="px-4 py-2 text-center space-x-2">
//                   <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
//                     Edit
//                   </button>
//                   <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
//                     Hapus
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={7} className="py-4 text-center text-gray-500">
//                 Tidak ada transaksi ditemukan
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

'use client';
import { useEffect, useState } from 'react';
import { TransactionSkeleton } from '@/app/ui/skeletons';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/transaction');
        if (!res.ok) throw new Error('Failed to fetch transactions');
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        setError('Gagal memuat transaksi. Silakan coba lagi nanti.');
        console.error('Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter((tx) => {
    const query = searchQuery.toLowerCase();
    const id = tx.id !== undefined ? String(tx.id).toLowerCase() : '';
    const buyer = tx.buyerName?.toLowerCase() ?? '';
    const product = tx.productId !== undefined ? String(tx.productId).toLowerCase() : '';
    return id.includes(query) || buyer.includes(query) || product.includes(query);
  });

  if (isLoading) return <TransactionSkeleton />;
  if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

  return (
    <div className="p-9 relative z-8">
      {/* Halloween Decorations */}
      {/* <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
        <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
        <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
      </div> */}
      {/* <div className="mb-4">
        <input
          type="text"
          placeholder="Cari transaksi..."
          className="w-80 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
      {/* </div> */}

      <div className="overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
            <tr>
              {['No', 'ID Transaksi', 'Nama Customer', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx, idx) => (
                <tr key={tx.id} className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300">
                  <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
                  <td className="px-4 py-3 text-yellow-200 text-center">{tx.id ?? '-'}</td>
                  <td className="px-4 py-3 text-purple-300 text-center">{tx.buyerName ?? '-'}</td>
                  <td className="px-4 py-3 text-purple-300 text-center">{tx.productId ?? '-'}</td>
                  <td className="px-4 py-3 text-green-400 text-center">
                    Rp {typeof tx.totalPrice === 'number' ? tx.totalPrice.toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-center text-white">
                    {tx.date
                      ? new Date(tx.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '-'}
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform">
                      Edit
                    </button>
                    <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform">
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-400 italic">
                  Tidak ada transaksi ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}