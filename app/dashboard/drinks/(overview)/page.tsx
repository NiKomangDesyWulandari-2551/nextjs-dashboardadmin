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

// export default function DrinkPage() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchDrink = async () => {
//       const res = await fetch('/api/products?category=drink');
//       const data = await res.json();
//       setProducts(data);
//     };
//     fetchDrink();
//   }, []);

//   return (
//     <div className="p-6">
//       {/* Floating Halloween Elements */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div className="absolute top-20 left-10 text-6xl animate-bounce">🎃</div>
//         <div className="absolute top-40 right-20 text-4xl animate-pulse">👻</div>
//         <div className="absolute bottom-20 left-20 text-5xl animate-spin">🦇</div>
//         <div className="absolute top-60 left-1/2 text-3xl animate-bounce">🕷️</div>
//       </div>
//       <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
//         <thead className="bg-blue-600 text-white">
//           <tr>
//             <th className="px-4 py-2">No</th>
//             <th className="px-4 py-2">Nama Minuman</th>
//             <th className="px-4 py-2">Kategori</th>
//             <th className="px-4 py-2">Harga</th>
//             <th className="px-4 py-2">Stok</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Aksi</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map((product, idx) => (
//             <tr key={product.id} className="bg-white border-t hover:bg-gray-50">
//               <td className="px-4 py-2 text-center">{idx + 1}</td>
//               <td className="px-4 py-2">{product.name}</td>
//               <td className="px-4 py-2">{product.category}</td>
//               <td className="px-4 py-2">Rp {product.price.toLocaleString()}</td>
//               <td className="px-4 py-2 text-center text-red-600 font-semibold">
//                 {product.stock ?? '-'}
//               </td>
//               <td className="px-4 py-2 text-center">
//                 <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
//                   {product.status ?? 'Aktif'}
//                 </span>
//               </td>
//               <td className="px-4 py-2 text-center space-x-2">
//                 <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
//                   Lihat
//                 </button>
//                 <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm">
//                   Edit
//                 </button>
//                 <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
//                   Hapus
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';
// import { DrinkSkeleton } from '@/app/ui/skeletons';

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

// export default function DrinkPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

//   // INI POSISI BENARNYA: STATE PARTICLE DAN USEEFFECT
//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//   useEffect(() => {
//     const fetchDrink = async () => {
//       const res = await fetch('/api/products?category=drink');
//       const data = await res.json();
//       setProducts(data);
//     };
//     fetchDrink();
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
//     <div>
//       {/* HALLOWEEN DECORATION */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>

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
//       </div>

//       {/* TABEL PRODUK */}
//       <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'Nama Minuman', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
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
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-6">
//           <div className="bg-gray-900 rounded-xl max-w-xl w-full overflow-auto max-h-[90vh] text-white">
//             <div className="flex justify-between items-center p-4 border-b border-purple-700">
//               <h3 className="text-2xl font-bold text-orange-400">
//                 {viewingProduct.name}
//               </h3>
//               <button
//                 onClick={() => setViewingProduct(null)}
//                 className="text-orange-300 hover:text-orange-500 text-2xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="p-6 space-y-4">
//               <img
//                 src={viewingProduct.image}
//                 alt={viewingProduct.name}
//                 className="w-full max-h-64 object-contain rounded-lg"
//               />
//               <p>
//                 <span className="font-semibold text-orange-400">Kategori:</span>{' '}
//                 {viewingProduct.category}
//               </p>
//               <p>
//                 <span className="font-semibold text-orange-400">Harga:</span>{' '}
//                 Rp {viewingProduct.price.toLocaleString()}
//               </p>
//               <p>
//                 <span className="font-semibold text-orange-400">Stok:</span>{' '}
//                 {viewingProduct.stock ?? '-'}
//               </p>
//               <p>
//                 <span className="font-semibold text-orange-400">Status:</span>{' '}
//                 {viewingProduct.status ?? 'Aktif'}
//               </p>
//               <p>
//                 <span className="font-semibold text-orange-400">Deskripsi:</span>{' '}
//                 {viewingProduct.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// 'use client';
// import { useEffect, useState } from 'react';
// import { DrinkSkeleton } from '@/app/ui/skeletons';
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

// export default function DrinkPage() {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(true); // State untuk loading
//   const [error, setError] = useState<string | null>(null); // State untuk error (opsional)
//   const [searchTerm, setSearchTerm] = useState('');


//   // State dan useEffect untuk particle effect
//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//     // Durasi minimum skeleton (dalam milidetik)
//   const MINIMUM_SKELETON_DURATION = 2000; // 2 detik

//   useEffect(() => {
//     const fetchDrink = async () => {
//       try {
//         setIsLoading(true);
//         let url = '/api/products?category=drink';
//         if (searchTerm.trim() !== '') {
//           url += `&search=${encodeURIComponent(searchTerm.trim())}`;
//         }
//         const res = await fetch(url);
//         if (!res.ok) throw new Error('Failed to fetch products');
//         const data = await res.json();
//         setProducts(data);
//         setError(null);
//       } catch (error) {
//         setError('Gagal memuat produk. Coba lagi nanti.');
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchDrink();
//   }, [searchTerm]);


//   useEffect(() => {
//     const generated = Array.from({ length: 25 }).map(() => ({
//       left: `${Math.random() * 100}%`,
//       top: `${Math.random() * 100}%`,
//       delay: `${Math.random() * 5}s`,
//       duration: `${3 + Math.random() * 4}s`,
//     }));
//     setParticles(generated);
//   }, []);

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
//   if (isLoading) return <DrinkSkeleton />;
//   if (error) return <div className="text-red-400 text-center">{error}</div>;

//   return (
//     <div>
//       {/* HALLOWEEN DECORATION */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
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
//         ></div>
//       ))}

//       {/* Table */}
//       <div className="flex justify-end mb-4">
//         <Search />
//       </div>
//       <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'Nama Minuman', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
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
//           {products.length === 0 && (
//             <tr>
//               <td colSpan={7} className="text-center text-white py-4">
//                 Belum ada minuman di kategori ini.
//               </td>
//             </tr>
//           )}
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
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-6">
//           <div className="bg-gray-900 rounded-xl max-w-xl w-full overflow-auto max-h-[90vh] text-white">
//             <div className="flex justify-between items-center p-4 border-b border-purple-700">
//               <h3 className="text-2xl font-bold text-orange-400">
//                 {viewingProduct.name}
//               </h3>
//               <button
//                 onClick={() => setViewingProduct(null)}
//                 className="text-orange-300 hover:text-orange-500 text-2xl font-bold"
//               >
//                 ×
//               </button>
//               </div>
//               <div className="p-6 space-y-4">
//                               <img
//                   src={viewingProduct.image}
//                   alt={viewingProduct.name}
//                   className="w-full h-64 object-cover rounded-lg border border-purple-600 shadow-lg"
//                 />
//                 <p>
//                   <span className="font-semibold text-purple-300">Kategori:</span>{' '}
//                   {viewingProduct.category}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-purple-300">Harga:</span>{' '}
//                   Rp {viewingProduct.price.toLocaleString()}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-purple-300">Stok:</span>{' '}
//                   {viewingProduct.stock ?? '-'}
//                 </p>
//                 <p>
//                   <span className="font-semibold text-purple-300">Status:</span>{' '}
//                   {viewingProduct.status ?? 'Aktif'}
//                 </p>
//                 <p className="text-gray-300">
//                   <span className="font-semibold text-purple-300">Deskripsi:</span>{' '}
//                   {viewingProduct.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { DrinkSkeleton } from '@/app/ui/skeletons';
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

// export default function DrinkPage() {
//   const searchParams = useSearchParams();
//   const search = searchParams.get('search') ?? '';

//   const [products, setProducts] = useState<Product[]>([]);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
//   const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const [particles, setParticles] = useState<
//     { left: string; top: string; delay: string; duration: string }[]
//   >([]);

//   // Fetch data function
//   const fetchProducts = async () => {
//     try {
//       setIsLoading(true);
//       const url = `/api/products?category=drink&search=${encodeURIComponent(search)}`;
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

//   useEffect(() => {
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

//   if (isLoading) return <DrinkSkeleton />;
//   if (error) return <div className="text-red-400 text-center">{error}</div>;

//   return (
//     <div className="relative">
//       {/* HALLOWEEN DECORATION */}
//       <div className="absolute inset-0 pointer-events-none z-0">
//         <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
//         <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
//         <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
//         <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
//         <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
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

//       {/* Search bar */}
//       <div className="flex justify-end mb-4 relative z-10">
//         <Search />
//       </div>

//       {/* Products Table */}
//       <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
//             <tr>
//               {['No', 'Nama Minuman', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
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
//             {products.length === 0 && (
//               <tr>
//                 <td colSpan={7} className="text-center text-white py-4">
//                   Belum ada minuman di kategori ini.
//                 </td>
//               </tr>
//             )}
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

//       {/* Edit Modal */}
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
//                   status: (formData.get('status') as string).trim(),
//                 };

//                 handleSave(updatedProduct);
//               }}
//             >
//               <label className="block mb-2 text-orange-300 font-semibold">Nama</label>
//               <input
//                 name="name"
//                 defaultValue={editingProduct.name}
//                 required
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Kategori</label>
//               <input
//                 name="category"
//                 defaultValue={editingProduct.category}
//                 required
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Harga (Rp)</label>
//               <input
//                 name="price"
//                 type="number"
//                 min={0}
//                 step="1000"
//                 defaultValue={editingProduct.price}
//                 required
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Stok</label>
//               <input
//                 name="stock"
//                 type="number"
//                 min={0}
//                 defaultValue={editingProduct.stock ?? ''}
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Status</label>
//               <input
//                 name="status"
//                 defaultValue={editingProduct.status ?? 'Aktif'}
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Gambar (URL)</label>
//               <input
//                 name="image"
//                 type="jpg"
//                 defaultValue={editingProduct.image}
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
//               />

//               <label className="block mb-2 text-orange-300 font-semibold">Deskripsi</label>
//               <textarea
//                 name="description"
//                 defaultValue={editingProduct.description}
//                 className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600 resize-none"
//               />

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={() => setEditingProduct(null)}
//                   className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
//                 >
//                   Batal
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
//                 >
//                   Simpan
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deletingProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
//           <div className="bg-gray-900 p-6 rounded-lg max-w-sm text-center">
//             <h3 className="text-xl font-bold text-red-500 mb-4">
//               Hapus Produk
//             </h3>
//             <p className="text-white mb-6">
//               Apakah Anda yakin ingin menghapus <strong>{deletingProduct.name}</strong>?
//             </p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={() => setDeletingProduct(null)}
//                 className="px-4 py-2 bg-gray-700 rounded text-white hover:bg-gray-600"
//               >
//                 Batal
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700"
//               >
//                 Hapus
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* View Product Modal */}
//       {viewingProduct && (
//         <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
//           <div className="bg-gray-900 rounded-xl max-w-md w-full p-6 overflow-auto max-h-[80vh]">
//             <h2 className="text-2xl font-bold text-orange-400 mb-4">{viewingProduct.name}</h2>
//             <img
//               src={viewingProduct.image}
//               alt={viewingProduct.name}
//               className="w-full h-48 object-cover rounded mb-4"
//               onError={(e) => {
//                 (e.target as HTMLImageElement).src = '/placeholder.png';
//               }}
//             />
//             <p className="text-yellow-300 mb-3"><strong>Kategori:</strong> {viewingProduct.category}</p>
//             <p className="text-green-400 mb-3"><strong>Harga:</strong> Rp {viewingProduct.price.toLocaleString()}</p>
//             <p className="text-red-400 mb-3"><strong>Stok:</strong> {viewingProduct.stock ?? '-'}</p>
//             <p className="text-orange-300 mb-4 whitespace-pre-wrap">{viewingProduct.description}</p>
//             <button
//               onClick={() => setViewingProduct(null)}
//               className="mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 rounded text-white"
//             >
//               Tutup
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { DrinkSkeleton } from '@/app/ui/skeletons';
import Search from '@/app/ui/search';

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

export default function DrinkPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') ?? '';

  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [particles, setParticles] = useState<
    { left: string; top: string; delay: string; duration: string }[]
  >([]);

  // Fetch data function
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const url = `/api/products?category=drink&search=${encodeURIComponent(search)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (e) {
      setError('Gagal memuat produk. Coba lagi nanti.');
      console.error(e);
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

  // Save edited product to API and update state
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

  // Delete product via API and update state
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

  if (isLoading) return <DrinkSkeleton />;
  if (error) return <div className="text-red-400 text-center">{error}</div>;

  return (
    <div className="relative">
      {/* HALLOWEEN DECORATION */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 text-5xl animate-bounce">🦇</div>
        <div className="absolute top-24 right-24 text-6xl animate-ping">🎃</div>
        <div className="absolute bottom-16 left-16 text-4xl animate-spin">🕷️</div>
        <div className="absolute top-1/2 left-1/3 text-5xl animate-pulse">👻</div>
        <div className="absolute bottom-10 right-10 text-5xl animate-bounce">💀</div>
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

      {/* Search bar */}
      <div className="flex justify-end mb-4 relative z-10">
        <Search />
      </div>

      {/* Products Table */}
      <div className="relative z-10 overflow-x-auto border-4 border-purple-700 shadow-xl rounded-2xl bg-black bg-opacity-90">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-purple-700 to-purple-900 border-b-4 border-orange-500">
            <tr>
              {['No', 'Nama Minuman', 'Kategori', 'Harga', 'Stok', 'Status', 'Aksi'].map((h) => (
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
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-white py-4">
                  Belum ada minuman di kategori ini.
                </td>
              </tr>
            )}
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

      {/* Edit Modal */}
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
                  status: (formData.get('status') as string).trim(),
                };

                handleSave(updatedProduct);
              }}
            >
              <label className="block mb-2 text-orange-300 font-semibold">Nama</label>
              <input
                name="name"
                defaultValue={editingProduct.name}
                required
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Kategori</label>
              <input
                name="category"
                defaultValue={editingProduct.category}
                required
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Harga (Rp)</label>
              <input
                name="price"
                type="number"
                min={0}
                step="1000"
                defaultValue={editingProduct.price}
                required
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Stok</label>
              <input
                name="stock"
                type="number"
                min={0}
                defaultValue={editingProduct.stock ?? ''}
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Status</label>
              <input
                name="status"
                defaultValue={editingProduct.status ?? 'Aktif'}
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Gambar (URL)</label>
              <input
                name="image"
                type="jpg"
                defaultValue={editingProduct.image}
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600"
              />

              <label className="block mb-2 text-orange-300 font-semibold">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editingProduct.description}
                className="w-full mb-3 p-2 rounded bg-gray-800 text-white border border-orange-600 resize-none"
              />

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 transition"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-gray-900 rounded-xl p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Konfirmasi Hapus
            </h2>
            <p className="mb-6 text-white">
              Apakah Anda yakin ingin menghapus produk{' '}
              <span className="font-semibold">{deletingProduct.name}</span>?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeletingProduct(null)}
                className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {viewingProduct && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-xl w-full p-6 overflow-auto">
            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              {viewingProduct.name}
            </h2>
            <img
              src={viewingProduct.image}
              alt={viewingProduct.name}
              className="rounded shadow-lg max-h-60 mx-auto mb-4 object-contain"
            />
            <p className="mb-2 text-white">{viewingProduct.description}</p>
            <p className="mb-1 text-yellow-300 font-semibold">
              Kategori: {viewingProduct.category}
            </p>
            <p className="mb-1 text-green-400 font-semibold">
              Harga: Rp {viewingProduct.price.toLocaleString()}
            </p>
            <p className="mb-1 text-red-400 font-semibold">
              Stok: {viewingProduct.stock ?? '-'}
            </p>
            <p className="mb-3 text-green-500 font-semibold">
              Status: {viewingProduct.status ?? 'Aktif'}
            </p>
            <button
              onClick={() => setViewingProduct(null)}
              className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
