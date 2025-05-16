// 'use client';

// import { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import Head from 'next/head';
// import AddTransactionForm from '@/app/components/AddTransactionForm';
// import EditTransactionForm from '@/app/components/editTransaksi';
// import DeleteConfirmation from '@/app/components/DeletedConfirmation';
// import { deleteProduct } from '@/app/components/confirmDeleteProduct';

// interface Transaction {
//   transactionId: string;
//   product: string;
//   unitPrice: number;
//   customers: string;
//   date: string;
// }

// export default function Page() {
//   const [showForm, setShowForm] = useState(false);
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [editData, setEditData] = useState<Transaction | null>(null);
//   const [transactions, setTransactions] = useState<Transaction[]>([
//     { transactionId: 'TR0000001', customers: 'Phuwin', product: 'Bloody Vision', unitPrice: 60000, date: '2025-03-28' },
//     { transactionId: 'TR0000002', customers: 'Desy', product: 'Bloody Elixir', unitPrice: 60000, date: '2025-03-29' },
//     { transactionId: 'TR0000003', customers: 'Luna', product: "Witch's Fingers", unitPrice: 30000, date: '2025-03-30' },
//     { transactionId: 'TR0000004', customers: 'Audrey', product: "Ghoul's Delight Pasta", unitPrice: 30000, date: '2025-03-31' },
//     { transactionId: 'TR0000005', customers: 'Pond', product: "Ghoul's Delight Pasta", unitPrice: 50000, date: '2025-03-31' },
//   ]);
//   const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleEdit = (index: number) => {
//     setEditIndex(index);
//     setEditData(transactions[index]);
//   };

//   const handleSaveEdit = (updatedData: Transaction) => {
//     if (editIndex !== null) {
//       const updatedTransactions = [...transactions];
//       updatedTransactions[editIndex] = updatedData;
//       setTransactions(updatedTransactions);
//       setSuccessMessage('Transaction updated successfully!');
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//     setEditIndex(null);
//     setEditData(null);
//   };

//   const handleDeleteClick = (index: number) => {
//     setDeleteIndex(index);
//   };

//   const handleDeleteConfirm = () => {
//     if (deleteIndex !== null) {
//       setTransactions(transactions.filter((_, i) => i !== deleteIndex));
//       setDeleteIndex(null);
//       setSuccessMessage('Transaction deleted successfully!');
//       setTimeout(() => setSuccessMessage(null), 3000);
//     }
//   };

//   const handleAddTransaction = (newTransaction: Transaction) => {
//     setTransactions([...transactions, newTransaction]);
//     setShowForm(false);
//     setSuccessMessage('Transaction added successfully!');
//     setTimeout(() => setSuccessMessage(null), 3000);
//   };

//   const filteredTransactions = transactions.filter((tx) =>
//     tx.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tx.customers.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     tx.product.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="p-6 relative">
//       <Head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Lacquer&display=swap=Baloo&display=swap=Chilanka&display=swap"
//           rel="stylesheet"
//         />
//       </Head>

//       {/* Success Message */}
//       {successMessage && (
//         <div className="fixed top-[72px] left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 z-50">
//           {successMessage}
//         </div>
//       )}

//       {/* Show Forms or Transactions */}
//       {showForm ? (
//         <AddTransactionForm 
//         onCancel={() => setShowForm(false)} 
//         onSave={handleAddTransaction} />
//       ) : editData ? (
//         <EditTransactionForm
//           transaction={editData}
//           onCancel={() => {
//             setEditIndex(null);
//             setEditData(null);
//           }}
//           onSave={handleSaveEdit}
//         />
//       ) : (
//         <>
//           <div className="flex justify-between items-center mb-4 relative -top-10">
//             <button
//               className="bg-orange-500 text-white px-8 py-2 rounded-full"
//               style={{ fontFamily: 'Lacquer, cursive', fontSize: '23px' }}
//               onClick={() => setShowForm(true)}
//             >
//               + Add Transaction
//             </button>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search transactions..."
//                 className="pl-10 pr-4 py-2 rounded-full w-80 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-800"
//                 style={{ fontFamily: 'Chilanka, cursive' }}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>

//           <div className="overflow-x-auto bg-[#374253] bg-opacity-10 backdrop-blur-lg rounded-xl p-4 shadow-lg text-white">
//             <table className="min-w-full text-center">
//               <thead>
//                 <tr className="text-sm text-[#8FAFBC] uppercase border-b border-white">
//                   <th className="py-3" style={{ fontFamily: 'Baloo, cursive' }}>No.</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Transaction Id</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Customer</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Product</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Price</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Date</th>
//                   <th style={{ fontFamily: 'Baloo, cursive' }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTransactions.map((tx, index) => (
//                   <tr key={tx.transactionId} className="border-b border-white hover:bg-white hover:bg-opacity-10 transition duration-200">
//                     <td className="py-3 text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{index + 1}.</td>
//                     <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.transactionId}</td>
//                     <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.customers}</td>
//                     <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.product}</td>
//                     <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>Rp.{tx.unitPrice}</td>
//                     <td className="text-[#8FAFBC]" style={{ fontFamily: 'Chilanka, cursive' }}>{tx.date}</td>
//                     <td className="text-[#8FAFBC] space-x-2 py-2" style={{ fontFamily: 'Chilanka, cursive' }}>
//                       <button
//                         className="bg-green-500 hover:bg-green-600 px-3 py-1 rounded-full text-sm text-white"
//                         onClick={() => handleEdit(index)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full text-sm text-white"
//                         onClick={() => handleDeleteClick(index)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <DeleteConfirmation
//             isOpen={deleteIndex !== null}
//             onCancel={() => setDeleteIndex(null)}
//             onConfirm={handleDeleteConfirm}
//           />
//         </>
//       )}
//     </div>
//   );
// }

import { fetchTransactions } from "@/app/lib/prisma";

interface Transaction {
  id: number;
  productId: number;
  productName: string;
  buyerName: string;
  date: string;
  totalPrice: string;
}

export default async function TransactionHistory() {
  const transactions: Transaction[] = await fetchTransactions();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  ID Transaksi
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  ID Produk
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nama Produk
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Nama Pembeli
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tanggal
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Total Harga
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      {transaction.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.productId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.productName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.buyerName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.date}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.totalPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-3 text-center">
                    Tidak ada transaksi ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}