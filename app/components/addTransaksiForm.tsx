'use client';

import { useState } from 'react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !transactionId ||
      !product ||
      !unitPrice ||
      !purchaseAmount ||
      !totalPrice ||
      !customers ||
      !date
    )
      return;
    onSave({
      transactionId,
      product,
      unitPrice: Number(unitPrice),
      purchaseAmount: Number(purchaseAmount),
      totalPrice: Number(totalPrice),
      customers,
      date,
    });
    onCancel(); // Close the form after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-dark-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-halloween-pattern opacity-70 rounded-lg pointer-events-none"
          style={{
            backgroundImage: 'url("/images/halloween-bg.png")',
            backgroundSize: 'cover',
            backgroundRepeat: 'repeat',
          }}
        />
        <h2
          className="text-xl font-bold text-white mb-6 relative z-10 text-center"
          style={{ fontFamily: 'Creepster', fontSize: '2rem' }}
        >
          TRANSACTION <span className="text-lime-400">DETAILS</span>
        </h2>
        <form onSubmit={handleSubmit} className="relative z-10">
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="transactionId" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Transaction Id :
            </label>
            <input
              type="text"
              id="transactionId"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="product" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Product :
            </label>
            <input
              type="text"
              id="product"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="unitPrice" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Unit Price :
            </label>
            <input
              type="number"
              id="unitPrice"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="purchaseAmount" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Purchase Amount :
            </label>
            <input
              type="number"
              id="purchaseAmount"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="totalPrice" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Total Price :
            </label>
            <input
              type="number"
              id="totalPrice"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center gap-4">
            <label htmlFor="customers" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Customers :
            </label>
            <input
              type="text"
              id="customers"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
            />
          </div>
          <div className="mb-6 flex items-center gap-4">
            <label htmlFor="date" className="block text-gray-300 text-sm font-bold w-1/3 text-right">
              Date :
            </label>
            <input
              type="date"
              id="date"
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-dark-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 focus:outline-none focus:shadow-outline"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}