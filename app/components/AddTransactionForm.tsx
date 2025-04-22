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

const productOptions = [
  { name: "Pumpkin Latte", price: 25000 },
  { name: "Spooky Burger", price: 40000 },
  { name: "Ghost Fries", price: 15000 },
];

export default function AddTransactionForm({ onCancel, onSave }: AddTransactionFormProps) {
  const [transactionId, setTransactionId] = useState('');
  const [product, setProduct] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [customers, setCustomers] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleProductChange = (value: string) => {
    setProduct(value);
    const selected = productOptions.find(p => p.name === value);
    if (selected) {
      setUnitPrice(selected.price.toString());
      // Hitung ulang total jika quantity sudah diisi
      if (purchaseAmount) {
        const total = selected.price * Number(purchaseAmount);
        setTotalPrice(total.toString());
      }
    }
  };

  const handleAmountChange = (value: string) => {
    setPurchaseAmount(value);
    if (unitPrice) {
      const total = Number(unitPrice) * Number(value);
      setTotalPrice(total.toString());
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId || !product || !unitPrice || !purchaseAmount || !totalPrice || !customers || !date) {
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

    // Reset
    setTransactionId('');
    setProduct('');
    setUnitPrice('');
    setPurchaseAmount('');
    setTotalPrice('');
    setCustomers('');
    setDate('');
    setErrorMessage(null);
    onCancel();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-30 fixed inset-0">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet" />
      </Head>
      <form
        className="relative bg-gray-800 bg-opacity-80 px-6 py-16 rounded-3xl shadow-lg w-full max-w-3xl min-h-[400px] text-white"
        onSubmit={handleSubmit}
      >
        <h2
          className="text-[45px] font-bold text-center mb-8"
          style={{ fontFamily: 'Lacquer', color: '#13B5EE' }}
        >
          <br /> <span style={{ fontSize: 28 }}>DETAILS</span>
        </h2>

        {errorMessage && (
          <p className="text-red-400 text-center mb-4">{errorMessage}</p>
        )}

        <div className="space-y-4 text-[15px]" style={{ fontFamily: 'Chilanka' }}>
          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Transaction Id :</label>
            <input
              type="text"
              placeholder="TR00000001"
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Product :</label>
            <select
              value={product}
              onChange={(e) => handleProductChange(e.target.value)}
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
            >
              <option value="">Select a product</option>
              {productOptions.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Unit Price :</label>
            <input
              type="text"
              placeholder="Rp 00.00"
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              readOnly
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Purchase Amount :</label>
            <input
              type="number"
              placeholder="Amount..."
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={purchaseAmount}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Total Price :</label>
            <input
              type="text"
              placeholder="Rp 00.00"
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              readOnly
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Customers :</label>
            <input
              type="text"
              placeholder="Customer name..."
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="w-[150px] text-right text-[#B7D2E2]">Date :</label>
            <input
              type="date"
              className="flex-1 p-2 rounded-full bg-gray-900 text-white"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center gap-8 mt-8">
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
