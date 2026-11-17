
import React, { useState } from "react";
import { FiDownload, FiPrinter } from "react-icons/fi";
import { exportTableToPDF } from "../../utils/pdfGenerator";
import Pagination from "../common/Pagination";

export default function AdvanceBalanceTable({ balances = [], loading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(balances.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBalances = balances.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Existing PDF function - unchanged
  const handleDownloadPDF = () => {
    const headers = [
      "CUSTOMER",
      "ADVANCE RECEIVED",
      "CONSUMED",
      "BALANCE",
      "UTILISATION %",
      "LAST TRANSACTION",
    ];

    const data = balances.map(row => [
      row.customer_name,
      `Rs. ${row.received.toLocaleString()}`,
      `Rs. ${row.consumed.toLocaleString()}`,
      `Rs. ${row.balance.toLocaleString()}`,
      `${row.percent}%`,
      row.last_tx
    ]);

    exportTableToPDF(
      "Advance Balances",
      headers,
      data,
      "Advance_Balances.pdf"
    );
  };

  return (
    <div className="w-full min-w-0 max-w-full bg-white border border-[#00000026] rounded-xl overflow-hidden mt-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-5 lg:p-6 border-b border-[#00000026] gap-3 sm:gap-4">
        <h2 className="text-lg sm:text-xl font-bold text-[#4B5EAA] break-words">
          Advance Balance Details
        </h2>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          {/* Existing Print button - remains commented out */}
          {/*
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-[#4B5EAA] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#3d4f92] transition cursor-pointer"
          >
            <FiPrinter /> Print
          </button>
          */}

          <button
            onClick={handleDownloadPDF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-100 text-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition cursor-pointer"
          >
            <FiDownload />
            PDF
          </button>
        </div>
      </div>

      {/* MOBILE AND TABLET VIEW */}
      <div className="block xl:hidden w-full min-w-0 p-3 sm:p-4">

        {loading ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            Loading balances...
          </div>
        ) : balances.length === 0 ? (
          <div className="py-10 text-center text-gray-500 text-sm">
            No balance records found.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 w-full">
            {currentBalances.map((row, idx) => (
              <div
                key={idx}
                className="w-full min-w-0 bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:bg-gray-50 transition"
              >

                {/* Customer and Balance */}
                <div className="flex flex-col min-[400px]:flex-row min-[400px]:justify-between gap-3 border-b border-gray-100 pb-4 mb-4">

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                      Customer
                    </p>
                    <p className="font-medium text-[#4B5EAA] break-words">
                      {row.customer_name}
                    </p>
                  </div>

                  <div className="min-w-0 min-[400px]:text-right">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                      Balance
                    </p>
                    <p className="font-bold text-green-500 break-all">
                      ₹ {row.balance.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Advance Details */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">

                  {/* Advance Received */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Advance Received
                    </p>
                    <p className="font-bold text-gray-900 break-all">
                      ₹ {row.received.toLocaleString()}
                    </p>
                  </div>

                  {/* Consumed */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Consumed
                    </p>
                    <span className="inline-flex max-w-full bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-full text-xs break-all">
                      ₹ {row.consumed.toLocaleString()}
                    </span>
                  </div>

                  {/* Last Transaction */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Last Transaction
                    </p>
                    <p className="font-bold text-gray-900 break-words">
                      {row.last_tx}
                    </p>
                  </div>

                  {/* Utilisation */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-gray-400 uppercase mb-2">
                      Utilisation %
                    </p>
                    <div className="flex items-center gap-3 w-full">
                      <div className="flex-1 min-w-0 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            row.percent >= 90
                              ? "bg-red-500"
                              : row.percent >= 70
                                ? "bg-orange-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(row.percent, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-400 shrink-0">
                        {row.percent}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP VIEW - ORIGINAL TABLE */}
      <div className="hidden xl:block w-full min-w-0">
        <table className="w-full table-fixed text-left text-sm text-gray-600">
          <thead className="bg-[#F8F9FB] text-xs uppercase text-gray-400 font-bold border-b border-[#00000026]">
            <tr>
              <th className="px-3 2xl:px-6 py-4 w-[18%]">
                CUSTOMER
              </th>
              <th className="px-3 2xl:px-6 py-4 w-[17%]">
                ADVANCE RECEIVED
              </th>
              <th className="px-3 2xl:px-6 py-4 w-[15%]">
                CONSUMED
              </th>
              <th className="px-3 2xl:px-6 py-4 w-[15%]">
                BALANCE
              </th>
              <th className="px-3 2xl:px-6 py-4 w-[20%]">
                UTILISATION %
              </th>
              <th className="px-3 2xl:px-6 py-4 w-[15%]">
                LAST TRANSACTION
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#00000026]">
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  Loading balances...
                </td>
              </tr>
            ) : balances.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No balance records found.
                </td>
              </tr>
            ) : (
              currentBalances.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">

                  <td className="px-3 2xl:px-6 py-4 font-medium text-[#4B5EAA] break-words">
                    {row.customer_name}
                  </td>

                  <td className="px-3 2xl:px-6 py-4 font-bold text-gray-900 break-all">
                    ₹ {row.received.toLocaleString()}
                  </td>

                  <td className="px-3 2xl:px-6 py-4">
                    <span className="inline-flex max-w-full bg-gray-200 text-gray-700 font-bold px-3 py-1 rounded-full text-xs break-all">
                      ₹ {row.consumed.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-3 2xl:px-6 py-4 font-bold text-green-500 break-all">
                    ₹ {row.balance.toLocaleString()}
                  </td>

                  <td className="px-3 2xl:px-6 py-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex-1 min-w-0 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            row.percent >= 90
                              ? "bg-red-500"
                              : row.percent >= 70
                                ? "bg-orange-500"
                                : "bg-green-500"
                          }`}
                          style={{
                            width: `${Math.min(row.percent, 100)}%`,
                          }}
                        />
                      </div>

                      <span className="text-xs font-bold text-gray-400 shrink-0">
                        {row.percent}%
                      </span>
                    </div>
                  </td>

                  <td className="px-3 2xl:px-6 py-4 font-bold text-gray-900 break-words">
                    {row.last_tx}
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Existing Pagination */}
      {!loading && balances.length > 0 && (
        <div className="w-full min-w-0 max-w-full px-2 sm:px-4 py-3 border-t border-gray-100">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
