'use client';

import React, { useState, useEffect } from 'react';
import Head from 'next/head';

interface EditTransactionFormProps {
  transaction: {
    transactionId: string;
    product: string;
    unitPrice: number;
    customers: string;
    date: string;
  };
  onCancel: () => void;
  onSave: (updatedData: {
    transactionId: string;
    product: string;
    unitPrice: number;
    customers: string;
    date: string;
  }) => void;
}

const productOptions = [
  { name: 'Pumpkin Latte', price: 25000 },
  { name: 'Spooky Burger', price: 40000 },
  { name: 'Ghost Fries', price: 15000 },
];

export default function EditTransactionForm({
  transaction,
  onCancel,
  onSave,
}: EditTransactionFormProps) {
  const [transactionId, setTransactionId] = useState(transaction.transactionId);
  const [product, setProduct] = useState(transaction.product);
  const [unitPrice, setUnitPrice] = useState(transaction.unitPrice);
  const [customers, setCustomers] = useState(transaction.customers);
  const [date, setDate] = useState(transaction.date);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTransactionId(transaction.transactionId);
    setProduct(transaction.product);
    setUnitPrice(transaction.unitPrice);
    setCustomers(transaction.customers);
    setDate(transaction.date);
  }, [transaction]);

  const handleProductChange = (value: string) => {
    setProduct(value);
    const selected = productOptions.find((p) => p.name === value);
    if (selected) {
      setUnitPrice(selected.price);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product || !unitPrice || !customers || !date) {
      setErrorMessage('Please fill all fields!');
      return;
    }

    onSave({
      transactionId,
      product,
      unitPrice,
      customers,
      date,
    });

    setErrorMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-6 md:p-10">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet" />
      </Head>

      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-md bg-gray-900 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl text-white overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <h3 className="text-[40px] text-center mb-6" style={{ fontFamily: 'Lacquer', color: '#13B5EE' }}>
          EDIT DETAILS
        </h3>

        {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-[15px]" style={{ fontFamily: 'Chilanka' }}>
          <div className="flex items-center gap-2">
            <label className="w-[140px] text-right text-[#B7D2E2]">Transaction Id:</label>
            <input
              type="text"
              className="flex-1 p-2 rounded-full bg-gray-800 text-white"
              value={transactionId}
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-[140px] text-right text-[#B7D2E2]">Product:</label>
            <select
              value={product}
              onChange={(e) => handleProductChange(e.target.value)}
              className="flex-1 p-2 rounded-full bg-gray-800 text-white"
            >
              {productOptions.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="w-[140px] text-right text-[#B7D2E2]">Unit Price:</label>
            <input
              type="text"
              className="flex-1 p-2 rounded-full bg-gray-800 text-white"
              value={unitPrice}
              readOnly
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-[140px] text-right text-[#B7D2E2]">Customers:</label>
            <input
              type="text"
              className="flex-1 p-2 rounded-full bg-gray-800 text-white"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-[140px] text-right text-[#B7D2E2]">Date:</label>
            <input
              type="date"
              className="flex-1 p-2 rounded-full bg-gray-800 text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-8">
          <button
            type="button"
            className="bg-gray-500 px-6 py-2 rounded-lg text-white hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="bg-green-500 px-6 py-2 rounded-lg text-white hover:bg-green-600">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
