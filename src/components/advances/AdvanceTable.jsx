import { useState } from "react";
import { FaPlus, FaFilePdf } from "react-icons/fa";
import RecordAdvanceModal from "./RecordAdvanceModal";
import { BASE_URL } from "../../services/api";

function AdvanceTable({ advances = [], loading = false, onSuccess }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#00000026] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-[#00000026]">
          <h2 className="font-semibold text-lg text-gray-800">Records</h2>
          <div className="flex gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg flex cursor-pointer items-center gap-2 font-medium transition"
            >
              <FaPlus size={12} />
              Record Advance
            </button>
            <button 
              onClick={() => window.open(`${BASE_URL}/accounts/advances/pdf/`, '_blank')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition cursor-pointer"
            >
              <FaFilePdf size={12} />
              PDF
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="p-4 font-semibold uppercase tracking-wider text-xs">ID</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Customer</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Amount</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Payment Method</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Reference</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Date</th>
                <th className="font-semibold uppercase tracking-wider text-xs">Note</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="7" className="text-center py-6 text-gray-500">Loading advances...</td></tr>
              ) : advances.length === 0 ? (
                <tr><td colSpan="7" className="text-center py-6 text-gray-500">No advances recorded.</td></tr>
              ) : (
                advances.map((row) => (
                  <tr key={row.id} className="border-t border-[#00000026] hover:bg-gray-50 transition">
                    <td className="p-4 font-bold text-blue-600">{row.id}</td>
                    <td className="font-semibold text-gray-800">{row.customer}</td>
                    <td className="font-bold text-green-600">₹{row.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="text-gray-600 font-medium">{row.payment_method}</td>
                    <td className="text-gray-500 text-sm">{row.reference_no || "-"}</td>
                    <td className="text-gray-600 text-sm">{row.date}</td>
                    <td className="text-gray-500 text-sm">{row.note || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RecordAdvanceModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
        onSuccess={onSuccess} 
      />
    </>
  );
}

export default AdvanceTable;
