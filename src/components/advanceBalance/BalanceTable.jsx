import React from "react";
import { FaFilePdf, FaPrint } from "react-icons/fa";
import { BASE_URL } from "../../services/api";

function BalanceTable({ balances = [], loading = false }) {
  return (
    <div className="bg-white border border-[#00000026] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 border-b border-[#00000026]">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Advance Balance Details</h2>
          <p className="text-sm text-gray-500 mt-1">Track customer advance utilization</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => window.open(`${BASE_URL}/accounts/advances/balances/pdf/`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition cursor-pointer"
          >
            <FaFilePdf />
            PDF
          </button>
          {/* <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition cursor-pointer"
          >
            <FaPrint />
            Print
          </button> */}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm">
              <th className="px-6 py-4 font-semibold">Customer</th>
              <th className="px-6 py-4 font-semibold">Advance</th>
              <th className="px-6 py-4 font-semibold">Utilized</th>
              <th className="px-6 py-4 font-semibold">Remaining</th>
              <th className="px-6 py-4 font-semibold">Utilization</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center py-6 text-gray-500">Loading advance balances...</td></tr>
            ) : balances.length === 0 ? (
              <tr><td colSpan="6" className="text-center py-6 text-gray-500">No advance balances recorded yet.</td></tr>
            ) : (
              balances.map((item, index) => {
                const status = item.balance <= 0 && item.received > 0 ? "Completed" : "Active";
                
                return (
                <tr key={index} className="border-t border-[#00000020] hover:bg-gray-50 transition">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center">
                        {item.customer_name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{item.customer_name}</p>
                        <p className="text-xs text-gray-500">Last TX: {item.last_tx}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-gray-800">
                    ₹{item.received.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>

                  <td className="px-6 py-5 text-orange-600 font-medium">
                    ₹{item.consumed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>

                  <td className="px-6 py-5 text-green-600 font-medium">
                    ₹{item.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </td>

                  <td className="px-6 py-5 w-64">
                    <div className="flex justify-between text-sm mb-2">
                      <span>{item.percent}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          item.percent >= 90
                            ? "bg-red-500"
                            : item.percent >= 70
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(item.percent, 100)}%` }}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-semibold ${
                        status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              )})
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BalanceTable;
