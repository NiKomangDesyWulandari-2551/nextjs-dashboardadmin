// 'use client';
// import { Suspense, useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { FoodSkeleton } from '@/app/ui/skeletons';
// import Search from '@/app/ui/search';


// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
//   category: string;
//   stock?: number;
//   status?: string;
// }

// export default function FoodPage() {
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') ?? '';

//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // State untuk loading
//   const [error, setError] = useState<string | null>(null); // State untuk error

//   // State untuk particle effect
//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//     // Fetch data function
//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       const url = `/api/products?category=food&search=${encodeURIComponent(search)}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error('Failed to fetch products');
//       const data = await res.json();
//       setProducts(data);
//       setError(null);
//     } catch (e) {
//       setError('Gagal memuat produk. Coba lagi nanti.');
//       console.error(e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//     useEffect(() => {
//     fetchProducts();
//   }, [search]);

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

//   // Durasi minimum skeleton (dalam milidetik)
//   const MINIMUM_SKELETON_DURATION = 2000; // 2 detik

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         setIsLoading(true); // Mulai loading
//         const res = await fetch('/api/products?category=food');
//         if (!res.ok) throw new Error('Failed to fetch products');
//         const data = await res.json();
//         setProducts(data);
//       } catch (error) {
//         setError('Gagal memuat produk makanan. Coba lagi nanti.');
//         console.error(error);
//       } finally {
//         setIsLoading(false); // Selesai loading
//       }
//     };
//     fetchFood();
//   }, []);

//   useEffect(() => {
//     const generated = Array.from({ length: 25 }).map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 5}s`,
//       duration: `${3 + Math.random() * 4}s`,
//     }));
//     setParticles(generated);
//   }, []);

//   // Update product in DB & frontend state
//   const handleSave = async (updated: Product) => {
//     try {
//       const res = await fetch(`/api/products/${updated.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(updated),
//       });
//       if (!res.ok) throw new Error('Failed to update product');

//       const data = await res.json();
//       setProducts((prev) =>
//         prev.map((p) => (p.id === data.id ? { ...p, ...data } : p))
//       );
//       setEditingProduct(null);
//     } catch (error) {
//       alert('Gagal update produk. Coba lagi.');
//       console.error(error);
//     }
//   };

//   // Delete product in DB & frontend state
//   const handleDelete = async () => {
//     if (!deletingProduct) return;
//     try {
//       const res = await fetch(`/api/products/${deletingProduct.id}`, {
//         method: 'DELETE',
//       });
//       if (!res.ok) throw new Error('Failed to delete product');

//       setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
//       setDeletingProduct(null);
//     } catch (error) {
//       alert('Gagal menghapus produk. Coba lagi.');
//       console.error(error);
//     }
//   };

//   // Render berdasarkan status loading
//   if (isLoading) return <FoodSkeleton />;
//   if (error) return <div className="text-red-400 text-center">{error}</div>;

//   return (
//     <div>
//       {/* Halloween Decorations */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
//       </div>

//       <div className="mt-4 flext items-center justify-bettween gap-2 md:mt-8">
//         <Search placeholder="secarch food..." />
//       </div>

//       {/* <Suspense key={query + currentPage} fallback={<FoodSkeleton />}>
//         <Tabel query={query} currentPage={currentPage} />
//       </Suspense> */}

//       {/* Particle FX */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
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
//       </div>

//       {/* Table */}
//       <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'Nama Menu', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
//                 <th
//                   key={h}
//                   className="px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider"
//                   style={{ textShadow: '0 0 8px #f97316' }}
//                 >
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product, idx) => (
//               <tr
//                 key={product.id}
//                 className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300"
//               >
//                 <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
//                 <td className="px-4 py-3 text-yellow-200">{product.name}</td>
//                 <td className="px-4 py-3 text-purple-300 text-center">{product.category}</td>
//                 <td className="px-4 py-3 text-green-400 text-center">
//                   Rp {product.price.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-3 text-red-400 text-center font-semibold">{product.stock ?? '-'}</td>
//                 <td className="px-4 py-3 text-center">
//                   <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs border border-green-400 shadow-lg animate-pulse">
//                     {product.status ?? 'Aktif'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-center space-x-2">
//                   <button
//                     onClick={() => setViewingProduct(product)}
//                     className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
//                   >
//                     Lihat
//                   </button>
//                   <button
//                     onClick={() => setEditingProduct(product)}
//                     className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => setDeletingProduct(product)}
//                     className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
//                   >
//                     Hapus
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal: Edit Form */}
//       {editingProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
//           <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
//             <h2 className="text-xl font-bold mb-4 text-orange-400">Edit Produk</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.currentTarget);

//                 const priceRaw = formData.get('price') as string;
//                 const stockRaw = formData.get('stock') as string;

//                 const price = priceRaw ? Math.max(0, parseFloat(priceRaw)) : 0;
//                 const stock = stockRaw ? Math.max(0, parseInt(stockRaw)) : undefined;

//                 const updatedProduct: Product = {
//                   ...editingProduct,
//                   name: (formData.get('name') as string).trim(),
//                   price,
//                   image: (formData.get('image') as string).trim(),
//                   description: (formData.get('description') as string).trim(),
//                   category: (formData.get('category') as string).trim(),
//                   stock,
//                 };
//                 handleSave(updatedProduct);
//               }}
//               className="space-y-4"
//             >
//               {[
//                 { name: 'name', type: 'text' },
//                 { name: 'price', type: 'number', min: 0, step: '0.01' },
//                 { name: 'image', type: 'text' },
//                 { name: 'description', type: 'text' },
//                 { name: 'category', type: 'text' },
//                 { name: 'stock', type: 'number', min: 0, step: '1' },
//               ].map(({ name, type, min, step }) => (
//                 <input
//                   key={name}
//                   name={name}
//                   type={type}
//                   min={min}
//                   step={step}
//                   defaultValue={(editingProduct as any)[name]}
//                   placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
//                   className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
//                 />
//               ))}
//               <div className="flex justify-end space-x-2">
//                 <button
//                   type="button"
//                   onClick={() => setEditingProduct(null)}
//                   className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
//                 >
//                   Simpan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal: Delete Confirmation */}
//       {deletingProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
//           <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center text-white">
//             <p className="text-lg font-bold mb-4">
//               Hapus produk{' '}
//               <span className="text-red-400">{deletingProduct.name}</span>?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => setDeletingProduct(null)}
//                 className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-700 rounded hover:bg-red-800"
//               >
//                 Hapus
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal: View Product */}
//       {viewingProduct && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
//           <div className="bg-gray-900 rounded-2xl p-8 w-[90%] max-w-xl text-white space-y-4 relative">
//             <button
//               onClick={() => setViewingProduct(null)}
//               className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
//               aria-label="Close"
//             >
//               ✖
//             </button>
//             <h2 className="text-3xl font-bold text-center text-orange-400">
//               {viewingProduct.name}
//             </h2>
//             <img
//               src={viewingProduct.image}
//               alt={viewingProduct.name}
//               className="w-full h-60 object-cover rounded-xl"
//             />
//             <p className="text-sm text-gray-300 italic text-center">
//               {viewingProduct.description}
//             </p>
//             <div className="flex justify-between mt-4">
//               <span className="text-purple-300">
//                 Kategori: {viewingProduct.category}
//               </span>
//               <span className="text-green-300 font-semibold">
//                 Rp {viewingProduct.price.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Search from '@/app/ui/search';
import { FoodSkeleton } from '@/app/ui/skeletons';

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

export default function FoodPage() {
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

  const FOOD_CATEGORY_ID = 120; // Replace with actual category ID

  // Fetch products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/products?category=food&search=${encodeURIComponent(search)}`);
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
          categoryId: FOOD_CATEGORY_ID,
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
          categoryId: FOOD_CATEGORY_ID,
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

  if (isLoading) return <FoodSkeleton />;
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
          + Tambah Makanan
        </button>
        <div className="w-full md:w-auto md:max-w-sm">
          <Search placeholder="Cari makanan..." onSearch={handleSearch} />
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
              aria-label="Tutup form tambah makanan"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Tambah Makanan</h2>
            <form onSubmit={handleCreateSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nama Makanan"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Nama Makanan"
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
                aria-label="Harga Makanan"
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
                aria-label="Stok Makanan"
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
                  {isSubmitting ? 'Menyimpan...' : 'Simpan Makanan'}
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
              aria-label="Tutup form edit makanan"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-2xl font-extrabold mb-6 drop-shadow-lg">Form Edit Makanan</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Nama Makanan"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
                className="px-4 py-3 rounded-lg bg-black text-white border-2 border-purple-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Nama Makanan"
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
                aria-label="Harga Makanan"
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
                aria-label="Stok Makanan"
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
              aria-label="Tutup detail makanan"
            >
              ×
            </button>
            <h2 className="text-orange-400 text-3xl font-extrabold mb-6 flex items-center gap-3 drop-shadow-lg">
              Detail Makanan <span className="text-2xl">📋</span>
            </h2>
            <div className="text-orange-200 space-y-4 text-lg font-semibold leading-relaxed">
              <div className="flex justify-between border-b border-orange-500 pb-2">
                <span>Nama Makanan:</span>
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
              {['No', 'Nama Makanan', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
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
                  Tidak ada makanan ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}