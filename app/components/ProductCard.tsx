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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/ui/table";
import DeleteConfirmation from './DeleteConfirmation';
import { deleteProduct } from '@/app/lib/actions';

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductCatalogProps {
  products: Product[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
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

  return (
    <>
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-4">Katalog Produk</h2>
        <div className="border rounded-lg overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">ID Produk</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead className="w-[200px]">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    Tidak ada data produk.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id.slice(0, 8)}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>Rp. {product.price.toLocaleString('id-ID')}</TableCell>
                    <TableCell>
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
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
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