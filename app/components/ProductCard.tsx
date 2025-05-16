// import Image from 'next/image';
// import Head from "next/head";


// interface ProductCardProps {
//   image: string;
//   name: string;
//   price: number;
//   onEdit: () => void;   
//   onDelete: () => void;  
// }

// export default function ProductCard({
//   image,
//   name,
//   price,
//   onEdit,
//   onDelete
// }: ProductCardProps) {
  
//   return (
//     <div className="bg-gray-800 bg-opacity-80 p-4 rounded-t-3xl shadow-md text-center w-60">
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
//           rel="stylesheet"
//         />
//       </Head>
//       {/* Gambar dengan ukuran seragam */}
//       <div className="relative w-50 h-50 aspect-square rounded-t-3xl overflow-hidden">
//         <Image 
//           src={image} 
//           alt={name} 
//           fill 
//           className="rounded-lg object-cover object-center"
//         />
//       </div>
//       <p
//         style={{ fontFamily: 'Chilanka, cursive', fontSize:'15px', color: '#8FAFBC' }}
//         className="text-white font-bold text-sm bg-gray-900 bg-opacity-90 px-4 py-1 rounded-full inline-block mt-4"
//       >
//         {name}
//       </p>
//       <p className="text-green-400 text-lg" style={{ fontFamily: 'Chilanka, cursive', fontSize:'15px', color: '#8FAFBC' }}>
//         Rp. {price.toLocaleString()}
//       </p>

//       {/* Tombol Edit dan Delete */}
//       <div className="flex justify-center space-x-4 mt-2">
//         <button
//           className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//           style={{ fontFamily: 'Baloo, cursive' }}
//           onClick={onEdit}
//         >
//           Edit
//         </button>
//         <button
//           className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
//           style={{ fontFamily: 'Baloo, cursive' }}
//           onClick={onDelete}
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeleteConfirmation from '@/app/components/DeletedConfirmation';
import { deleteProduct } from '@/app/components/confirmDeleteProduct';
import { lusitana } from '@/app/ui/font';
// import Search from '@/app/ui/search';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductCatalogProps {
  products: Product[] | undefined;
}

export default function ProductCatalog({ products = [] }: ProductCatalogProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    router.push(`/products/edit/${id}`);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId) {
      const result = await deleteProduct(selectedProductId);
      if (result.success) {
        router.refresh();
      } else {
        alert(result.message);
      }
    }
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  // Log produk untuk debugging
  console.log("Produk yang diterima di ProductCatalog:", products);

  return (
    <>
      <div className="w-full">
        <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
          Katalog Produk
        </h1>
        <div className="mt-6 flow-root">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
                {/* Tampilan Mobile */}
                <div className="md:hidden">
                  {products.length > 0 ? (
                    products.map((product) => (
                      <div
                        key={product.id}
                        className="mb-2 w-full rounded-md bg-white p-4"
                      >
                        <div className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="text-sm font-medium">{product.name}</p>
                            <p className="text-sm text-gray-500">
                              ID:{' '}
                              {typeof product.id === 'string'
                                ? product.id.slice(0, 8)
                                : 'ID Tidak Valid'}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-full items-center justify-between border-b py-5">
                          <div className="flex w-1/2 flex-col">
                            <p className="text-xs">Harga</p>
                            <p className="font-medium">
                              Rp. {product.price.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
                        <div className="pt-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                              onClick={() => handleEdit(product.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              onClick={() => handleDeleteClick(product.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Tidak ada produk tersedia.
                    </div>
                  )}
                </div>
                {/* Tampilan Desktop */}
                <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                  <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        ID Produk
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Nama Produk
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Harga
                      </th>
                      <th scope="col" className="px-4 py-5 font-medium">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-gray-900">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product.id} className="group">
                          <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                            {typeof product.id === 'string'
                              ? product.id.slice(0, 8)
                              : 'ID Tidak Valid'}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            {product.name}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                            Rp. {product.price.toLocaleString('id-ID')}
                          </td>
                          <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                            <div className="flex space-x-2">
                              <button
                                className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                                onClick={() => handleEdit(product.id)}
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                onClick={() => handleDeleteClick(product.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="whitespace-nowrap bg-white py-5 text-sm text-center text-gray-500"
                        >
                          Tidak ada produk tersedia.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation
        isOpen={isModalOpen}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}