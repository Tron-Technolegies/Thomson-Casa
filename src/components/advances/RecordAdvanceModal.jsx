import { IoClose } from "react-icons/io5";

function RecordAdvanceModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl">
        {/* Header */}

        <div className="flex justify-between items-center border-b border-[#00000026] px-6 py-4">
          <h2 className="text-xl font-bold">Record Advance</h2>

          <button onClick={onClose} className="cursor-pointer">
            <IoClose size={26} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-5">
            <div>
              <label className="text-sm text-gray-500">Customer</label>

              <select className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3">
                <option>Apex Industries</option>
                <option>Pinnacle Traders</option>
                <option>Nexus Solutions</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Amount (₹)</label>

              <input
                placeholder="0.00"
                className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Payment Method</label>

              <select className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3">
                <option>Cash</option>
                <option>UPI</option>
                <option>Cheque</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="text-sm text-gray-500">Reference No.</label>

              <input
                placeholder="e.g. NEFT-20260709-001"
                className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Note</label>

              <input
                placeholder="Optional note"
                className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white cursor-pointer px-8 py-3 rounded-lg font-medium">
              Record Advance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecordAdvanceModal;
