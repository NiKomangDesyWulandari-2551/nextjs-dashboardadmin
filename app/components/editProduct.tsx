'use client';

import { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import Head from "next/head";

interface Product {
  name: string;
  price: number;
  image: string;
}

interface EditProductFormProps {
  product: Product;
  onCancel: () => void;
  onSave: (updatedProduct: Product) => void;
}

export default function EditProductForm({ product, onCancel, onSave }: EditProductFormProps) {
  const [name, setName] = useState<string>(product.name);
  const [price, setPrice] = useState<string>(product.price.toString());
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(product.image);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validExtensions.includes(file.type)) {
      setErrorMessage('Only JPG, JPEG, and PNG files are allowed.');
      return;
    }

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price.trim() || !previewImage) {
      setErrorMessage("Please fill all fields!");
      return;
    }

    if (Number(price) <= 0) {
      setErrorMessage("Price must be greater than 0.");
      return;
    }

    onSave({ name, price: Number(price), image: previewImage });

    // Optional: reset state after save
    setErrorMessage(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-0 fixed inset-0">
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>

      <form
        className="relative bg-gray-800 bg-opacity-80 p-8 rounded-3xl shadow-lg w-full max-w-2xl text-white flex gap-6 items-center"
        onSubmit={handleSubmit}
      >
        {/* Upload Image */}
        <div className="w-1/3 flex flex-col items-center justify-center h-full">
          <label className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer">
            {previewImage ? (
              <img src={previewImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
            ) : (
              <div className="flex flex-col items-center" style={{ color: '#111A27', fontFamily: 'Chilanka', fontSize: '20px' }}>
                <FaCloudUploadAlt className="text-3xl mb-2" />
                <span>Upload Image</span>
              </div>
            )}
            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>

        {/* Form Inputs */}
        <div className="w-2/3 flex flex-col justify-center">
          <h2 className="text-[55px] font-bold mb-6 text-center" style={{ fontFamily: 'Lacquer', color: '#13B5EE' }}>
            DETAILS
          </h2>

          {errorMessage && (
            <p className="text-red-400 text-center mb-4">{errorMessage}</p>
          )}

          <div className="mb-4" style={{ fontFamily: 'Chilanka', fontSize: '15px', color: '#8FAFBC' }}>
            <label className="block text-sm mb-1">Name:</label>
            <input
              type="text"
              placeholder="Edit product name..."
              className="w-full p-3 rounded-full bg-gray-900 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-6" style={{ fontFamily: 'Chilanka', fontSize: '15px', color: '#8FAFBC' }}>
            <label className="block text-sm mb-1">Price:</label>
            <input
              type="number"
              placeholder="Edit product price..."
              className="w-full p-3 rounded-full bg-gray-900 text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex justify-center gap-10">
            <button type="button" className="bg-gray-500 px-6 py-2 rounded-lg text-white hover:bg-gray-600" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="bg-green-500 px-6 py-2 rounded-lg text-white hover:bg-green-600">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
