'use client';

import React, { useState } from 'react';
// import ProductCard from '@/app/components/ProductCard';
import { FaSearch } from "react-icons/fa";
// import AddProductForm from '@/app/components/addProduct';
import DeleteConfirmation from '@/app/components/DeletedConfirmation';
// import { deleteProduct } from '@/app/components/confirmDeleteProduct';
// import EditProductForm from '@/app/components/editProduct';
import Head from "next/head";

export default function DrinksPage() {
  // const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  // const [editData, setEditData] = useState<{ name: string, price: number, image: string } | null>(null);
  const [drinks, setDrinks] = useState([
    { image: '/Bloody Elixir.jpg', name: 'Bloody Elixir', price: 45000 },
    { image: '/Bloody Vision.jpg', name: 'Bloody Vision', price: 60000 },
  ]);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // const handleEdit = (index: number) => {
  //   setEditIndex(index);
  //   setEditData(drinks[index]);
  // };

  // const handleSaveEdit = (updatedData: { name: string; price: number; image: string }) => {
  //   if (editIndex !== null) {
  //     const updatedDrinks = [...drinks];
  //     updatedDrinks[editIndex] = updatedData;
  //     setDrinks(updatedDrinks);
  //     setSuccessMessage('The product has been changed successfully!!!');
  //     setTimeout(() => setSuccessMessage(null), 3000);
  //   }
  //   setEditIndex(null);
  //   setEditData(null);
  // };

  // const handleDeleteClick = (index: number) => {
  //   setDeleteIndex(index);
  // };

  const handleDeleteConfirm = () => {
    if (deleteIndex !== null) {
      setDrinks(drinks.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    }
  };

  // const handleAddProduct = (newProduct: { name: string; price: number; image: string }) => {
  //   setDrinks([...drinks, newProduct]);
  //   setShowForm(false);
  //   setSuccessMessage('Product successfully added!');
  //   setTimeout(() => setSuccessMessage(null), 3000);
  // };

  const filteredDrinks = drinks.filter(drink =>
    drink.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 relative">
      {/* Import Google Font */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap=Chilanka&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Notifikasi sukses */}
      {successMessage && (
        <div className="fixed top-[72px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 z-50">
          {successMessage}
        </div>
      )}

      {/* {showForm ? (
        <AddProductForm onCancel={() => setShowForm(false)} onAddProduct={handleAddProduct} />
      ) : editData ? (
        <EditProductForm
          product={editData}
          onCancel={() => {
            setEditIndex(null);
            setEditData(null);
          }}
          onSave={handleSaveEdit}
        />
      ) : ( */}
        <>
          <div className="flex justify-between items-center mb-4 relative -top-10">
            <button
              className="bg-orange-500 text-white px-8 py-2 rounded-full"
              style={{ fontFamily: 'Lacquer, cursive', fontSize: '23px' }}
              // onClick={() => setShowForm(true)}
            >
              + Add Product
            </button>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 rounded-full w-80 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
                style={{ fontFamily: 'Chilanka, cursive' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
             {filteredDrinks.length > 0 ? (
              filteredDrinks.map((drink, index) => (
                <ProductCard
                  key={index}
                  image={drink.image}
                  name={drink.name}
                  price={drink.price}
                  onEdit={() => handleEdit(index)}
                  onDelete={() => handleDeleteClick(index)}
                />
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )} 
          </div> */}

          <DeleteConfirmation
            isOpen={deleteIndex !== null}
            onCancel={() => setDeleteIndex(null)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      {/* )} */}
    </div>
  );
}

