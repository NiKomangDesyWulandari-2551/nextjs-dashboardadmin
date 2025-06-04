'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { TransactionSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';

interface Transaction {
  id: number;
  productId: number;
  buyerName: string;
  date: string;
  totalPrice: number | null;
}

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form & Modal states untuk tambah transaksi
  const [showForm, setShowForm] = useState(false);
  const [productId, setProductId] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  //  modal edit transaksi
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

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/transaction?search=${encodeURIComponent(search)}`);
      if (!res.ok) {
        throw new Error('Gagal memuat transaksi');
      }
      const data = await res.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat transaksi. Silakan coba lagi nanti.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [search]);

  //  notifikasi hilang setelah 3 detik
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: parseInt(productId),
          buyerName,
          totalPrice: parseInt(totalPrice),
          date,
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

    setIsSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch('/api/transaction', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editTransactionId,
          productId: parseInt(editProductId),
          buyerName: editBuyerName,
          totalPrice: parseInt(editTotalPrice),
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

    setIsSubmitting(true);
    setNotification(null);

    try {
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
    <div className="p-9 relative z-8">
      {/* Pop-up Notifikasi */}
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

      {/* Top bar: tombol + search */}
      <div className="mb-6 flex justify-between items-center flex-wrap gap-3">
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-800 hover:bg-purple-900 text-orange-300 px-6 py-2 rounded font-bold shadow-lg border border-orange-400 transition duration-200"
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
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
            <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
            <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Transaksi</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="number"
                placeholder="ID Produk"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Nama Pembeli"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                placeholder="Total Harga"
                value={totalPrice}
                onChange={(e) => setTotalPrice(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
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
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
            <button
              onClick={() => {
                setShowEditForm(false);
                setEditTransactionId(null);
                setEditProductId('');
                setEditBuyerName('');
                setEditTotalPrice('');
              }}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Transaksi</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="number"
                placeholder="ID Produk"
                value={editProductId}
                onChange={(e) => setEditProductId(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                placeholder="Nama Pembeli"
                value={editBuyerName}
                onChange={(e) => setEditBuyerName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="number"
                placeholder="Total Harga"
                value={editTotalPrice}
                onChange={(e) => setEditTotalPrice(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
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
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteTransactionId(null);
              }}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup"
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
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
            <button
              onClick={closeDetailModal}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup detail"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
              Detail Transaksi <span className="text-2xl">📋</span>
            </h2>
            <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>ID Transaksi:</span>
                <span className="text-purple-300">{selectedTransaction.id}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Nama Pembeli:</span>
                <span className="text-purple-300">{selectedTransaction.buyerName || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>ID Produk:</span>
                <span className="text-purple-300">{selectedTransaction.productId || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Total Harga:</span>
                <span className="text-purple-300">
                  {selectedTransaction.totalPrice !== null
                    ? `Rp ${selectedTransaction.totalPrice.toLocaleString()}`
                    : '-'}
                </span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Tanggal:</span>
                <span className="text-purple-300">
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
      <div className="overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
            <tr>
              {['No', 'ID Transaksi', 'Nama Customer', 'ID Produk', 'Total Harga', 'Tanggal', 'Aksi'].map((h) => (
                <th
                  key={h}
                  className={`px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider ${
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
                <tr key={tx.id} className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300">
                  <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
                  <td className="px-4 py-3 text-yellow-200 text-center">{tx.id ?? '-'}</td>
                  <td className="px-4 py-3 text-purple-300 text-center">{tx.buyerName ?? '-'}</td>
                  <td className="px-4 py-3 text-purple-300 text-center">{tx.productId ?? '-'}</td>
                  <td className="px-4 py-3 text-green-400 text-center">
                    {typeof tx.totalPrice === 'number' ? `Rp ${tx.totalPrice.toLocaleString()}` : '-'}
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
                  <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
                    <button
                      onClick={() => openDetailModal(tx)}
                      className="w-16 bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
                      title="Lihat detail transaksi"
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => openEditModal(tx)}
                      className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
                      title="Edit transaksi"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(tx.id)}
                      className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
                      title="Hapus transaksi"
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
    </div>
  );
}