// import { motion } from "framer-motion";

// interface DeleteConfirmationProps {
//   isOpen: boolean;
//   onCancel: () => void;
//   onConfirm: () => void;
// }

// export default function DeleteConfirmation({ isOpen, onCancel, onConfirm }: DeleteConfirmationProps) {
//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>

//       {/* Modal */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.2 }}
//         className="fixed top-[70px] inset-x-0 mx-auto bg-gray-800 px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center space-y-3 z-50 max-w-[280px] w-auto pointer-events-auto"
//       >
//         <p className="text-white text-sm font-semibold">Really want to delete?</p>
//         <div className="flex space-x-10">
//           <button
//             onClick={onCancel}
//             className="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-600"
//           >
//             No
//           </button>
//           <button
//             onClick={onConfirm}
//             className="bg-green-500 text-white px-5 py-1 rounded-full text-sm hover:bg-green-600"
//           >
//             Yes
//           </button>
//         </div>
//       </motion.div>
//     </>
//   );
// }

// app/ui/DeleteConfirmation.tsx
import { motion } from "framer-motion";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmation({ isOpen, onCancel, onConfirm }: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-40 pointer-events-none"></div>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="fixed top-[70px] inset-x-0 mx-auto bg-gray-800 px-6 py-3 rounded-2xl shadow-lg flex flex-col items-center space-y-3 z-50 max-w-[280px] w-auto pointer-events-auto"
      >
        <p className="text-white text-sm font-semibold">Really want to delete?</p>
        <div className="flex space-x-10">
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-5 py-1 rounded-full text-sm hover:bg-red-600"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white px-5 py-1 rounded-full text-sm hover:bg-green-600"
          >
            Yes
          </button>
        </div>
      </motion.div>
    </>
  );
}