import React from 'react';

type AddTransactionFormProps = {
  onCancel: () => void;
};

function AddTransactionForm({ onCancel }: AddTransactionFormProps) {
  return (
    <div className="p-8 bg-[#374253] bg-opacity-50 backdrop-blur-lg rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyan-400">DETAILS</h1>

      <div className="space-y-6">
        {/* Form Group */}
        {[
          { label: 'Transaction Id', placeholder: 'TR0000001' },
          { label: 'Product', placeholder: '' },
          { label: 'Unit Price', placeholder: 'Rp 00.00' },
          { label: 'Purchase Amount', placeholder: 'add purchase amount here...' },
          { label: 'Total Price', placeholder: 'Rp 00.00' },
          { label: 'Customers', placeholder: 'add customer name here...' },
          { label: 'Date', placeholder: 'yyyy/mm/dd' },
        ].map((field, i) => (
          <div className="flex items-center gap-6" key={i}>
            <label className="w-48 text-[#8FAFBC] font-semibold text-lg">{field.label}</label>
            <span className="text-[#8FAFBC] text-lg">:</span>
            <input
              placeholder={field.placeholder}
              className="flex-1 px-4 py-2 rounded-md bg-[#1a1e26] text-white focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={onCancel}
          className="bg-[#BA1B1D] hover:bg-red-700 text-white px-6 py-2 rounded-md font-semibold"
        >
          Cancel
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold">
          Save
        </button>
      </div>
    </div>
  );
}

export default AddTransactionForm;
