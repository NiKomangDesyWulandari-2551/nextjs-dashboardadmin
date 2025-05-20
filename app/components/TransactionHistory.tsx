// import { fetchTransactions } from '@/app/lib/prisma';

// interface Transaction {
//   id: number;
//   productId: number;
//   productName: string;
//   buyerName: string;
//   date: string;
//   totalPrice: string;
// }

// export default async function TransactionHistory() {
//   const transactions: Transaction[] = await fetchTransactions();

//   return (
//     <div className="mt-6 flow-root">
//       <div className="inline-block min-w-full align-middle">
//         <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
//           <table className="min-w-full text-gray-900">
//             <thead className="rounded-lg text-left text-sm font-normal">
//               <tr>
//                 <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
//                   ID Transaksi
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   ID Produk
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Nama Produk
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Nama Pembeli
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Tanggal
//                 </th>
//                 <th scope="col" className="px-3 py-5 font-medium">
//                   Total Harga
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white">
//               {transactions.length > 0 ? (
//                 transactions.map((transaction) => (
//                   <tr
//                     key={transaction.id}
//                     className="w-full border-b py-3 text-sm last-of-type:border-none"
//                   >
//                     <td className="whitespace-nowrap py-3 pl-6 pr-3">
//                       {transaction.id}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-3">
//                       {transaction.productId}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-3">
//                       {transaction.productName}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-3">
//                       {transaction.buyerName}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-3">
//                       {transaction.date}
//                     </td>
//                     <td className="whitespace-nowrap px-3 py-3">
//                       {transaction.totalPrice}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={6} className="py-3 text-center">
//                     Tidak ada transaksi ditemukan
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }