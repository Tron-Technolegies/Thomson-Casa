
import React, { useState } from "react";
import { FiTrash2, FiEdit2, FiEye } from "react-icons/fi";
import Pagination from "../common/Pagination";

const getTypeColor = (type) => {
  const t = type?.toLowerCase();
  switch (t) {
    case "wholesale":
      return "bg-purple-100 text-purple-700";
    case "regular":
      return "bg-blue-100 text-blue-700";
    case "new_customer":
      return "bg-indigo-100 text-indigo-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const getStatusColor = (status) => {
  return status?.toLowerCase() === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-600";
};

const getScoreColor = (score) => {
  if (score >= 80) return "bg-green-100 text-green-700";
  if (score >= 50) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
};

export default function CustomerTable({
  customers = [],
  loading,
  onPreview,
  onEdit,
  onDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(customers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col w-full min-w-0 max-w-full overflow-hidden">

      {/* SAME TABLE - RESPONSIVE LAYOUT */}
      <div className="w-full min-w-0">

        <table className="block w-full text-left text-sm text-gray-600 lg:table lg:table-auto">

          {/* DESKTOP HEADER */}
          <thead className="hidden lg:table-header-group bg-[#F7F7F7] text-xs uppercase text-gray-500 font-semibold border-b border-[#00000026]">
            <tr>
              <th className="px-3 xl:px-6 py-4">
                CUSTOMER
              </th>
              <th className="px-3 xl:px-6 py-4">
                COMPANY
              </th>
              <th className="px-3 xl:px-6 py-4">
                PHONE
              </th>
              <th className="px-3 xl:px-6 py-4">
                ADDRESS
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                SCORE
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                CUSTOMER TYPE
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                STATUS
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody className="block lg:table-row-group lg:divide-y lg:divide-gray-100">
            {loading ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="8"
                  className="block lg:table-cell px-6 py-8 text-center text-gray-500"
                >
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="8"
                  className="block lg:table-cell px-6 py-8 text-center text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              currentCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="
                    grid grid-cols-2 sm:grid-cols-3
                    gap-x-4 gap-y-4
                    p-4 sm:p-5
                    mx-2 sm:mx-3 my-3
                    border border-gray-200 rounded-xl
                    bg-white shadow-sm
                    hover:bg-gray-50
                    cursor-pointer
                    transition-colors

                    lg:table-row
                    lg:m-0 lg:p-0
                    lg:border-0 lg:rounded-none lg:shadow-none
                  "
                  onClick={() => onPreview && onPreview(cust)}
                >

                  {/* CUSTOMER NAME */}
                  <td className="
                    col-span-2 sm:col-span-3
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                    font-medium text-gray-900
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Customer
                    </span>

                    <span className="block break-words font-semibold lg:font-medium">
                      {cust.customer_name}
                    </span>
                  </td>

                  {/* COMPANY */}
                  <td className="
                    col-span-2 sm:col-span-1
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Company
                    </span>

                    <span className="block break-words">
                      {cust.company_name}
                    </span>
                  </td>

                  {/* PHONE */}
                  <td className="
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Phone
                    </span>

                    <span className="block break-all lg:whitespace-nowrap">
                      {cust.phone}
                    </span>
                  </td>

                  {/* ADDRESS */}
                  <td
                    className="
                      col-span-2 sm:col-span-1
                      min-w-0
                      lg:table-cell
                      lg:px-3 xl:px-6 lg:py-4
                      lg:max-w-[150px]
                    "
                    title={cust.address}
                  >
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                      Address
                    </span>

                    <span className="block break-words lg:truncate">
                      {cust.address}
                    </span>
                  </td>

                  {/* SCORE */}
                  <td className="
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                    lg:text-center
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                      Score
                    </span>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${getScoreColor(
                        cust.performance_score
                      )}`}
                    >
                      {cust.performance_score} / 100
                    </span>
                  </td>

                  {/* CUSTOMER TYPE */}
                  <td className="
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                    lg:text-center
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                      Customer Type
                    </span>

                    <span
                      className={`inline-flex items-center max-w-full px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                        cust.customer_type
                      )} capitalize`}
                    >
                      <span className="break-words">
                        {cust.customer_type?.replace("_", " ")}
                      </span>
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="
                    min-w-0
                    lg:table-cell
                    lg:px-3 xl:px-6 lg:py-4
                    lg:text-center
                  ">
                    <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                      Status
                    </span>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        cust.status
                      )} capitalize`}
                    >
                      {cust.status}
                    </span>
                  </td>

                  {/* ACTIONS */}
                  <td
                    className="
                      col-span-2 sm:col-span-3
                      min-w-0
                      pt-3 border-t border-gray-100
                      lg:table-cell
                      lg:px-3 xl:px-6 lg:py-4
                      lg:border-0
                    "
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between lg:justify-center gap-3">

                      <span className="text-[11px] font-semibold uppercase text-gray-400 lg:hidden">
                        Actions
                      </span>

                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            onDelete && onDelete(cust.id)
                          }
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label="Delete customer"
                        >
                          <FiTrash2 size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onEdit && onEdit(cust)
                          }
                          className="p-2 text-gray-500 hover:text-[#465C8F] hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Edit customer"
                        >
                          <FiEdit2 size={18} />
                        </button>
                      </div>
                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* SAME PAGINATION */}
      {!loading && customers.length > 0 && (
        <div className="w-full min-w-0 max-w-full px-2 sm:px-4 py-3">
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
