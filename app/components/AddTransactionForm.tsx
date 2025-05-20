// 'use client';

// import { useState, useEffect } from 'react';
// import Head from 'next/head';

// interface AddTransactionFormProps {
//   onCancel: () => void;
//   onSave: (newTransaction: {
//     transactionId: string;
//     product: string;
//     unitPrice: number;
//     purchaseAmount: number;
//     totalPrice: number;
//     customers: string;
//     date: string;
//   }) => void;
//   initialData?: {
//     transactionId: string;
//     product: string;
//     unitPrice: number;
//     purchaseAmount: number;
//     totalPrice: number;
//     customers: string;
//     date: string;
//   };
// }

// const productOptions = [
//   { name: 'Pumpkin Latte', price: 25000 },
//   { name: 'Spooky Burger', price: 40000 },
//   { name: 'Ghost Fries', price: 15000 },
// ];

// const existingTransactions = [
//   { transactionId: 'TR00000001' },
//   { transactionId: 'TR00000002' },
//   { transactionId: 'TR00000003' },
//   { transactionId: 'TR00000004' },
//   { transactionId: 'TR00000005' },
// ];

// const generateTransactionId = () => {
//   const lastTransaction = existingTransactions[existingTransactions.length - 1];
//   const lastNumber = parseInt(lastTransaction.transactionId.substring(2));
//   const nextTransactionId = lastNumber + 1;
//   return `TR${String(nextTransactionId).padStart(8, '0')}`;
// };

// export default function AddTransactionForm({ onCancel, onSave, initialData }: AddTransactionFormProps) {
//   const [transactionId, setTransactionId] = useState('');
//   const [product, setProduct] = useState('');
//   const [unitPrice, setUnitPrice] = useState('');
//   const [purchaseAmount, setPurchaseAmount] = useState('');
//   const [totalPrice, setTotalPrice] = useState('');
//   const [customers, setCustomers] = useState('');
//   const [date, setDate] = useState('');
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   useEffect(() => {
//     if (initialData) {
//       setTransactionId(initialData.transactionId);
//       setProduct(initialData.product);
//       setUnitPrice(initialData.unitPrice.toString());
//       setPurchaseAmount(initialData.purchaseAmount.toString());
//       setTotalPrice(initialData.totalPrice.toString());
//       setCustomers(initialData.customers);
//       setDate(initialData.date);
//     } else {
//       setTransactionId(generateTransactionId());
//     }
//   }, [initialData]);

//   const handleProductChange = (value: string) => {
//     setProduct(value);
//     const selected = productOptions.find((p) => p.name === value);
//     if (selected) {
//       setUnitPrice(selected.price.toString());
//       if (purchaseAmount) {
//         const total = selected.price * Number(purchaseAmount);
//         setTotalPrice(total.toString());
//       }
//     }
//   };

//   const handleAmountChange = (value: string) => {
//     setPurchaseAmount(value);
//     if (unitPrice) {
//       const total = Number(unitPrice) * Number(value);
//       setTotalPrice(total.toString());
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!transactionId || !product || !unitPrice || !purchaseAmount || !totalPrice || !customers || !date) {
//       setErrorMessage('Please fill all fields!');
//       return;
//     }

//     if (Number(unitPrice) <= 0 || Number(purchaseAmount) <= 0 || Number(totalPrice) <= 0) {
//       setErrorMessage('Values must be greater than 0.');
//       return;
//     }

//     onSave({
//       transactionId,
//       product,
//       unitPrice: Number(unitPrice),
//       purchaseAmount: Number(purchaseAmount),
//       totalPrice: Number(totalPrice),
//       customers,
//       date,
//     });

//     if (!initialData) {
//       // Reset hanya jika tambah baru
//       setTransactionId(generateTransactionId());
//       setProduct('');
//       setUnitPrice('');
//       setPurchaseAmount('');
//       setTotalPrice('');
//       setCustomers('');
//       setDate('');
//     }

//     setErrorMessage(null);
//     onCancel();
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-6 md:p-10">
//       <Head>
//         <link href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet" />
//       </Head>

//       <form
//         onSubmit={handleSubmit}
//         className="backdrop-blur-md bg-gray-900 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl text-white overflow-y-auto"
//         style={{ maxHeight: '90vh' }}
//       >
//         <h3 className="text-[40px] text-center mb-6" style={{ fontFamily: 'Lacquer', color: '#13B5EE' }}>
//           DETAILS
//         </h3>

//         {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 text-[15px]" style={{ fontFamily: 'Chilanka' }}>
//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Transaction Id:</label>
//             <input
//               type="text"
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={transactionId}
//               readOnly
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Product:</label>
//             <select
//               value={product}
//               onChange={(e) => handleProductChange(e.target.value)}
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               style={{ color: product === '' ? '#B7D2E2' : 'inherit' }}
//             >
//               <option value="">Select a product</option>
//               {productOptions.map((p) => (
//                 <option key={p.name} value={p.name}>
//                   {p.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Unit Price:</label>
//             <input
//               type="text"
//               placeholder='Rp 00.00'
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={unitPrice}
//               readOnly
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Purchase Amount:</label>
//             <input
//               type="number"
//               placeholder='Amount...'
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={purchaseAmount}
//               onChange={(e) => handleAmountChange(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Total Price:</label>
//             <input
//               type="text"
//               placeholder='Rp 00.00'
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={totalPrice}
//               readOnly
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Customers:</label>
//             <input
//               type="text"
//               placeholder='Customer name...'
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={customers}
//               onChange={(e) => setCustomers(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-2">
//             <label className="w-[140px] text-right text-[#B7D2E2]">Date:</label>
//             <input
//               type="date"
//               className="flex-1 p-2 rounded-full bg-gray-800 text-white"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex justify-center gap-6 mt-8">
//           <button
//             type="button"
//             className="bg-gray-500 px-6 py-2 rounded-lg text-white hover:bg-gray-600"
//             onClick={onCancel}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="bg-green-500 px-6 py-2 rounded-lg text-white hover:bg-green-600">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
