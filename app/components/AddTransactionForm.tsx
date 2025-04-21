'use client';

import { useState } from 'react';
import Head from "next/head";

interface AddTransactionFormProps {
  onCancel: () => void;
  onSave: (newTransaction: {
    transactionId: string;
    product: string;
    unitPrice: number;
    purchaseAmount: number;
    totalPrice: number;
    customers: string;
    date: string;
  }) => void;
}

export default function AddTransactionForm({ onCancel, onSave }: AddTransactionFormProps) {
  const [transactionId, setTransactionId] = useState('');
  const [product, setProduct] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [customers, setCustomers] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !transactionId.trim() ||
      !product.trim() ||
      !unitPrice.trim() ||
      !purchaseAmount.trim() ||
      !totalPrice.trim() ||
      !customers.trim() ||
      !date.trim()
    ) {
      setErrorMessage("Please fill all fields!");
      return;
    }

    if (Number(unitPrice) <= 0 || Number(purchaseAmount) <= 0 || Number(totalPrice) <= 0) {
      setErrorMessage("Values must be greater than 0.");
      return;
    }

    onSave({
      transactionId,
      product,
      unitPrice: Number(unitPrice),
      purchaseAmount: Number(purchaseAmount),
      totalPrice: Number(totalPrice),
      customers,
      date,
    });

    // Reset form
    setTransactionId("");
    setProduct("");
    setUnitPrice("");
    setPurchaseAmount("");
    setTotalPrice("");
    setCustomers("");
    setDate("");
    setErrorMessage(null);
    onCancel();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-0 fixed inset-0">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap"
          rel="stylesheet"
        />
      </Head>
      <form
        className="relative bg-gray-800 bg-opacity-80 p-8 rounded-3xl shadow-lg w-full max-w-2xl text-white flex flex-col items-center "
        onSubmit={handleSubmit}
      >
        <h2 className="text-[55px] font-bold text-center mb-6" style={{ fontFamily: 'Lacquer', color: '#13B5EE' }}>
          TRANSACTION DETAILS
        </h2>

        {errorMessage && (
          <p className="text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        {[ // Menyesuaikan ukuran field seperti AddProductForm
          { label: 'Transaction ID', value: transactionId, setValue: setTransactionId, placeholder: 'TR00000001' },
          { label: 'Product', value: product, setValue: setProduct, placeholder: 'Enter product name' },
          { label: 'Unit Price', value: unitPrice, setValue: setUnitPrice, placeholder: 'Rp 00.00' },
          { label: 'Purchase Amount', value: purchaseAmount, setValue: setPurchaseAmount, placeholder: 'Enter quantity' },
          { label: 'Total Price', value: totalPrice, setValue: setTotalPrice, placeholder: 'Rp 00.00' },
          { label: 'Customers', value: customers, setValue: setCustomers, placeholder: 'Enter customer name' },
          { label: 'Date', value: date, setValue: setDate, placeholder: 'yyyy/mm/dd' },
        ].map(({ label, value, setValue, placeholder }) => (
          <div key={label} className="w-full" style={{ fontFamily: 'Chilanka', color: '#8FAFBC', fontSize: '15px' }}>
            <label className="block text-sm mb-1">{label}:</label>
            <input
              type="text"
              className="w-full p-3 rounded-full bg-gray-900 text-white"
              placeholder={placeholder}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        ))}

        <div className="flex justify-center gap-10 mt-6">
          <button
            type="button"
            className="bg-gray-500 px-6 py-2 rounded-lg text-white hover:bg-gray-600"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 px-6 py-2 rounded-lg text-white hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}