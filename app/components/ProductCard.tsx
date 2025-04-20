import Image from 'next/image';
import Head from "next/head";


interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  onEdit: () => void;    // Fungsi untuk Edit
  onDelete: () => void;  // Fungsi untuk Delete
}

export default function ProductCard({
  image,
  name,
  price,
  onEdit,
  onDelete
}: ProductCardProps) {
  
  return (
    <div className="bg-gray-800 bg-opacity-80 p-4 rounded-t-3xl shadow-md text-center w-60">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* Gambar dengan ukuran seragam */}
      <div className="relative w-50 h-50 aspect-square rounded-t-3xl overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="rounded-lg object-cover object-center"
        />
      </div>
      <p
        style={{ fontFamily: 'Chilanka, cursive', fontSize:'15px', color: '#8FAFBC' }}
        className="text-white font-bold text-sm bg-gray-900 bg-opacity-90 px-4 py-1 rounded-full inline-block mt-4"
      >
        {name}
      </p>
      <p className="text-green-400 text-lg" style={{ fontFamily: 'Chilanka, cursive', fontSize:'15px', color: '#8FAFBC' }}>
        Rp. {price.toLocaleString()}
      </p>

      {/* Tombol Edit dan Delete */}
      <div className="flex justify-center space-x-4 mt-2">
        <button
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
          style={{ fontFamily: 'Baloo, cursive' }}
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
          style={{ fontFamily: 'Baloo, cursive' }}
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
