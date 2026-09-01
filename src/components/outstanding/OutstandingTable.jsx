import React, { useState } from "react";
import RecordPaymentModal from "../invoice/RecordPaymentModal";
import { FaMoneyBillWave } from "react-icons/fa";

const badge = {
  Overdue: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
  Unpaid: "bg-orange-100 text-orange-600",
};

function OutstandingTable({ invoices = [], loading = false, onPaymentSuccess }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#00000026] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#00000026]">
          <h2 className="text-xl font-semibold">Outstanding Payment Details</h2>
          <button 
            onClick={() => window.open('http://localhost:8000/api/accounts/outstanding/pdf/', '_blank')}
            className="bg-red-100 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors cursor-pointer"
          >
            PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">Invoice No</th>
                <th className="text-left font-bold uppercase tracking-wider text-xs">Customer</th>
                <th className="text-left font-bold uppercase tracking-wider text-xs">Outstanding</th>
                <th className="text-left font-bold uppercase tracking-wider text-xs">Due Date</th>
                <th className="text-left font-bold uppercase tracking-wider text-xs">Status</th>
                <th className="text-center font-bold uppercase tracking-wider text-xs p-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center text-gray-500">Loading outstanding invoices...</td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-5 text-center text-gray-500">No outstanding invoices.</td>
                </tr>
              ) : (
                invoices.map((row, index) => (
                  <tr key={index} className="border-t border-[#00000026] hover:bg-gray-50">
                    <td className="p-5 font-bold text-[#4B5EAA]">{row.id}</td>
                    <td className="font-semibold text-gray-900">{row.customer}</td>
                    <td className="font-black text-red-600">₹{row.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="text-gray-600 font-medium">{row.due_date}</td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge[row.status] || badge.Unpaid}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="p-5 text-center">
                      <button
                        onClick={() => {
                          setSelectedInvoice(row);
                          setOpenModal(true);
                        }}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-green-700 mx-auto text-sm font-bold transition-colors shadow-sm"
                      >
                        <FaMoneyBillWave />
                        Pay
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RecordPaymentModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        invoice={selectedInvoice}
        onSuccess={onPaymentSuccess}
      />
    </>
  );
}

export default OutstandingTable;
