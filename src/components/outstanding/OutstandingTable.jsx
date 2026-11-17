
import React, { useState } from "react";
import RecordPaymentModal from "../invoice/RecordPaymentModal";
import { FaMoneyBillWave } from "react-icons/fa";
import { BASE_URL } from "../../services/api";

const badge = {
  Overdue: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
  Unpaid: "bg-orange-100 text-orange-600",
};

function OutstandingTable({
  invoices = [],
  loading = false,
  onPaymentSuccess,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <>
      <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-[#00000026] overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 border-b border-[#00000026]">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
            Outstanding Payment Details
          </h2>

          <button
            onClick={() =>
              window.open(
                `${BASE_URL}/accounts/outstanding/pdf/`,
                "_blank"
              )
            }
            className="w-full sm:w-auto shrink-0 bg-red-100 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors cursor-pointer"
          >
            PDF
          </button>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="w-full min-w-0">
          <table className="block w-full text-sm lg:table lg:table-auto">

            {/* DESKTOP HEADER */}
            <thead className="hidden lg:table-header-group bg-gray-50 text-gray-500">
              <tr>
                <th className="p-5 text-left font-bold uppercase tracking-wider text-xs">
                  Invoice No
                </th>
                <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">
                  Customer
                </th>
                <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">
                  Outstanding
                </th>
                <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">
                  Due Date
                </th>
                <th className="p-4 text-left font-bold uppercase tracking-wider text-xs">
                  Status
                </th>
                <th className="p-5 text-center font-bold uppercase tracking-wider text-xs">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="block lg:table-row-group">
              {loading ? (
                <tr className="block lg:table-row">
                  <td
                    colSpan="6"
                    className="block lg:table-cell p-5 text-center text-gray-500"
                  >
                    Loading outstanding invoices...
                  </td>
                </tr>
              ) : invoices.length === 0 ? (
                <tr className="block lg:table-row">
                  <td
                    colSpan="6"
                    className="block lg:table-cell p-5 text-center text-gray-500"
                  >
                    No outstanding invoices.
                  </td>
                </tr>
              ) : (
                invoices.map((row, index) => (
                  <tr
                    key={index}
                    className="
                      grid grid-cols-2 sm:grid-cols-3
                      gap-x-4 gap-y-4
                      p-4 sm:p-5
                      mx-3 my-3
                      border border-gray-200 rounded-xl
                      bg-white shadow-sm
                      hover:bg-gray-50 transition-colors

                      lg:table-row
                      lg:mx-0 lg:my-0 lg:p-0
                      lg:border-0 lg:border-t lg:border-[#00000026]
                      lg:rounded-none lg:shadow-none
                    "
                  >

                    {/* INVOICE NUMBER */}
                    <td className="col-span-2 sm:col-span-3 min-w-0 lg:table-cell lg:p-5 font-bold text-[#4B5EAA]">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Invoice No
                      </span>

                      <span className="block break-words">
                        {row.id}
                      </span>
                    </td>

                    {/* CUSTOMER */}
                    <td className="col-span-2 sm:col-span-1 min-w-0 lg:table-cell lg:p-4 font-semibold text-gray-900">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Customer
                      </span>

                      <span className="block break-words">
                        {row.customer}
                      </span>
                    </td>

                    {/* OUTSTANDING */}
                    <td className="min-w-0 lg:table-cell lg:p-4 font-black text-red-600">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Outstanding
                      </span>

                      <span className="block break-words">
                        ₹
                        {row.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </td>

                    {/* DUE DATE */}
                    <td className="min-w-0 lg:table-cell lg:p-4 font-medium text-gray-600">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Due Date
                      </span>

                      <span className="block break-words">
                        {row.due_date}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="min-w-0 lg:table-cell lg:p-4">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                        Status
                      </span>

                      <span
                        className={`inline-flex items-center max-w-full px-3 py-1 rounded-full text-xs font-bold ${
                          badge[row.status] || badge.Unpaid
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>

                    {/* PAY ACTION */}
                    <td className="col-span-2 sm:col-span-3 min-w-0 pt-3 border-t border-gray-100 lg:table-cell lg:p-5 lg:border-0 lg:text-center">
                      <div className="flex items-center justify-between lg:justify-center gap-3">
                        <span className="text-[11px] font-semibold uppercase text-gray-400 lg:hidden">
                          Action
                        </span>

                        <button
                          onClick={() => {
                            setSelectedInvoice(row);
                            setOpenModal(true);
                          }}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-green-700 text-sm font-bold transition-colors shadow-sm"
                        >
                          <FaMoneyBillWave />
                          Pay
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXISTING RECORD PAYMENT MODAL */}
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
