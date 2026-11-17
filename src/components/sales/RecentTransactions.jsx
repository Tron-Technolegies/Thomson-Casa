
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { BASE_URL } from "../../services/api";

const badge = {
  Paid: "bg-green-100 text-green-700",
  Partial: "bg-yellow-100 text-yellow-700",
  Unpaid: "bg-red-100 text-red-700",
};

function RecentTransactions({ sales = [], loading = false }) {
  return (
    <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-gray-200 overflow-hidden">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 border-b border-[#00000026]">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 break-words">
          Recent Transactions
        </h2>

        <button
          onClick={() =>
            window.open(
              `${BASE_URL}/accounts/reports/sales/pdf/`,
              "_blank"
            )
          }
          className="w-full sm:w-auto shrink-0 flex items-center justify-center bg-red-100 text-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition cursor-pointer"
        >
          <FaFilePdf className="inline mr-2" />
          PDF
        </button>
      </div>

      {/* SAME TABLE - RESPONSIVE */}
      <div className="w-full min-w-0">

        <table className="block w-full text-sm lg:table lg:table-auto">

          {/* Desktop table heading */}
          <thead className="hidden lg:table-header-group bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4 text-left font-semibold">
                Invoice No
              </th>
              <th className="p-4 text-left font-semibold">
                Customer
              </th>
              <th className="p-4 text-left font-semibold">
                Date
              </th>
              <th className="p-4 text-left font-semibold">
                Amount
              </th>
              <th className="p-4 text-left font-semibold">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="block lg:table-row-group">
            {loading ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="5"
                  className="block lg:table-cell text-center py-8 px-4 text-gray-500"
                >
                  Loading transactions...
                </td>
              </tr>
            ) : sales.length === 0 ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="5"
                  className="block lg:table-cell text-center py-8 px-4 text-gray-500"
                >
                  No transactions found.
                </td>
              </tr>
            ) : (
              sales.slice(0, 10).map((item, index) => (
                <tr
                  key={index}
                  className="
                    grid grid-cols-2 sm:grid-cols-3
                    gap-x-4 gap-y-4
                    p-4 sm:p-5
                    mx-3 my-3
                    border border-gray-200 rounded-xl
                    bg-white shadow-sm
                    hover:bg-gray-50 transition

                    lg:table-row
                    lg:mx-0 lg:my-0 lg:p-0
                    lg:border-0 lg:border-t lg:border-[#00000026]
                    lg:rounded-none lg:shadow-none
                  "
                >

                  {/* Invoice Number */}
                  <td className="col-span-2 sm:col-span-3 min-w-0 lg:table-cell lg:p-4 font-bold text-[#4B5EAA]">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Invoice No
                    </span>

                    <span className="block break-words">
                      {item.invoice_no}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="col-span-2 sm:col-span-1 min-w-0 lg:table-cell lg:p-4 font-medium text-gray-800">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Customer
                    </span>

                    <span className="block break-words">
                      {item.customer}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="min-w-0 lg:table-cell lg:p-4 text-gray-600">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Date
                    </span>

                    <span className="block break-words">
                      {item.date}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="min-w-0 lg:table-cell lg:p-4 font-bold text-gray-900">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Amount
                    </span>

                    <span className="block break-words">
                      ₹
                      {item.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="col-span-2 sm:col-span-1 min-w-0 lg:table-cell lg:p-4">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                      Status
                    </span>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        badge[item.status] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
