
import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Pagination from "../common/Pagination";

const tabs = [
  "All",
  "Pending",
  "Cutting",
  "Ready",
  "Delivered",
  "Cancelled",
];

const getStatusStyle = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-600";
    case "Cutting":
      return "bg-blue-100 text-blue-600";
    case "Ready":
      return "bg-purple-100 text-purple-600";
    case "Pending":
      return "bg-orange-100 text-orange-500";
    case "Cancelled":
      return "bg-red-100 text-red-500";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function OrderTable({
  orders = [],
  loading,
  activeTab,
  setActiveTab,
  dateFilter,
  setDateFilter,
  onEdit,
  onDelete,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = orders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getDisplayItems = (order) => {
    return order.items && order.items.length > 0
      ? order.items
      : [
          {
            chicken_type: order.chicken_type,
            weight: order.weight,
          },
        ];
  };

  const getChickenTypes = (items) => {
    const types = [
      ...new Set(items.map((i) => i.chicken_type)),
    ].join(" + ");

    return items.length > 1 ? types : types;
  };

  const getTotalWeight = (items) => {
    return items.reduce(
      (sum, item) => sum + Number(item.weight || 0),
      0
    );
  };

  return (
    <div className="w-full min-w-0 max-w-full">
      <div className="bg-white border border-[#00000026] rounded-xl overflow-hidden w-full min-w-0">

        <table className="block w-full text-left text-sm text-gray-600 lg:table lg:table-auto">

          {/* DESKTOP TABLE HEADER */}
          <thead className="hidden lg:table-header-group bg-[#F8F9FB] text-xs uppercase text-gray-400 font-bold border-b border-[#00000026]">
            <tr>
              <th className="px-3 xl:px-6 py-4">
                ORDER NO
              </th>
              <th className="px-3 xl:px-6 py-4">
                CUSTOMER
              </th>
              <th className="px-3 xl:px-6 py-4">
                DATE
              </th>
              <th className="px-3 xl:px-6 py-4">
                DELIVERY
              </th>
              <th className="px-3 xl:px-6 py-4">
                CHICKEN TYPE
              </th>
              <th className="px-3 xl:px-6 py-4">
                WEIGHT
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                STATUS
              </th>
              <th className="px-3 xl:px-6 py-4 text-center">
                ACTION
              </th>
            </tr>
          </thead>

          <tbody className="block lg:table-row-group lg:divide-y lg:divide-[#00000026]">
            {loading ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="8"
                  className="block lg:table-cell px-6 py-8 text-center text-gray-500"
                >
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr className="block lg:table-row">
                <td
                  colSpan="8"
                  className="block lg:table-cell px-6 py-8 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              currentOrders.map((order) => {
                const displayItems = getDisplayItems(order);
                const types = getChickenTypes(displayItems);
                const totalWeight = getTotalWeight(displayItems);

                return (
                  <tr
                    key={order.id}
                    className="
                      grid grid-cols-2 sm:grid-cols-3
                      gap-x-4 gap-y-4
                      p-4 sm:p-5
                      mx-3 my-3
                      bg-white
                      border border-gray-200
                      rounded-xl shadow-sm
                      hover:bg-gray-50
                      transition-colors

                      lg:table-row
                      lg:m-0 lg:p-0
                      lg:border-0
                      lg:rounded-none
                      lg:shadow-none
                    "
                  >

                    {/* ORDER NUMBER */}
                    <td
                      className="
                        col-span-2 sm:col-span-3
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                        font-medium text-gray-900
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Order No
                      </span>

                      <span className="block font-semibold lg:font-medium break-words">
                        {order.order_number}
                      </span>
                    </td>

                    {/* CUSTOMER */}
                    <td
                      className="
                        col-span-2 sm:col-span-1
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                        font-medium text-gray-900
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Customer
                      </span>

                      <span className="block break-words">
                        {order.customer}
                      </span>
                    </td>

                    {/* ORDER DATE */}
                    <td
                      className="
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Date
                      </span>

                      <span className="block break-words lg:whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                    </td>

                    {/* DELIVERY DATE */}
                    <td
                      className="
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Delivery
                      </span>

                      <span className="block break-words lg:whitespace-nowrap">
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </span>
                    </td>

                    {/* CHICKEN TYPE */}
                    <td
                      className="
                        col-span-2 sm:col-span-1
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                        font-medium text-gray-900
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Chicken Type
                      </span>

                      <span className="block break-words">
                        {types}
                      </span>
                    </td>

                    {/* WEIGHT */}
                    <td
                      className="
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                        font-medium text-gray-900
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Weight
                      </span>

                      <span className="block">
                        {totalWeight} Kg
                      </span>
                    </td>

                    {/* STATUS */}
                    <td
                      className="
                        min-w-0
                        lg:table-cell
                        lg:px-3 xl:px-6 lg:py-4
                        lg:text-center
                      "
                    >
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-2 lg:hidden">
                        Status
                      </span>

                      <span
                        className={`inline-flex items-center max-w-full px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status}
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
                        lg:text-center
                      "
                    >
                      <div className="flex items-center justify-between lg:justify-center gap-3">

                        <span className="text-[11px] font-semibold uppercase text-gray-400 lg:hidden">
                          Actions
                        </span>

                        <div className="flex items-center justify-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              onEdit && onEdit(order)
                            }
                            className="p-2 text-gray-600 hover:text-[#4B5EAA] hover:bg-blue-50 rounded-lg transition"
                            aria-label="Edit order"
                          >
                            <FiEdit2 size={18} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              onDelete && onDelete(order)
                            }
                            className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition"
                            aria-label="Delete order"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* EXISTING PAGINATION */}
        {!loading && orders.length > 0 && (
          <div className="w-full min-w-0 max-w-full px-2 sm:px-4 py-3 border-t border-gray-100">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
