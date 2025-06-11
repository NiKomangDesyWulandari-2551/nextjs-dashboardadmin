// 'use client';
// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { TransactionSkeleton } from '@/app/ui/skeletons';
// import Search from '@/app/ui/search';

// interface Transaction {
//   id: number;
//   productId: number;
//   buyerName: string;
//   date: string;
//   totalPrice: number | null;
// }

// export default function TransactionPage() {
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') ?? '';

//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Form & Modal states untuk tambah transaksi
//   const [showForm, setShowForm] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [buyerName, setBuyerName] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [date, setDate] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   //  modal edit transaksi
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
//   const [editProductId, setEditProductId] = useState('');
//   const [editBuyerName, setEditBuyerName] = useState('');
//   const [editTotalPrice, setEditTotalPrice] = useState('');

//   // State untuk modal detail transaksi
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

//   // State untuk modal konfirmasi hapus
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null);

//   // State untuk pop-up notifikasi
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: 'success' | 'error';
//   } | null>(null);

//   const fetchTransactions = async () => {
//     try {
//       setIsLoading(true);
//       const res = await fetch(`/api/transaction?search=${encodeURIComponent(search)}`);
//       if (!res.ok) {
//         throw new Error('Gagal memuat transaksi');
//       }
//       const data = await res.json();
//       setTransactions(data);
//     } catch (err: any) {
//       setError(err.message || 'Gagal memuat transaksi. Silakan coba lagi nanti.');
//       console.error('Fetch error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions();
//   }, [search]);

//   //  notifikasi hilang setelah 3 detik
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => {
//         setNotification(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     setIsSubmitting(true);
//     setNotification(null);

//     try {
//       const res = await fetch('/api/transaction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: parseInt(productId),
//           buyerName,
//           totalPrice: parseInt(totalPrice),
//           date,
//         }),
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menambahkan transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil ditambahkan!', type: 'success' });
//       setProductId('');
//       setBuyerName('');
//       setTotalPrice('');
//       setDate('');
//       setShowForm(false);
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menambahkan transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openEditModal = (transaction: Transaction) => {
//     setEditTransactionId(transaction.id);
//     setEditProductId(transaction.productId.toString());
//     setEditBuyerName(transaction.buyerName || '');
//     setEditTotalPrice(transaction.totalPrice?.toString() || '');
//     setShowEditForm(true);
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting || !editTransactionId) return;

//     setIsSubmitting(true);
//     setNotification(null);

//     try {
//       const res = await fetch('/api/transaction', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           id: editTransactionId,
//           productId: parseInt(editProductId),
//           buyerName: editBuyerName,
//           totalPrice: parseInt(editTotalPrice),
//         }),
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal mengupdate transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil diupdate!', type: 'success' });
//       setShowEditForm(false);
//       setEditTransactionId(null);
//       setEditProductId('');
//       setEditBuyerName('');
//       setEditTotalPrice('');
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal mengupdate transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDeleteConfirm = (id: number) => {
//     setDeleteTransactionId(id);
//     setShowDeleteConfirm(true);
//   };

//   const handleDelete = async () => {
//     if (!deleteTransactionId || isSubmitting) return;

//     setIsSubmitting(true);
//     setNotification(null);

//     try {
//       const res = await fetch(`/api/transaction?id=${deleteTransactionId}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menghapus transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil dihapus!', type: 'success' });
//       setShowDeleteConfirm(false);
//       setDeleteTransactionId(null);
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menghapus transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDetailModal = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setShowDetailModal(true);
//   };

//   const closeDetailModal = () => {
//     setSelectedTransaction(null);
//     setShowDetailModal(false);
//   };

//   if (isLoading) return <TransactionSkeleton />;
//   if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

//   return (
//     <div className="p-9 relative z-8">
//       {/* Pop-up Notifikasi */}
//       {notification && (
//         <div className="fixed top-5 right-5 z-50 max-w-xs w-full animate-slide-in-right">
//           <div
//             className={`p-4 rounded-lg shadow-lg border-2 flex items-center gap-2 ${
//               notification.type === 'success'
//                 ? 'bg-green-700 border-green-500 text-white'
//                 : 'bg-red-700 border-red-500 text-white'
//             }`}
//           >
//             <span className="text-2xl">
//               {notification.type === 'success' ? '🎉' : '⚠️'}
//             </span>
//             <p className="font-semibold">{notification.message}</p>
//           </div>
//         </div>
//       )}

//       {/* Top bar: tombol + search */}
//       <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-purple-800 hover:bg-purple-900 text-orange-300 px-6 py-2 rounded font-bold shadow-lg border border-orange-400 transition duration-200"
//         >
//           + Tambah Transaksi
//         </button>
//         <div className="w-full md:w-auto md:max-w-sm">
//           <Search placeholder="Cari transaksi..." />
//         </div>
//       </div>

//       {/* Modal Form Tambah Transaksi */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//             <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
//             <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup"
//             >
//               ×
//             </button>
//             <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Transaksi</h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="ID Produk"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Nama Pembeli"
//                 value={buyerName}
//                 onChange={(e) => setBuyerName(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Harga"
//                 value={totalPrice}
//                 onChange={(e) => setTotalPrice(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <div className="col-span-1 md:col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                 >
//                   {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Form Edit Transaksi */}
//       {showEditForm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//             <button
//               onClick={() => {
//                 setShowEditForm(false);
//                 setEditTransactionId(null);
//                 setEditProductId('');
//                 setEditBuyerName('');
//                 setEditTotalPrice('');
//               }}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup"
//             >
//               ×
//             </button>
//             <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Transaksi</h2>
//             <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="ID Produk"
//                 value={editProductId}
//                 onChange={(e) => setEditProductId(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="text"
//                 placeholder="Nama Pembeli"
//                 value={editBuyerName}
//                 onChange={(e) => setEditBuyerName(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Harga"
//                 value={editTotalPrice}
//                 onChange={(e) => setEditTotalPrice(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//               <div className="col-span-1 md:col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                 >
//                   {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Konfirmasi Hapus */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//             <button
//               onClick={() => {
//                 setShowDeleteConfirm(false);
//                 setDeleteTransactionId(null);
//               }}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup"
//             >
//               ×
//             </button>
//             <h2 className="text-orange-400 text-2xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
//               Konfirmasi Hapus <span className="text-2xl">🗑️</span>
//             </h2>
//             <p className="text-orange-200 mb-6">Apakah Anda yakin ingin menghapus transaksi ini?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowDeleteConfirm(false);
//                   setDeleteTransactionId(null);
//                 }}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold shadow-lg border border-gray-400 transition duration-200"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={isSubmitting}
//                 className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-bold shadow-lg border border-red-400 transition duration-200"
//               >
//                 {isSubmitting ? 'Menghapus...' : 'Hapus'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal Detail Transaksi */}
//       {showDetailModal && selectedTransaction && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//             <button
//               onClick={closeDetailModal}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup detail"
//             >
//               ×
//             </button>
//             <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
//               Detail Transaksi <span className="text-2xl">📋</span>
//             </h2>
//             <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>ID Transaksi:</span>
//                 <span className="text-purple-300">{selectedTransaction.id}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Nama Pembeli:</span>
//                 <span className="text-purple-300">{selectedTransaction.buyerName || '-'}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>ID Produk:</span>
//                 <span className="text-purple-300">{selectedTransaction.productId || '-'}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Total Harga:</span>
//                 <span className="text-purple-300">
//                   {selectedTransaction.totalPrice !== null
//                     ? `Rp ${selectedTransaction.totalPrice.toLocaleString()}`
//                     : '-'}
//                 </span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Tanggal:</span>
//                 <span className="text-purple-300">
//                   {selectedTransaction.date
//                     ? new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                       })
//                     : '-'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tabel Transaksi */}
//       <div className="overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'ID Transaksi', 'Nama Customer', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
//                 <th
//                   key={h}
//                   className={`px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider ${
//                     h === 'Aksi' ? 'min-w-[180px]' : ''
//                   }`}
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((tx, idx) => (
//                 <tr key={tx.id} className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300">
//                   <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
//                   <td className="px-4 py-3 text-yellow-200 text-center">{tx.id ?? '-'}</td>
//                   <td className="px-4 py-3 text-purple-300 text-center">{tx.buyerName ?? '-'}</td>
//                   <td className="px-4 py-3 text-purple-300 text-center">{tx.productId ?? '-'}</td>
//                   <td className="px-4 py-3 text-green-400 text-center">
//                     {typeof tx.totalPrice === 'number' ? `Rp ${tx.totalPrice.toLocaleString()}` : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-center text-white">
//                     {tx.date
//                       ? new Date(tx.date).toLocaleDateString('id-ID', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                         })
//                       : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
//                     <button
//                       onClick={() => openDetailModal(tx)}
//                       className="w-16 bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
//                       title="Lihat detail transaksi"
//                     >
//                       Lihat
//                     </button>
//                     <button
//                       onClick={() => openEditModal(tx)}
//                       className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
//                       title="Edit transaksi"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => openDeleteConfirm(tx.id)}
//                       className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
//                       title="Hapus transaksi"
//                     >
//                       Hapus
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="py-6 text-center text-gray-400 italic">
//                   Tidak ada transaksi ditemukan.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
// import { TransactionSkeleton } from '@/app/ui/skeletons';
// import Search from '@/app/ui/search';
// import { lacquer } from '@/app/ui/font';

// interface Transaction {
//   id: number;
//   productId: number;
//   product_name: string;
//   product_price: number;
//   buyerName: string;
//   date: string;
//   totalPrice: number | null;
//   category_name: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   price: number;
// }

// const DEFAULT_ITEMS_PER_PAGE = 5;

// export default function TransactionPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const search = searchParams.get('search') ?? '';
//   const pageParam = parseInt(searchParams.get('page') || '1', 10);
//   const limitParam = parseInt(searchParams.get('limit') || DEFAULT_ITEMS_PER_PAGE.toString(), 10);

//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalTransactions, setTotalTransactions] = useState(0);
//   const [currentPage, setCurrentPage] = useState(pageParam);
//   const [itemsPerPage, setItemsPerPage] = useState(limitParam);

//   // Form & Modal states untuk tambah transaksi
//   const [showForm, setShowForm] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [buyerName, setBuyerName] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [date, setDate] = useState('');
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Modal edit transaksi
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
//   const [editProductId, setEditProductId] = useState('');
//   const [editBuyerName, setEditBuyerName] = useState('');
//   const [editTotalPrice, setEditTotalPrice] = useState('');

//   // State untuk modal detail transaksi
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

//   // State untuk modal konfirmasi hapus
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null);

//   // State untuk pop-up notifikasi
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: 'success' | 'error';
//   } | null>(null);

//   // State untuk efek partikel
//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//   // Hitung total halaman
//   const totalPages = Math.ceil(totalTransactions / itemsPerPage);

//   // Fetch produk dari API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch('/api/products?limit=100');
//         if (!res.ok) {
//           throw new Error('Gagal memuat produk');
//         }
//         const { data } = await res.json();
//         setProducts(data);
//       } catch (err) {
//         console.error('Fetch products error:', err);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Autofill totalPrice saat produk dipilih
//   useEffect(() => {
//     if (productId) {
//       const selectedProduct = products.find((p) => p.id === parseInt(productId));
//       if (selectedProduct) {
//         setTotalPrice(selectedProduct.price.toString());
//       }
//     } else {
//       setTotalPrice('');
//     }
//   }, [productId, products]);

//   // Autofill editTotalPrice saat editProductId dipilih
//   useEffect(() => {
//     if (editProductId) {
//       const selectedProduct = products.find((p) => p.id === parseInt(editProductId));
//       if (selectedProduct) {
//         setEditTotalPrice(selectedProduct.price.toString());
//       }
//     } else {
//       setEditTotalPrice('');
//     }
//   }, [editProductId, products]);

//   const fetchTransactions = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await fetch(
//         `/api/transaction?search=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`
//       );
//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal memuat transaksi');
//       }
//       const { data, total } = await res.json();
//       console.log('API response:', { data, total, page: currentPage }); // Debugging
//       if (!Array.isArray(data)) {
//         throw new Error('Expected an array of transactions');
//       }
//       setTransactions(data);
//       setTotalTransactions(total);
//     } catch (err: any) {
//       setError(err.message || 'Gagal memuat transaksi. Silakan coba lagi nanti.');
//       console.error('Fetch error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [search, currentPage, itemsPerPage]);

//   useEffect(() => {
//     setCurrentPage(pageParam);
//     setItemsPerPage(limitParam);
//     fetchTransactions();
//   }, [search, pageParam, limitParam, fetchTransactions]);

//   // Update URL saat halaman atau limit berubah
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', currentPage.toString());
//     params.set('limit', itemsPerPage.toString());
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, [currentPage, itemsPerPage, router, searchParams]);

//   // Particle effect initialization
//   useEffect(() => {
//     const generated = Array.from({ length: 25 }).map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 5}s`,
//       duration: `${3 + Math.random() * 4}s`,
//     }));
//     setParticles(generated);
//   }, []);

//   // Notifikasi hilang setelah 3 detik
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleSearch = useDebouncedCallback((term: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (term) {
//       params.set('search', term);
//     } else {
//       params.delete('search');
//     }
//     params.set('page', '1');
//     params.set('limit', itemsPerPage.toString());
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, 300);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       if (!productId || !buyerName || !totalPrice || !date) {
//         throw new Error('Semua kolom harus diisi.');
//       }
//       const parsedProductId = parseInt(productId);
//       const parsedTotalPrice = parseFloat(totalPrice);
//       if (isNaN(parsedProductId) || parsedProductId <= 0) {
//         throw new Error('ID Produk harus berupa angka positif.');
//       }
//       if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
//         throw new Error('Total Harga harus berupa angka non-negatif.');
//       }
//       if (isNaN(Date.parse(date))) {
//         throw new Error('Tanggal tidak valid.');
//       }

//       const res = await fetch('/api/transaction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: parsedProductId,
//           buyerName,
//           totalPrice: parsedTotalPrice,
//           date: new Date(date).toISOString(), // Format ke ISO
//         }),
//       });

//       if (! res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menambahkan transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil ditambahkan!', type: 'success' });
//       setProductId('');
//       setBuyerName('');
//       setTotalPrice('');
//       setDate('');
//       setShowForm(false);
//       setCurrentPage(1);
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menambahkan transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openEditModal = (transaction: Transaction) => {
//     setEditTransactionId(transaction.id);
//     setEditProductId(transaction.productId.toString());
//     setEditBuyerName(transaction.buyerName || '');
//     setEditTotalPrice(transaction.totalPrice?.toString() || '');
//     setShowEditForm(true);
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting || !editTransactionId) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       if (!editProductId || !editBuyerName || !editTotalPrice) {
//         throw new Error('Semua kolom harus diisi.');
//       }
//       const parsedProductId = parseInt(editProductId);
//       const parsedTotalPrice = parseFloat(editTotalPrice);
//       if (isNaN(parsedProductId) || parsedProductId <= 0) {
//         throw new Error('ID Produk harus berupa angka positif.');
//       }
//       if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
//         throw new Error('Total Harga harus berupa angka non-negatif.');
//       }

//       const res = await fetch('/api/transaction', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           id: editTransactionId,
//           productId: parsedProductId,
//           buyerName: editBuyerName,
//           totalPrice: parsedTotalPrice,
//         }),
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal mengupdate transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil diupdate!', type: 'success' });
//       setShowEditForm(false);
//       setEditTransactionId(null);
//       setEditProductId('');
//       setEditBuyerName('');
//       setEditTotalPrice('');
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal mengupdate transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDeleteConfirm = (id: number) => {
//     setDeleteTransactionId(id);
//     setShowDeleteConfirm(true);
//   };

//   const handleDelete = async () => {
//     if (!deleteTransactionId || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       const res = await fetch(`/api/transaction?id=${deleteTransactionId}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menghapus transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil dihapus!', type: 'success' });
//       setShowDeleteConfirm(false);
//       setDeleteTransactionId(null);
//       if (transactions.length === 1 && currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menghapus transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDetailModal = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setShowDetailModal(true);
//   };

//   const closeDetailModal = () => {
//     setSelectedTransaction(null);
//     setShowDetailModal(false);
//   };

//   if (isLoading) return <TransactionSkeleton />;
//   if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

//   return (
//     <>
//       <div className="p-9 relative z-8">
//         {/* HALLOWEEN DECORATION */}
//         <div className="absolute inset-0 pointer-events-none z-0">
//           <div className="absolute -top-5 -left-5 text-5xl animate-bounce">🦇</div>
//           <div className="absolute -top-10 -right-10 text-6xl animate-ping">🎃</div>
//           <div className="absolute -bottom-10 -left-10 text-4xl animate-spin">🕷️</div>
//           <div className="absolute top-1/2 right-0 text-5xl animate-pulse">👻</div>
//           <div className="absolute -bottom-6 -right-6 text-5xl animate-bounce">💀</div>
//         </div>

//         {/* PARTICLE EFFECT */}
//         {particles.map((p, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-ping"
//             style={{
//               left: p.left,
//               top: p.top,
//               animationDelay: p.delay,
//               animationDuration: p.duration,
//             }}
//           />
//         ))}

//         {/* Pop-up Notification */}
//         {notification && (
//           <div className="fixed top-5 right-5 z-50 max-w-xs w-full animate-slide-in-right">
//             <div
//               className={`p-4 rounded-lg shadow-lg border-2 flex items-center gap-2 ${
//                 notification.type === 'success'
//                   ? 'bg-green-700 border-green-500 text-white'
//                   : 'bg-red-700 border-red-500 text-white'
//               }`}
//             >
//               <span className="text-2xl">
//                 {notification.type === 'success' ? '🎉' : '⚠️'}
//               </span>
//               <p className="font-semibold">{notification.message}</p>
//             </div>
//           </div>
//         )}

//         {/* Top bar: button + search */}
//         <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
//           <button
//             onClick={() => setShowForm(true)}
//             className={`bg-[#800020] hover:bg-[#800020]/70 text-[#ff4500] px-6 py-2 rounded font-bold shadow-lg border border-orange-400 transition duration-200 ${lacquer.className}`}
//           >
//             + Tambah Transaksi
//           </button>
//           <div className="w-full md:w-auto md:max-w-sm">
//             <Search placeholder="Cari transaksi..." />
//           </div>
//         </div>

//         {/* Modal Form Tambah Transaksi */}
//         {showForm && (
//           <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//             <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//               <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//               <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//               <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
//               <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//                 aria-label="Tutup form tambah transaksi"
//               >
//                 ×
//               </button>
//               <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Transaksi</h2>
//               <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label htmlFor="productId" className="block text-orange-200 mb-1 font-semibold">
//                     Produk
//                   </label>
//                   <select
//                     id="productId"
//                     value={productId}
//                     onChange={(e) => setProductId(e.target.value)}
//                     required
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Pilih Produk"
//                   >
//                     <option value="" disabled>
//                       Pilih Produk
//                     </option>
//                     {products.map((product) => (
//                       <option key={product.id} value={product.id}>
//                         {product.id} - {product.name} (Rp {product.price.toLocaleString()})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="buyerName" className="block text-orange-200 mb-1 font-semibold">
//                     Nama Pembeli
//                   </label>
//                   <input
//                     id="buyerName"
//                     type="text"
//                     placeholder="Nama Pembeli"
//                     value={buyerName}
//                     onChange={(e) => setBuyerName(e.target.value)}
//                     required
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Nama Pembeli"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="totalPrice" className="block text-orange-200 mb-1 font-semibold">
//                     Total Harga
//                   </label>
//                   <input
//                     id="totalPrice"
//                     type="number"
//                     placeholder="Total Harga"
//                     value={totalPrice}
//                     onChange={(e) => setTotalPrice(e.target.value)}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Total Harga"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="date" className="block text-orange-200 mb-1 font-semibold">
//                     Tanggal
//                   </label>
//                   <input
//                     id="date"
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     required
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Tanggal Transaksi"
//                   />
//                 </div>
//                 <div className="col-span-1 md:col-span-2">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                   >
//                     {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Modal Form Edit Transaksi */}
//         {showEditForm && (
//           <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//             <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//               <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//               <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//               <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
//               <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
//               <button
//                 onClick={() => {
//                   setShowEditForm(false);
//                   setEditTransactionId(null);
//                   setEditProductId('');
//                   setEditBuyerName('');
//                   setEditTotalPrice('');
//                 }}
//                 className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//                 aria-label="Tutup form edit transaksi"
//               >
//                 ×
//               </button>
//               <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Transaksi</h2>
//               <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                 <div>
//                   <label htmlFor="editProductId" className="block text-orange-200 mb-1 font-semibold">
//                     Produk
//                   </label>
//                   <select
//                     id="editProductId"
//                     value={editProductId}
//                     onChange={(e) => setEditProductId(e.target.value)}
//                     required
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Pilih Produk"
//                   >
//                     <option value="" disabled>
//                       Pilih Produk
//                     </option>
//                     {products.map((product) => (
//                       <option key={product.id} value={product.id}>
//                         {product.id} - {product.name} (Rp {product.price.toLocaleString()})
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label htmlFor="editBuyerName" className="block text-orange-200 mb-1 font-semibold">
//                     Nama Pembeli
//                   </label>
//                   <input
//                     id="editBuyerName"
//                     type="text"
//                     placeholder="Nama Pembeli"
//                     value={editBuyerName}
//                     onChange={(e) => setEditBuyerName(e.target.value)}
//                     required
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Nama Pembeli"
//                   />
//                 </div>
//                 <div>
//                   <label htmlFor="editTotalPrice" className="block text-orange-200 mb-1 font-semibold">
//                     Total Harga
//                   </label>
//                   <input
//                     id="editTotalPrice"
//                     type="number"
//                     placeholder="Total Harga"
//                     value={editTotalPrice}
//                     onChange={(e) => setEditTotalPrice(e.target.value)}
//                     required
//                     min="0"
//                     step="0.01"
//                     className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
//                     aria-label="Total Harga"
//                   />
//                 </div>
//                 <div className="col-span-1 md:col-span-2">
//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                   >
//                     {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Modal Konfirmasi Hapus */}
//         {showDeleteConfirm && (
//           <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//             <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//               <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//               <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//               <button
//                 onClick={() => {
//                   setShowDeleteConfirm(false);
//                   setDeleteTransactionId(null);
//                 }}
//                 className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//                 aria-label="Tutup konfirmasi hapus"
//               >
//                 ×
//               </button>
//               <h2 className="text-orange-400 text-2xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
//                 Konfirmasi Hapus <span className="text-2xl">🗑️</span>
//               </h2>
//               <p className="text-orange-200 mb-6">Apakah Anda yakin ingin menghapus transaksi ini?</p>
//               <div className="flex justify-end gap-3">
//                 <button
//                   onClick={() => {
//                     setShowDeleteConfirm(false);
//                     setDeleteTransactionId(null);
//                   }}
//                   className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold shadow-lg border border-gray-400 transition duration-200"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isSubmitting}
//                   className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-bold shadow-lg border border-red-400 transition duration-200"
//                 >
//                   {isSubmitting ? 'Menghapus...' : 'Hapus'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal Detail Transaksi */}
//         {showDetailModal && selectedTransaction && (
//           <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//             <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//               <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//               <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//               <button
//                 onClick={closeDetailModal}
//                 className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//                 aria-label="Tutup detail transaksi"
//               >
//                 ×
//               </button>
//               <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
//                 Detail Transaksi <span className="text-2xl">📋</span>
//               </h2>
//               <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
//                 <div className="flex justify-between border-b border-orange-500 pb-2">
//                   <span>ID Transaksi:</span>
//                   <span className="text-orange-300">{selectedTransaction.id || '-'}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-orange-500 pb-2">
//                   <span>Nama Pembeli:</span>
//                   <span className="text-orange-300">{selectedTransaction.buyerName || '-'}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-orange-500 pb-2">
//                   <span>ID Produk:</span>
//                   <span className="text-orange-300">{selectedTransaction.productId || '-'}</span>
//                 </div>
//                 <div className="flex justify-between border-b border-orange-500 pb-2">
//                   <span>Total Harga:</span>
//                   <span className="text-orange-300">
//                     {selectedTransaction.totalPrice !== null
//                       ? `Rp ${selectedTransaction.totalPrice.toLocaleString()}`
//                       : '-'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-b border-orange-500 pb-2">
//                   <span>Tanggal:</span>
//                   <span className="text-orange-300">
//                     {selectedTransaction.date
//                       ? new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
//                           year: 'numeric',
//                           month: 'long',
//                           day: 'numeric',
//                         })
//                       : '-'}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Tabel Transaksi */}
//         <div className="overflow-x-auto border-4 border-orange-500 shadow-xl rounded-2xl bg-[#1a1a2e]">
//           <table className="min-w-full border-collapse">
//             <thead className="bg-gradient-to-r from-[#800020] to-[#800020] border-b-4 border-[#800020]">
//               <tr>
//                 {['No', 'ID Transaksi', 'Nama Pembeli', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
//                   <th
//                     key={h}
//                     scope="col"
//                     className={`px-4 py-3 text-center text-[#ff4500] text-lg font-bold uppercase tracking-wider ${lacquer.className} ${
//                       h === 'Aksi' ? 'min-w-[180px]' : ''
//                     }`}
//                   >
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length > 0 ? (
//                 transactions.map((tx, idx) => (
//                   <tr
//                     key={tx.id}
//                     className="border-b border-[#800020] hover:bg-[#800020]/70 transition duration-200"
//                   >
//                     <td className="px-4 py-3 text-center text-orange-400 font-bold">
//                       {(currentPage - 1) * itemsPerPage + idx + 1}
//                     </td>
//                     <td className="px-4 py-3 text-yellow-600 text-center">{tx.id || '-'}</td>
//                     <td className="px-4 py-3 text-orange-300 text-center">{tx.buyerName || '-'}</td>
//                     <td className="px-4 py-3 text-orange-300 text-center">{tx.productId || '-'}</td>
//                     <td className="px-4 py-3 text-green-400 text-center">
//                       {typeof tx.totalPrice === 'number' ? `Rp ${tx.totalPrice.toLocaleString()}` : '-'}
//                     </td>
//                     <td className="px-4 py-3 text-center text-yellow-600">
//                       {tx.date
//                         ? new Date(tx.date).toLocaleDateString('id-ID', {
//                             year: 'numeric',
//                             month: 'short',
//                             day: 'numeric',
//                           })
//                         : '-'}
//                     </td>
//                     <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
//                       <button
//                         onClick={() => openDetailModal(tx)}
//                         className="w-16 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
//                         title="Lihat detail transaksi"
//                         aria-label={`Lihat detail transaksi ${tx.id}`}
//                       >
//                         Lihat
//                       </button>
//                       <button
//                         onClick={() => openEditModal(tx)}
//                         className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
//                         title="Edit transaksi"
//                         aria-label={`Edit transaksi ${tx.id}`}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => openDeleteConfirm(tx.id)}
//                         className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
//                         title="Hapus transaksi"
//                         aria-label={`Hapus transaksi ${tx.id}`}
//                       >
//                         Hapus
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={7} className="py-6 text-center text-gray-400 italic">
//                     Tidak ada transaksi ditemukan.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination Controls */}
//         {totalTransactions > 0 && (
//           <div className="mt-6 flex justify-center items-center gap-2">
//             <button
//               onClick={() => handlePageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//               className={`px-4 py-2 rounded-lg font-bold ${
//                 currentPage === 1
//                   ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                   : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
//               }`}
//               aria-label="Halaman sebelumnya"
//             >
//               Previous
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className={`px-4 py-2 rounded-lg font-bold ${
//                   currentPage === page
//                     ? 'bg-orange-500 text-white'
//                     : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
//                 }`}
//                 aria-label={`Halaman ${page}`}
//               >
//                 {page}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-2 rounded-lg font-bold ${
//                 currentPage === totalPages
//                   ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
//                   : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
//               }`}
//               aria-label="Halaman berikutnya"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { useDebouncedCallback } from 'use-debounce';
// import { TransactionSkeleton } from '@/app/ui/skeletons';
// import Search from '@/app/ui/search';
// import { lacquer, nosifer } from '@/app/ui/font'; // Ensure these fonts are imported

// interface Transaction {
//   id: number;
//   productId: number;
//   product_name: string;
//   product_price: number;
//   buyerName: string;
//   date: string;
//   totalPrice: number | null;
//   category_name: string;
// }

// const DEFAULT_ITEMS_PER_PAGE = 5;

// export default function TransactionPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const search = searchParams.get('search') ?? '';
//   const pageParam = parseInt(searchParams.get('page') || '1', 10);
//   const limitParam = parseInt(searchParams.get('limit') || DEFAULT_ITEMS_PER_PAGE.toString(), 10);

//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalTransactions, setTotalTransactions] = useState(0);
//   const [currentPage, setCurrentPage] = useState(pageParam);
//   const [itemsPerPage, setItemsPerPage] = useState(limitParam);

//   // Form & Modal states untuk tambah transaksi
//   const [showForm, setShowForm] = useState(false);
//   const [productId, setProductId] = useState('');
//   const [buyerName, setBuyerName] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [date, setDate] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Modal edit transaksi
//   const [showEditForm, setShowEditForm] = useState(false);
//   const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
//   const [editProductId, setEditProductId] = useState('');
//   const [editBuyerName, setEditBuyerName] = useState('');
//   const [editTotalPrice, setEditTotalPrice] = useState('');

//   // State untuk modal detail transaksi
//   const [showDetailModal, setShowDetailModal] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

//   // State untuk modal konfirmasi hapus
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null);

//   // State untuk pop-up notifikasi
//   const [notification, setNotification] = useState<{
//     message: string;
//     type: 'success' | 'error';
//   } | null>(null);

//   // State untuk efek partikel
//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//   // Hitung total halaman
//   const totalPages = Math.ceil(totalTransactions / itemsPerPage);

//   const fetchTransactions = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const res = await fetch(
//         `/api/transaction?search=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`
//       );
//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal memuat transaksi');
//       }
//       const { data, total } = await res.json();
//       console.log('API response:', { data, total, page: currentPage }); // Debugging
//       if (!Array.isArray(data)) {
//         throw new Error('Expected an array of transactions');
//       }
//       setTransactions(data);
//       setTotalTransactions(total);
//     } catch (err: any) {
//       setError(err.message || 'Gagal memuat transaksi. Silakan coba lagi nanti.');
//       console.error('Fetch error:', err);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [search, currentPage, itemsPerPage]);

//   useEffect(() => {
//     setCurrentPage(pageParam);
//     setItemsPerPage(limitParam);
//     fetchTransactions();
//   }, [search, pageParam, limitParam]);

//   // Update URL saat halaman atau limit berubah
//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set('page', currentPage.toString());
//     params.set('limit', itemsPerPage.toString());
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, [currentPage, itemsPerPage]);

//   // Particle effect initialization
//   useEffect(() => {
//     const generated = Array.from({ length: 25 }).map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 5}s`,
//       duration: `${3 + Math.random() * 4}s`,
//     }));
//     setParticles(generated);
//   }, []);

//   // Notifikasi hilang setelah 3 detik
//   useEffect(() => {
//     if (notification) {
//       const timer = setTimeout(() => setNotification(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [notification]);

//   const handleSearch = useDebouncedCallback((term: string) => {
//     const params = new URLSearchParams(searchParams.toString());
//     if (term) {
//       params.set('search', term);
//     } else {
//       params.delete('search');
//     }
//     params.set('page', '1');
//     params.set('limit', itemsPerPage.toString());
//     router.push(`?${params.toString()}`, { scroll: false });
//   }, 300);

//   const handlePageChange = (page: number) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       if (!productId || !buyerName || !totalPrice || !date) {
//         throw new Error('Semua kolom harus diisi.');
//       }
//       const parsedProductId = parseInt(productId);
//       const parsedTotalPrice = parseInt(totalPrice);
//       if (isNaN(parsedProductId) || parsedProductId <= 0) {
//         throw new Error('ID Produk harus berupa angka positif.');
//       }
//       if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
//         throw new Error('Total Harga harus berupa angka non-negatif.');
//       }
//       if (isNaN(Date.parse(date))) {
//         throw new Error('Tanggal tidak valid.');
//       }

//       const res = await fetch('/api/transaction', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           productId: parsedProductId,
//           buyerName,
//           totalPrice: parsedTotalPrice,
//           date,
//         }),
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menambahkan transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil ditambahkan!', type: 'success' });
//       setProductId('');
//       setBuyerName('');
//       setTotalPrice('');
//       setDate('');
//       setShowForm(false);
//       setCurrentPage(1);
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menambahkan transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openEditModal = (transaction: Transaction) => {
//     setEditTransactionId(transaction.id);
//     setEditProductId(transaction.productId.toString());
//     setEditBuyerName(transaction.buyerName || '');
//     setEditTotalPrice(transaction.totalPrice?.toString() || '');
//     setShowEditForm(true);
//   };

//   const handleEditSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (isSubmitting || !editTransactionId) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       if (!editProductId || !editBuyerName || !editTotalPrice) {
//         throw new Error('Semua kolom harus diisi.');
//       }
//       const parsedProductId = parseInt(editProductId);
//       const parsedTotalPrice = parseInt(editTotalPrice);
//       if (isNaN(parsedProductId) || parsedProductId <= 0) {
//         throw new Error('ID Produk harus berupa angka positif.');
//       }
//       if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
//         throw new Error('Total Harga harus berupa angka non-negatif.');
//       }

//       const res = await fetch('/api/transaction', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           id: editTransactionId,
//           productId: parsedProductId,
//           buyerName: editBuyerName,
//           totalPrice: parsedTotalPrice,
//         }),
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal mengupdate transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil diupdate!', type: 'success' });
//       setShowEditForm(false);
//       setEditTransactionId(null);
//       setEditProductId('');
//       setEditBuyerName('');
//       setEditTotalPrice('');
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal mengupdate transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDeleteConfirm = (id: number) => {
//     setDeleteTransactionId(id);
//     setShowDeleteConfirm(true);
//   };

//   const handleDelete = async () => {
//     if (!deleteTransactionId || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       setNotification(null);

//       const res = await fetch(`/api/transaction?id=${deleteTransactionId}`, {
//         method: 'DELETE',
//       });

//       if (!res.ok) {
//         const { error } = await res.json();
//         throw new Error(error || 'Gagal menghapus transaksi');
//       }

//       setNotification({ message: 'Transaksi berhasil dihapus!', type: 'success' });
//       setShowDeleteConfirm(false);
//       setDeleteTransactionId(null);
//       if (transactions.length === 1 && currentPage > 1) {
//         setCurrentPage(currentPage - 1);
//       }
//       await fetchTransactions();
//     } catch (err: any) {
//       setNotification({ message: err.message || 'Gagal menghapus transaksi', type: 'error' });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const openDetailModal = (transaction: Transaction) => {
//     setSelectedTransaction(transaction);
//     setShowDetailModal(true);
//   };

//   const closeDetailModal = () => {
//     setSelectedTransaction(null);
//     setShowDetailModal(false);
//   };

//   if (isLoading) return <TransactionSkeleton />;
//   if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

//   return (
//     <div className="p-9 relative z-8">
//       {/* HALLOWEEN DECORATION */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute -top-5 -left-5 text-5xl animate-bounce">🦇</div>
//         <div className="absolute -top-10 -right-10 text-6xl animate-ping">🎃</div>
//         <div className="absolute -bottom-10 -left-10 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 right-0 text-5xl animate-pulse">👻</div>
//         <div className="absolute -bottom-6 -right-6 text-5xl animate-bounce">💀</div>
//       </div>

//       {/* PARTICLE EFFECT */}
//       {particles.map((p, i) => (
//         <div
//           key={i}
//           className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-ping"
//           style={{
//             left: p.left,
//             top: p.top,
//             animationDelay: p.delay,
//             animationDuration: p.duration,
//           }}
//         />
//       ))}

//       {/* Pop-up Notification */}
//       {notification && (
//         <div className="fixed top-5 right-5 z-50 max-w-xs w-full animate-slide-in-right">
//           <div
//             className={`p-4 rounded-lg shadow-lg border-2 flex items-center gap-2 ${
//               notification.type === 'success'
//                 ? 'bg-green-700 border-green-500 text-white'
//                 : 'bg-red-700 border-red-500 text-white'
//             }`}
//           >
//             <span className="text-2xl">
//               {notification.type === 'success' ? '🎉' : '⚠️'}
//             </span>
//             <p className="font-semibold">{notification.message}</p>
//           </div>
//         </div>
//       )}

//       {/* Top bar: button + search */}
//       <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
//         <button
//           onClick={() => setShowForm(true)}
//           className={`bg-[#800020] hover:bg-[#800020]/70 truncate text-sm semibold md:text-base text-[#ff4500] px-6 py-2 rounded bold shadow-lg border border-orange-400 transition duration-200 ${lacquer.className}`}
//         >
//           + Tambah Transaksi
//         </button>
//         <div className={`w-full md:w-auto md:max-w-sm ${lacquer.className}`}>
//           <Search placeholder="Cari transaksi..." />
//         </div>
//       </div>

//       {/* Modal Form Tambah Transaksi */}
//       {showForm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//             <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
//             <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
//             <button
//               onClick={() => setShowForm(false)}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup form tambah transaksi"
//             >
//               ×
//             </button>
//             <h2
//               className="w-full text-center text-2xl font-bold tracking-widest p-4 shadow-md "
//               style={{
//                 color: '#800000',
//                 textShadow: "2px 2px 4px rgba(255, 69, 0, 0.7)",
//                 fontFamily: "'Nosifer', cursive",
//                 fontSize: "20px",
//               }}
//             >
//               Form Tambah Transaksi
//             </h2>
//             <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="ID Produk"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 required
//                 min="1"
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="ID Produk"
//               />
//               <input
//                 type="text"
//                 placeholder="Nama Pembeli"
//                 value={buyerName}
//                 onChange={(e) => setBuyerName(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="Nama Pembeli"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Harga"
//                 value={totalPrice}
//                 onChange={(e) => setTotalPrice(e.target.value)}
//                 required
//                 min="0"
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="Total Harga"
//               />
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="Tanggal Transaksi"
//               />
//               <div className="col-span-1 md:col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                 >
//                   {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Form Edit Transaksi */}
//       {showEditForm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
//             <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
//             <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
//             <button
//               onClick={() => {
//                 setShowEditForm(false);
//                 setEditTransactionId(null);
//                 setEditProductId('');
//                 setEditBuyerName('');
//                 setEditTotalPrice('');
//               }}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup form edit transaksi"
//             >
//               ×
//             </button>
//             <h2
//               className="w-full text-center text-2xl font-bold tracking-widest p-4 shadow-md "
//               style={{
//                 color: '#800000',
//                 textShadow: "2px 2px 4px rgba(255, 69, 0, 0.7)",
//                 fontFamily: "'Nosifer', cursive",
//                 fontSize: "20px",
//               }}
//             >
//               Form Edit Transaksi
//             </h2>
//             <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
//               <input
//                 type="number"
//                 placeholder="ID Produk"
//                 value={editProductId}
//                 onChange={(e) => setEditProductId(e.target.value)}
//                 required
//                 min="1"
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="ID Produk"
//               />
//               <input
//                 type="text"
//                 placeholder="Nama Pembeli"
//                 value={editBuyerName}
//                 onChange={(e) => setEditBuyerName(e.target.value)}
//                 required
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="Nama Pembeli"
//               />
//               <input
//                 type="number"
//                 placeholder="Total Harga"
//                 value={editTotalPrice}
//                 onChange={(e) => setEditTotalPrice(e.target.value)}
//                 required
//                 min="0"
//                 className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 aria-label="Total Harga"
//               />
//               <div className="col-span-1 md:col-span-2">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
//                 >
//                   {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Konfirmasi Hapus */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//             <button
//               onClick={() => {
//                 setShowDeleteConfirm(false);
//                 setDeleteTransactionId(null);
//               }}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup konfirmasi hapus"
//             >
//               ×
//             </button>
//             <h3
//               className="w-full text-center text-2xl font-bold tracking-widest p-4 shadow-md "
//               style={{
//                 color: '#800000',
//                 textShadow: "2px 2px 4px rgba(255, 69, 0, 0.7)",
//                 fontFamily: "'Nosifer', cursive",
//                 fontSize: "20px",
//               }}
//             >
//               Konfirmasi Hapus
//             </h3>
//             <p className="text-orange-300 mb-4 text-center">Apakah Anda yakin ingin menghapus transaksi ini?</p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => {
//                   setShowDeleteConfirm(false);
//                   setDeleteTransactionId(null);
//                 }}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold shadow-lg border border-gray-400 transition duration-200"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={isSubmitting}
//                 className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-bold shadow-lg border border-red-400 transition duration-200"
//               >
//                 {isSubmitting ? 'Menghapus...' : 'Hapus'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal Detail Transaksi */}
//       {showDetailModal && selectedTransaction && (
//         <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
//           <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
//             <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
//             <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
//             <button
//               onClick={closeDetailModal}
//               className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
//               aria-label="Tutup detail transaksi"
//             >
//               ×
//             </button>
//            <h2
//               className="w-full text-center text-2xl font-bold tracking-widest p-4 shadow-md "
//               style={{
//                 color: '#800000',
//                 textShadow: "2px 2px 4px rgba(255, 69, 0, 0.7)",
//                 fontFamily: "'Nosifer', cursive",
//                 fontSize: "20px",
//               }}
//             >
//               Detail Transaksi
//             </h2>
//             <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>ID Transaksi:</span>
//                 <span className="text-orange-300">{selectedTransaction.id || '-'}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Nama Pembeli:</span>
//                 <span className="text-orange-300">{selectedTransaction.buyerName || '-'}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>ID Produk:</span>
//                 <span className="text-orange-300">{selectedTransaction.productId || '-'}</span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Total Harga:</span>
//                 <span className="text-orange-300">
//                   {selectedTransaction.totalPrice !== null
//                     ? `Rp ${selectedTransaction.totalPrice.toLocaleString()}`
//                     : '-'}
//                 </span>
//               </div>
//               <div className="flex justify-between border-b border-orange-500 pb-2">
//                 <span>Tanggal:</span>
//                 <span className="text-orange-300">
//                   {selectedTransaction.date
//                     ? new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
//                         year: 'numeric',
//                         month: 'long',
//                         day: 'numeric',
//                       })
//                     : '-'}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Tabel Transaksi */}
//       <div className="overflow-x-auto border-4 border-orange-500 shadow-xl rounded-2xl bg-[#1a1a2e]">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-[#800020] to-[#800020] border-b-4 border-orange-500">
//             <tr>
//               {['No', 'ID Transaksi', 'Nama Pembeli', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
//                 <th
//                   key={h}
//                   scope="col"
//                   className={`px-4 py-3 text-center text-[#ff4500] text-lg font-bold uppercase tracking-wider ${lacquer.className} ${
//                     h === 'Aksi' ? 'min-w-[180px]' : ''
//                   }`}
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.length > 0 ? (
//               transactions.map((tx, idx) => (
//                 <tr
//                   key={tx.id}
//                   className="border-b border-[#800020] hover:bg-[#800020]/70 transition duration-300"
//                 >
//                   <td className="px-4 py-3 text-center text-orange-400 font-bold">
//                     {(currentPage - 1) * itemsPerPage + idx + 1}
//                   </td>
//                   <td className="px-4 py-3 text-yellow-200 text-center">{tx.id || '-'}</td>
//                   <td className="px-4 py-3 text-orange-300 text-center">{tx.buyerName || '-'}</td>
//                   <td className="px-4 py-3 text-orange-300 text-center">{tx.productId || '-'}</td>
//                   <td className="px-4 py-3 text-green-400 text-center">
//                     {typeof tx.totalPrice === 'number' ? `Rp ${tx.totalPrice.toLocaleString()}` : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-center text-yellow-600">
//                     {tx.date
//                       ? new Date(tx.date).toLocaleDateString('id-ID', {
//                           year: 'numeric',
//                           month: 'short',
//                           day: 'numeric',
//                         })
//                       : '-'}
//                   </td>
//                   <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
//                     <button
//                       onClick={() => openDetailModal(tx)}
//                       className="w-16 bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
//                       title="Lihat detail transaksi"
//                       aria-label={`Lihat detail transaksi ${tx.id}`}
//                     >
//                       Lihat
//                     </button>
//                     <button
//                       onClick={() => openEditModal(tx)}
//                       className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
//                       title="Edit transaksi"
//                       aria-label={`Edit transaksi ${tx.id}`}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => openDeleteConfirm(tx.id)}
//                       className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
//                       title="Hapus transaksi"
//                       aria-label={`Hapus transaksi ${tx.id}`}
//                     >
//                       Hapus
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="py-6 text-center text-gray-400 italic">
//                   Tidak ada transaksi ditemukan.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {totalTransactions > 0 && (
//         <div className="mt-6 flex justify-center gap-2">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-600 text-gray-400' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
//             aria-label="Previous Page"
//           >
//             Previous
//           </button>
//           {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//             <button
//               key={page}
//               onClick={() => handlePageChange(page)}
//               className={`px-4 py-2 rounded ${currentPage === page ? 'bg-orange-700 text-white' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
//               aria-label={`Page ${page}`}
//             >
//               {page}
//             </button>
//           ))}
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-600 text-gray-400' : 'bg-orange-600 hover:bg-orange-500 text-white'}`}
//             aria-label="Next Page"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { TransactionSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';
import { lacquer } from '@/app/ui/font';

interface Transaction {
  id: number;
  productId: number;
  product_name: string;
  product_price: number;
  buyerName: string;
  date: string;
  totalPrice: number | null;
  category_name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const DEFAULT_ITEMS_PER_PAGE = 5;

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const search = searchParams.get('search') ?? '';
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const limitParam = parseInt(searchParams.get('limit') || DEFAULT_ITEMS_PER_PAGE.toString(), 10);

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const [itemsPerPage, setItemsPerPage] = useState(limitParam);

  // Form & Modal states untuk tambah transaksi
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal edit transaksi
  const [showEditForm, setShowEditForm] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState<number | null>(null);
  const [editProductId, setEditProductId] = useState('');
  const [editBuyerName, setEditBuyerName] = useState('');
  const [editTotalPrice, setEditTotalPrice] = useState('');

  // State untuk modal detail transaksi
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // State untuk modal konfirmasi hapus
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<number | null>(null);

  // State untuk pop-up notifikasi
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // State untuk efek partikel
  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  // Hitung total halaman
  const totalPages = Math.ceil(totalTransactions / itemsPerPage);

  // Fetch produk dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?limit=100', { cache: 'no-store' });
        if (!res.ok) {
          throw new Error('Gagal memuat produk');
        }
        const { data } = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Fetch products error:', err);
      }
    };
    fetchProducts();
  }, []);

  // Autofill totalPrice saat produk dipilih
  useEffect(() => {
    if (productId) {
      const selectedProduct = products.find((p) => p.id === parseInt(productId));
      if (selectedProduct) {
        setTotalPrice(selectedProduct.price.toString());
      }
    } else {
      setTotalPrice('');
    }
  }, [productId, products]);

  // Autofill editTotalPrice saat editProductId dipilih
  useEffect(() => {
    if (editProductId) {
      const selectedProduct = products.find((p) => p.id === parseInt(editProductId));
      if (selectedProduct) {
        setEditTotalPrice(selectedProduct.price.toString());
      }
    } else {
      setEditTotalPrice('');
    }
  }, [editProductId, products]);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(
        `/api/transaction?search=${encodeURIComponent(search)}&page=${currentPage}&limit=${itemsPerPage}`,
        { cache: 'no-store' }
      );
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal memuat transaksi');
      }
      const { data, total } = await res.json();
      console.log('API response:', { data, total, page: currentPage });
      if (!Array.isArray(data)) {
        throw new Error('Expected an array of transactions');
      }
      setTransactions(data);
      setTotalTransactions(total);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat transaksi. Silakan coba lagi nanti.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [search, currentPage, itemsPerPage]);

  // Fetch transaksi saat search, currentPage, atau itemsPerPage berubah
  useEffect(() => {
    fetchTransactions();
  }, [search, currentPage, itemsPerPage, fetchTransactions]);

  // Handle perubahan halaman
  const handlePageChange = async (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', page.toString());
      params.set('limit', itemsPerPage.toString());
      router.replace(`?${params.toString()}`, { scroll: false });
      await fetchTransactions();
    }
  };

  // Particle effect initialization
  useEffect(() => {
    const generated = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  // Notifikasi hilang setelah 3 detik
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    params.set('page', '1');
    params.set('limit', itemsPerPage.toString());
    router.replace(`?${params.toString()}`, { scroll: false });
    setCurrentPage(1);
  }, 300);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setNotification(null);

      if (!productId || !buyerName || !totalPrice || !date) {
        throw new Error('Semua kolom harus diisi.');
      }
      const parsedProductId = parseInt(productId);
      const parsedTotalPrice = parseFloat(totalPrice);
      if (isNaN(parsedProductId) || parsedProductId <= 0) {
        throw new Error('ID Produk harus berupa angka positif.');
      }
      if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
        throw new Error('Total Harga harus berupa angka non-negatif.');
      }
      if (isNaN(Date.parse(date))) {
        throw new Error('Tanggal tidak valid.');
      }

      const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: parsedProductId,
          buyerName,
          totalPrice: parsedTotalPrice,
          date: new Date(date).toISOString(),
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal menambahkan transaksi');
      }

      setNotification({ message: 'Transaksi berhasil ditambahkan!', type: 'success' });
      setProductId('');
      setBuyerName('');
      setTotalPrice('');
      setDate('');
      setShowForm(false);
      setCurrentPage(1);
      await fetchTransactions();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal menambahkan transaksi', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditModal = (transaction: Transaction) => {
    setEditTransactionId(transaction.id);
    setEditProductId(transaction.productId.toString());
    setEditBuyerName(transaction.buyerName || '');
    setEditTotalPrice(transaction.totalPrice?.toString() || '');
    setShowEditForm(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !editTransactionId) return;

    try {
      setIsSubmitting(true);
      setNotification(null);

      if (!editProductId || !editBuyerName || !editTotalPrice) {
        throw new Error('Semua kolom harus diisi.');
      }
      const parsedProductId = parseInt(editProductId);
      const parsedTotalPrice = parseFloat(editTotalPrice);
      if (isNaN(parsedProductId) || parsedProductId <= 0) {
        throw new Error('ID Produk harus berupa angka positif.');
      }
      if (isNaN(parsedTotalPrice) || parsedTotalPrice < 0) {
        throw new Error('Total Harga harus berupa angka non-negatif.');
      }

      const res = await fetch('/api/transaction', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editTransactionId,
          productId: parsedProductId,
          buyerName: editBuyerName,
          totalPrice: parsedTotalPrice,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal mengupdate transaksi');
      }

      setNotification({ message: 'Transaksi berhasil diupdate!', type: 'success' });
      setShowEditForm(false);
      setEditTransactionId(null);
      setEditProductId('');
      setEditBuyerName('');
      setEditTotalPrice('');
      await fetchTransactions();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal mengupdate transaksi', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteConfirm = (id: number) => {
    setDeleteTransactionId(id);
    setShowDeleteConfirm(true);
  };

  const handleDelete = async () => {
    if (!deleteTransactionId || isSubmitting) return;

    try {
      setIsSubmitting(true);
      setNotification(null);

      const res = await fetch(`/api/transaction?id=${deleteTransactionId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal menghapus transaksi');
      }

      setNotification({ message: 'Transaksi berhasil dihapus!', type: 'success' });
      setShowDeleteConfirm(false);
      setDeleteTransactionId(null);
      if (transactions.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      await fetchTransactions();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal menghapus transaksi', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDetailModal = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setSelectedTransaction(null);
    setShowDetailModal(false);
  };

  if (isLoading) return <TransactionSkeleton />;
  if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

  return (
    <>
      <div className="p-9 relative z-8">
        {/* HALLOWEEN DECORATION */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute -top-5 -left-5 text-5xl animate-bounce">🦇</div>
          <div className="absolute -top-10 -right-10 text-6xl animate-ping">🎃</div>
          <div className="absolute -bottom-10 -left-10 text-4xl animate-spin">🕷️</div>
          <div className="absolute top-1/2 right-0 text-5xl animate-pulse">👻</div>
          <div className="absolute -bottom-6 -right-6 text-5xl animate-bounce">💀</div>
        </div>

        {/* PARTICLE EFFECT */}
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-ping"
            style={{
              left: p.left,
              top: p.top,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}

        {/* Pop-up Notification */}
        {notification && (
          <div className="fixed top-5 right-5 z-50 max-w-xs w-full animate-slide-in-right">
            <div
              className={`p-4 rounded-lg shadow-lg border-2 flex items-center gap-2 ${
                notification.type === 'success'
                  ? 'bg-green-700 border-green-500 text-white'
                  : 'bg-red-700 border-red-500 text-white'
              }`}
            >
              <span className="text-2xl">
                {notification.type === 'success' ? '🎉' : '⚠️'}
              </span>
              <p className="font-semibold">{notification.message}</p>
            </div>
          </div>
        )}

        {/* Top bar: button + search */}
        <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
          <button
            onClick={() => setShowForm(true)}
            className={`bg-[#800020] hover:bg-[#800020]/70 text-[#ff4500] px-6 py-2 rounded font-bold shadow-lg border border-orange-400 transition duration-200 ${lacquer.className}`}
          >
            + Tambah Transaksi
          </button>
          <div className="w-full md:w-auto md:max-w-sm">
            <Search placeholder="Cari transaksi..." />
          </div>
        </div>

        {/* Modal Form Tambah Transaksi */}
        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
            <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
              <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
              <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
              <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
              <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
                aria-label="Tutup form tambah transaksi"
              >
                ×
              </button>
              <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Transaksi</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="productId" className="block text-orange-200 mb-1 font-semibold">
                    Produk
                  </label>
                  <select
                    id="productId"
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Pilih Produk"
                  >
                    <option value="" disabled>
                      Pilih Produk
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.id} - {product.name} (Rp {product.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="buyerName" className="block text-orange-200 mb-1 font-semibold">
                    Nama Pembeli
                  </label>
                  <input
                    id="buyerName"
                    type="text"
                    placeholder="Nama Pembeli"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Nama Pembeli"
                  />
                </div>
                <div>
                  <label htmlFor="totalPrice" className="block text-orange-200 mb-1 font-semibold">
                    Total Harga
                  </label>
                  <input
                    id="totalPrice"
                    type="number"
                    placeholder="Total Harga"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Total Harga"
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block text-orange-200 mb-1 font-semibold">
                    Tanggal
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Tanggal Transaksi"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Transaksi'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Form Edit Transaksi */}
        {showEditForm && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
            <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
              <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
              <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
              <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
              <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
              <button
                onClick={() => {
                  setShowEditForm(false);
                  setEditTransactionId(null);
                  setEditProductId('');
                  setEditBuyerName('');
                  setEditTotalPrice('');
                }}
                className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
                aria-label="Tutup form edit transaksi"
              >
                ×
              </button>
              <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Transaksi</h2>
              <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="editProductId" className="block text-orange-200 mb-1 font-semibold">
                    Produk
                  </label>
                  <select
                    id="editProductId"
                    value={editProductId}
                    onChange={(e) => setEditProductId(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Pilih Produk"
                  >
                    <option value="" disabled>
                      Pilih Produk
                    </option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.id} - {product.name} (Rp {product.price.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="editBuyerName" className="block text-orange-200 mb-1 font-semibold">
                    Nama Pembeli
                  </label>
                  <input
                    id="editBuyerName"
                    type="text"
                    placeholder="Nama Pembeli"
                    value={editBuyerName}
                    onChange={(e) => setEditBuyerName(e.target.value)}
                    required
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Nama Pembeli"
                  />
                </div>
                <div>
                  <label htmlFor="editTotalPrice" className="block text-orange-200 mb-1 font-semibold">
                    Total Harga
                  </label>
                  <input
                    id="editTotalPrice"
                    type="number"
                    placeholder="Total Harga"
                    value={editTotalPrice}
                    onChange={(e) => setEditTotalPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="px-4 py-3 rounded-lg bg-black text-white border-2 border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                    aria-label="Total Harga"
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
            <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
              <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
              <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteTransactionId(null);
                }}
                className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
                aria-label="Tutup konfirmasi hapus"
              >
                ×
              </button>
              <h2 className="text-orange-400 text-2xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
                Konfirmasi Hapus <span className="text-2xl">🗑️</span>
              </h2>
              <p className="text-orange-200 mb-6">Apakah Anda yakin ingin menghapus transaksi ini?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteTransactionId(null);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded font-bold shadow-lg border border-gray-400 transition duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isSubmitting}
                  className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded font-bold shadow-lg border border-red-400 transition duration-200"
                >
                  {isSubmitting ? 'Menghapus...' : 'Hapus'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Detail Transaksi */}
        {showDetailModal && selectedTransaction && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
            <div className="relative bg-gradient-to-br from-red-500 p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
              <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
              <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
              <button
                onClick={closeDetailModal}
                className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
                aria-label="Tutup detail transaksi"
              >
                ×
              </button>
              <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
                Detail Transaksi <span className="text-2xl">📋</span>
              </h2>
              <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
                <div className="flex justify-between border-b border-orange-500 pb-2">
                  <span>ID Transaksi:</span>
                  <span className="text-orange-300">{selectedTransaction.id || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-orange-500 pb-2">
                  <span>Nama Pembeli:</span>
                  <span className="text-orange-300">{selectedTransaction.buyerName || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-orange-500 pb-2">
                  <span>ID Produk:</span>
                  <span className="text-orange-300">{selectedTransaction.productId || '-'}</span>
                </div>
                <div className="flex justify-between border-b border-orange-500 pb-2">
                  <span>Total Harga:</span>
                  <span className="text-orange-300">
                    {selectedTransaction.totalPrice !== null
                      ? `Rp ${selectedTransaction.totalPrice.toLocaleString()}`
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-orange-500 pb-2">
                  <span>Tanggal:</span>
                  <span className="text-orange-300">
                    {selectedTransaction.date
                      ? new Date(selectedTransaction.date).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : '-'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabel Transaksi */}
        <div className="overflow-x-auto border-4 border-orange-500 shadow-xl rounded-2xl bg-[#1a1a2e]">
          <table className="min-w-full border-collapse">
            <thead className="bg-gradient-to-r from-[#800020] to-[#800020] border-b-4 border-[#800020]">
              <tr>
                {['No', 'ID Transaksi', 'Nama Pembeli', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className={`px-4 py-3 text-center text-[#ff4500] text-lg font-bold uppercase tracking-wider ${lacquer.className} ${
                      h === 'Aksi' ? 'min-w-[180px]' : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((tx, idx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-[#800020] hover:bg-[#800020]/70 transition duration-200"
                  >
                    <td className="px-4 py-3 text-center text-orange-400 font-bold">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="px-4 py-3 text-yellow-600 text-center">{tx.id || '-'}</td>
                    <td className="px-4 py-3 text-orange-300 text-center">{tx.buyerName || '-'}</td>
                    <td className="px-4 py-3 text-orange-300 text-center">{tx.productId || '-'}</td>
                    <td className="px-4 py-3 text-green-400 text-center">
                      {typeof tx.totalPrice === 'number' ? `Rp ${tx.totalPrice.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-center text-yellow-600">
                      {tx.date
                        ? new Date(tx.date).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : '-'}
                    </td>
                    <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
                      <button
                        onClick={() => openDetailModal(tx)}
                        className="w-16 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
                        title="Lihat detail transaksi"
                        aria-label={`Lihat detail transaksi ${tx.id}`}
                      >
                        Lihat
                      </button>
                      <button
                        onClick={() => openEditModal(tx)}
                        className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
                        title="Edit transaksi"
                        aria-label={`Edit transaksi ${tx.id}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(tx.id)}
                        className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
                        title="Hapus transaksi"
                        aria-label={`Hapus transaksi ${tx.id}`}
                      >
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

        {/* Pagination Controls */}
        {totalTransactions > 0 && (
          <div className="mt-6 flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-bold ${
                currentPage === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
              }`}
              aria-label="Halaman sebelumnya"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-bold ${
                  currentPage === page
                    ? 'bg-orange-500 text-white'
                    : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
                }`}
                aria-label={`Halaman ${page}`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-bold ${
                currentPage === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-[#800020] hover:bg-[#800020]/70 text-orange-600 border border-orange-400'
              }`}
              aria-label="Halaman berikutnya"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}