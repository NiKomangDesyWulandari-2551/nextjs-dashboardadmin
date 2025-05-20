'use client';
import { useEffect, useState } from 'react';

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchDrink = async () => {
      const res = await fetch('/api/products?category=drink');
      const data = await res.json();
      setProducts(data);
    };
    fetchDrink();
  }, []);

  return (
    <div className="p-6">

      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Nama Minuman</th>
            <th className="px-4 py-2">Kategori</th>
            <th className="px-4 py-2">Harga</th>
            <th className="px-4 py-2">Stok</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr key={product.id} className="bg-white border-t hover:bg-gray-50">
              <td className="px-4 py-2 text-center">{idx + 1}</td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">Rp {product.price.toLocaleString()}</td>
              <td className="px-4 py-2 text-center text-red-600 font-semibold">
                {product.stock ?? '-'}
              </td>
              <td className="px-4 py-2 text-center">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm">
                  {product.status ?? 'Aktif'}
                </span>
              </td>
              <td className="px-4 py-2 text-center space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 text-sm">
                  Lihat
                </button>
                <button className="bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 text-sm">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 text-sm">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
