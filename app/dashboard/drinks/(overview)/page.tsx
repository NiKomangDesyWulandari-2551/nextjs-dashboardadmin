'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Search from '@/app/ui/search';
import { DrinkSkeleton } from '@/app/ui/skeletons';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  description: string | null;
  category: string;
  categoryId: number;
  stock?: number;
  status?: string;
}

const PRODUCT_STATUS_OPTIONS = ['PENDING', 'PAID'];

export default function DrinkPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editImage, setEditImage] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editStatus, setEditStatus] = useState('PENDING');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  const DRINK_CATEGORY_ID = 121; // Replace with actual category ID

  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products?category=drink&search=${encodeURIComponent(search)}`);
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal memuat produk');
      }
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error('Expected an array of products');
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Gagal memuat produk. Silakan coba lagi nanti.');
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

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

  // Notification auto-dismiss
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
    router.push(`?${params.toString()}`);
  }, 300);

  // Create product
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setNotification(null);

    if (!editName || !editPrice || !editStock) {
      setNotification({ message: 'Nama, Harga, dan Stok harus diisi.', type: 'error' });
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseFloat(editPrice)) || parseFloat(editPrice) < 0) {
      setNotification({ message: 'Harga harus berupa angka positif.', type: 'error' });
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseInt(editStock)) || parseInt(editStock) < 0) {
      setNotification({ message: 'Stok harus berupa angka non-negatif.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          price: parseFloat(editPrice),
          image: editImage || null,
          description: editDescription || null,
          stock: parseInt(editStock) || 0,
          status: editStatus,
          categoryId: DRINK_CATEGORY_ID,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal menambahkan produk');
      }

      setNotification({ message: 'Produk berhasil ditambahkan!', type: 'success' });
      setEditName('');
      setEditPrice('');
      setEditImage('');
      setEditDescription('');
      setEditStock('');
      setEditStatus('PENDING');
      setShowCreateForm(false);
      await fetchProducts();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal menambahkan produk', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open edit modal
  const openEditModal = (product: Product) => {
    setEditProductId(product.id);
    setEditName(product.name);
    setEditPrice(product.price.toString());
    setEditImage(product.image || '');
    setEditDescription(product.description || '');
    setEditStock(product.stock?.toString() || '0');
    setEditStatus(product.status?.toUpperCase() || 'PENDING');
    setShowEditForm(true);
  };

  // Update product
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !editProductId) return;

    setIsSubmitting(true);
    setNotification(null);

    if (!editName || !editPrice || !editStock) {
      setNotification({ message: 'Nama, Harga, dan Stok harus diisi.', type: 'error' });
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseFloat(editPrice)) || parseFloat(editPrice) < 0) {
      setNotification({ message: 'Harga harus berupa angka positif.', type: 'error' });
      setIsSubmitting(false);
      return;
    }
    if (isNaN(parseInt(editStock)) || parseInt(editStock) < 0) {
      setNotification({ message: 'Stok harus berupa angka non-negatif.', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editProductId,
          name: editName,
          price: parseFloat(editPrice),
          image: editImage || null,
          description: editDescription || null,
          stock: parseInt(editStock) || 0,
          status: editStatus,
          categoryId: DRINK_CATEGORY_ID,
        }),
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal mengupdate produk');
      }

      setNotification({ message: 'Produk berhasil diupdate!', type: 'success' });
      setShowEditForm(false);
      setEditProductId(null);
      setEditName('');
      setEditPrice('');
      setEditImage('');
      setEditDescription('');
      setEditStock('');
      setEditStatus('PENDING');
      await fetchProducts();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal mengupdate produk', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open delete confirmation
  const openDeleteConfirm = (id: number) => {
    setDeleteProductId(id);
    setShowDeleteConfirm(true);
  };

  // Delete product
  const handleDelete = async () => {
    if (!deleteProductId || isSubmitting) return;

    setIsSubmitting(true);
    setNotification(null);

    try {
      const res = await fetch(`/api/products?id=${deleteProductId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Gagal menghapus produk');
      }

      setNotification({ message: 'Produk berhasil dihapus!', type: 'success' });
      setShowDeleteConfirm(false);
      setDeleteProductId(null);
      await fetchProducts();
    } catch (err: any) {
      setNotification({ message: err.message || 'Gagal menghapus produk', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open detail modal
  const openDetailModal = (product: Product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  // Close detail modal
  const closeDetailModal = () => {
    setSelectedProduct(null);
    setShowDetailModal(false);
  };

  if (isLoading) return <DrinkSkeleton />;
  if (error) return <div className="text-red-400 text-center py-8">{error}</div>;

  return (
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
          onClick={() => {
            setShowCreateForm(true);
            setEditName('');
            setEditPrice('');
            setEditImage('');
            setEditDescription('');
            setEditStock('');
            setEditStatus('PENDING');
          }}
          className="bg-purple-800 hover:bg-purple-900 text-orange-300 px-6 py-2 rounded font-bold shadow-lg border border-orange-400 transition duration-200"
        >
          + Tambah Minuman
        </button>
        <div className="w-full md:w-auto md:max-w-sm">
          <Search placeholder="Cari minuman..." onSearch={handleSearch} />
        </div>
      </div>

      {/* Modal Form Create Product */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
            <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
            <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setEditName('');
                setEditPrice('');
                setEditImage('');
                setEditDescription('');
                setEditStock('');
                setEditStatus('PENDING');
              }}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup form tambah minuman"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Minuman</h2>
            <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nama Minuman"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Nama Minuman"
              />
              <input
                type="number"
                placeholder="Harga"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                required
                min="0"
                step="1"
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Harga Minuman"
              />
              <input
                type="text"
                placeholder="URL Gambar (opsional)"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="URL Gambar Produk"
              />
              <textarea
                placeholder="Deskripsi (opsional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Deskripsi Produk"
              />
              <input
                type="number"
                placeholder="Stok"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
                required
                min="0"
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Stok Minuman"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Status Produk"
              >
                {PRODUCT_STATUS_OPTIONS.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
              <div className="col-span-1 md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Minuman'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Form Edit Product */}
      {showEditForm && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-xl w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-6 -left-6 text-6xl opacity-25 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-20 select-none pointer-events-none animate-bounce">👻</div>
            <div className="absolute top-4 right-20 text-5xl opacity-25 select-none pointer-events-none animate-spin-slow">🕷️</div>
            <div className="absolute bottom-5 left-16 text-5xl opacity-30 select-none pointer-events-none animate-ping">🦇</div>
            <button
              onClick={() => {
                setShowEditForm(false);
                setEditProductId(null);
                setEditName('');
                setEditPrice('');
                setEditImage('');
                setEditDescription('');
                setEditStock('');
                setEditStatus('PENDING');
              }}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup form edit minuman"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Minuman</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nama Minuman"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Nama Minuman"
              />
              <input
                type="number"
                placeholder="Harga"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                required
                min="0"
                step="1"
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Harga Minuman"
              />
              <input
                type="text"
                placeholder="URL Gambar (opsional)"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="URL Gambar Produk"
              />
              <textarea
                placeholder="Deskripsi (opsional)"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Deskripsi Produk"
              />
              <input
                type="number"
                placeholder="Stok"
                value={editStock}
                onChange={(e) => setEditStock(e.target.value)}
                required
                min="0"
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Stok Minuman"
              />
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Status Produk"
              >
                {PRODUCT_STATUS_OPTIONS.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
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

      {/* Modal Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
            <button
              onClick={() => {
                setShowDeleteConfirm(false);
                setDeleteProductId(null);
              }}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup konfirmasi hapus"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
              Konfirmasi Hapus <span className="text-2xl">🗑️</span>
            </h2>
            <p className="text-orange-200 mb-6">Apakah Anda yakin ingin menghapus produk ini?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setDeleteProductId(null);
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

      {/* Modal Detail Product */}
      {showDetailModal && selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-black p-8 rounded-2xl max-w-md w-full shadow-2xl border-4 border-orange-600 animate-fade-in overflow-hidden">
            <div className="absolute -top-8 -left-8 text-6xl opacity-20 select-none pointer-events-none animate-pulse">🎃</div>
            <div className="absolute -bottom-8 -right-8 text-7xl opacity-15 select-none pointer-events-none animate-bounce">👻</div>
            <button
              onClick={closeDetailModal}
              className="absolute top-3 right-4 text-orange-400 text-3xl hover:text-red-600 transition-shadow shadow-orange-600"
              aria-label="Tutup detail minuman"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
              Detail Minuman <span className="text-2xl">📋</span>
            </h2>
            <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Nama Minuman:</span>
                <span className="text-purple-300">{selectedProduct.name}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Kategori:</span>
                <span className="text-purple-300">{selectedProduct.category}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Harga:</span>
                <span className="text-purple-300">Rp {selectedProduct.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Stok:</span>
                <span className="text-purple-300">{selectedProduct.stock ?? '-'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Status:</span>
                <span className="text-purple-300">{selectedProduct.status ?? 'PENDING'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Deskripsi:</span>
                <span className="text-purple-300">{selectedProduct.description || '-'}</span>
              </div>
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Gambar:</span>
                {selectedProduct.image ? (
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="rounded shadow-lg max-h-40 object-contain"
                  />
                ) : (
                  <span className="text-purple-300">-</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
            <tr>
              {['No', 'Nama Minuman', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
                <th
                  key={h}
                  scope="col"
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
            {products.length > 0 ? (
              products.map((product, idx) => (
                <tr
                  key={product.id}
                  className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300"
                >
                  <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
                  <td className="px-4 py-3 text-yellow-200 text-center">{product.name}</td>
                  <td className="px-4 py-3 text-purple-300 text-center">{product.category}</td>
                  <td className="px-4 py-3 text-green-400 text-center">
                    Rp {product.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-red-400 text-center font-semibold">
                    {product.stock ?? '-'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border shadow-lg animate-pulse ${
                        product.status === 'PAID'
                          ? 'bg-green-700 text-white border-green-400'
                          : 'bg-yellow-700 text-white border-yellow-400'
                      }`}
                    >
                      {product.status ?? 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center flex justify-center gap-2 min-w-[180px]">
                    <button
                      onClick={() => openDetailModal(product)}
                      className="w-16 bg-yellow-700 hover:bg-yellow-800 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
                      title="Lihat detail produk"
                      aria-label={`Lihat detail ${product.name}`}
                    >
                      Lihat
                    </button>
                    <button
                      onClick={() => openEditModal(product)}
                      className="w-16 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
                      title="Edit produk"
                      aria-label={`Edit ${product.name}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteConfirm(product.id)}
                      className="w-16 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
                      title="Hapus produk"
                      aria-label={`Hapus ${product.name}`}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-6 text-center text-gray-400 italic">
                  Tidak ada minuman ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}