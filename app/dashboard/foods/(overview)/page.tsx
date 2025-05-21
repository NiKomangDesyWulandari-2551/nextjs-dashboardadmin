// 'use client';
// import { useEffect, useState } from 'react';

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
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchFood = async () => {
//       const res = await fetch('/api/products?category=food');
//       const data = await res.json();
//       setProducts(data);
//     };
//     fetchFood();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black p-6 relative text-white font-mono">

//       {/* 🎃 Halloween Decorations */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
//       </div>

//       {/* 👻 Table with Spooky Style */}
//       <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'Nama Menu', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((heading) => (
//                 <th key={heading} className="px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider" style={{ textShadow: '0 0 8px #f97316' }}>
//                   {heading}
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
//                 <td className="px-4 py-3 text-green-400 text-center">Rp {product.price.toLocaleString()}</td>
//                 <td className="px-4 py-3 text-red-400 text-center font-semibold">{product.stock ?? '-'}</td>
//                 <td className="px-4 py-3 text-center">
//                   <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs border border-green-400 shadow-lg animate-pulse">
//                     {product.status ?? 'Aktif'}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-center space-x-2">
//                   <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform">Lihat</button>
//                   <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform">Edit</button>
//                   <button className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform">Hapus</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Floating Particles (Fireflies/Spooky Dots) */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-ping"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`,
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';

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
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

//   useEffect(() => {
//     const fetchFood = async () => {
//       const res = await fetch('/api/products?category=food');
//       const data = await res.json();
//       setProducts(data);
//     };
//     fetchFood();
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

//   return (
//     <div >
//       {/* Halloween Decorations */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
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

//       {/* Particle FX */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
//         {[...Array(25)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-40 animate-ping"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 4}s`,
//             }}
//           />
//         ))}
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
import { FoodSkeleton } from '@/app/ui/skeletons';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  stock?: number;
  status?: string;
}

export default function FoodPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true); // State untuk loading
  const [error, setError] = useState<string | null>(null); // State untuk error

  // State untuk particle effect
  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  // Durasi minimum skeleton (dalam milidetik)
  const MINIMUM_SKELETON_DURATION = 2000; // 2 detik

  useEffect(() => {
    const fetchFood = async () => {
      try {
        setIsLoading(true); // Mulai loading
        const res = await fetch('/api/products?category=food');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError('Gagal memuat produk makanan. Coba lagi nanti.');
        console.error(error);
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };
    fetchFood();
  }, []);

  useEffect(() => {
    const generated = Array.from({ length: 25 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generated);
  }, []);

  // Update product in DB & frontend state
  const handleSave = async (updated: Product) => {
    try {
      const res = await fetch(`/api/products/${updated.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error('Failed to update product');

      const data = await res.json();
      setProducts((prev) =>
        prev.map((p) => (p.id === data.id ? { ...p, ...data } : p))
      );
      setEditingProduct(null);
    } catch (error) {
      alert('Gagal update produk. Coba lagi.');
      console.error(error);
    }
  };

  // Delete product in DB & frontend state
  const handleDelete = async () => {
    if (!deletingProduct) return;
    try {
      const res = await fetch(`/api/products/${deletingProduct.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete product');

      setProducts((prev) => prev.filter((p) => p.id !== deletingProduct.id));
      setDeletingProduct(null);
    } catch (error) {
      alert('Gagal menghapus produk. Coba lagi.');
      console.error(error);
    }
  };

  // Render berdasarkan status loading
  if (isLoading) return <FoodSkeleton />;
  if (error) return <div className="text-red-400 text-center">{error}</div>;

  return (
    <div>
      {/* Halloween Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
        <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
        <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
      </div>

      {/* Particle FX */}
      <div className="absolute inset-0 z-0 pointer-events-none">
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
      </div>

      {/* Table */}
      <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
            <tr>
              {['No', 'Nama Menu', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-center text-orange-300 text-lg font-bold uppercase tracking-wider"
                  style={{ textShadow: '0 0 8px #f97316' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr
                key={product.id}
                className="border-b border-purple-700 hover:bg-purple-800/70 transition duration-300"
              >
                <td className="px-4 py-3 text-center text-orange-400 font-bold">{idx + 1}</td>
                <td className="px-4 py-3 text-yellow-200">{product.name}</td>
                <td className="px-4 py-3 text-purple-300 text-center">{product.category}</td>
                <td className="px-4 py-3 text-green-400 text-center">
                  Rp {product.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-red-400 text-center font-semibold">{product.stock ?? '-'}</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs border border-green-400 shadow-lg animate-pulse">
                    {product.status ?? 'Aktif'}
                  </span>
                </td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => setViewingProduct(product)}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded text-xs border border-blue-400 shadow-md hover:scale-105 transition-transform"
                  >
                    Lihat
                  </button>
                  <button
                    onClick={() => setEditingProduct(product)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs border border-yellow-400 shadow-md hover:scale-105 transition-transform"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingProduct(product)}
                    className="bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded text-xs border border-red-400 shadow-md hover:scale-105 transition-transform"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Edit Form */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-orange-400">Edit Produk</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);

                const priceRaw = formData.get('price') as string;
                const stockRaw = formData.get('stock') as string;

                const price = priceRaw ? Math.max(0, parseFloat(priceRaw)) : 0;
                const stock = stockRaw ? Math.max(0, parseInt(stockRaw)) : undefined;

                const updatedProduct: Product = {
                  ...editingProduct,
                  name: (formData.get('name') as string).trim(),
                  price,
                  image: (formData.get('image') as string).trim(),
                  description: (formData.get('description') as string).trim(),
                  category: (formData.get('category') as string).trim(),
                  stock,
                };
                handleSave(updatedProduct);
              }}
              className="space-y-4"
            >
              {[
                { name: 'name', type: 'text' },
                { name: 'price', type: 'number', min: 0, step: '0.01' },
                { name: 'image', type: 'text' },
                { name: 'description', type: 'text' },
                { name: 'category', type: 'text' },
                { name: 'stock', type: 'number', min: 0, step: '1' },
              ].map(({ name, type, min, step }) => (
                <input
                  key={name}
                  name={name}
                  type={type}
                  min={min}
                  step={step}
                  defaultValue={(editingProduct as any)[name]}
                  placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              ))}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-md text-center text-white">
            <p className="text-lg font-bold mb-4">
              Hapus produk{' '}
              <span className="text-red-400">{deletingProduct.name}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-700 rounded hover:bg-red-800"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: View Product */}
      {viewingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center">
          <div className="bg-gray-900 rounded-2xl p-8 w-[90%] max-w-xl text-white space-y-4 relative">
            <button
              onClick={() => setViewingProduct(null)}
              className="absolute top-4 right-4 text-red-400 hover:text-red-600 text-xl"
              aria-label="Close"
            >
              ✖
            </button>
            <h2 className="text-3xl font-bold text-center text-orange-400">
              {viewingProduct.name}
            </h2>
            <img
              src={viewingProduct.image}
              alt={viewingProduct.name}
              className="w-full h-60 object-cover rounded-xl"
            />
            <p className="text-sm text-gray-300 italic text-center">
              {viewingProduct.description}
            </p>
            <div className="flex justify-between mt-4">
              <span className="text-purple-300">
                Kategori: {viewingProduct.category}
              </span>
              <span className="text-green-300 font-semibold">
                Rp {viewingProduct.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}