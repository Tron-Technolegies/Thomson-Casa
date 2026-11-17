
import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import PurchasePricingModal from "./PurchasePricingModal";
import { BASE_URL } from "../../services/api";

function PurchaseTable({
  orders = [],
  loading = false,
  dailyPrices = [],
  onPricingSaved,
}) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pricingFilter, setPricingFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (pricingFilter === "pending") return !order.is_priced;
    if (pricingFilter === "done") return order.is_priced;
    return true;
  });

  const getItemsSummary = (items) => {
    if (!items || items.length === 0) return "-";
    return items.map(i => i.chicken_type).join(" + ");
  };

  return (
    <>
      <div className="w-full min-w-0 max-w-full bg-white border border-[#00000026] rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center gap-3 sm:gap-4 p-4 sm:p-5 lg:p-6 border-b border-[#00000026]">

          {/* TITLE + FILTER */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 min-w-0 flex-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 break-words">
              Customer Purchase Orders
            </h2>

            <select
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value)}
              className="w-full sm:w-auto min-w-0 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-200"
            >
              <option value="all">All Orders</option>
              <option value="pending">Set Pricing</option>
              <option value="done">Done</option>
            </select>
          </div>

          {/* PDF BUTTON */}
          <button
            onClick={() =>
              window.open(
                `${BASE_URL}/accounts/orders/pdf/`,
                "_blank"
              )
            }
            className="w-full sm:w-auto shrink-0 flex items-center justify-center bg-red-100 text-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition cursor-pointer"
          >
            <FaFilePdf className="mr-2" />
            PDF
          </button>
        </div>

        {/* RESPONSIVE ORDER TABLE */}
        <div className="w-full min-w-0">
          <table className="block w-full text-sm lg:table lg:table-auto">

            {/* DESKTOP TABLE HEADER */}
            <thead className="hidden lg:table-header-group bg-gray-50 text-gray-500 text-sm">
              <tr className="text-left text-gray-500">
                <th className="p-5 font-semibold">
                  Order No
                </th>
                <th className="p-4 font-semibold">
                  Customer
                </th>
                <th className="p-4 font-semibold">
                  Items Summary
                </th>
                <th className="p-4 font-semibold">
                  Total Weight (Kg)
                </th>
                <th className="p-4 font-semibold">
                  Status
                </th>
                <th className="p-4 font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="block lg:table-row-group">
              {loading ? (
                <tr className="block lg:table-row">
                  <td
                    colSpan="6"
                    className="block lg:table-cell text-center py-8 px-4 text-gray-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr className="block lg:table-row">
                  <td
                    colSpan="6"
                    className="block lg:table-cell text-center py-8 px-4 text-gray-500"
                  >
                    No orders available for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((row, index) => (
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

                    {/* ORDER NUMBER */}
                    <td className="col-span-2 sm:col-span-3 min-w-0 lg:table-cell lg:p-5 font-bold text-[#4B5EAA]">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Order No
                      </span>

                      <span className="block break-words">
                        {row.order_number}
                      </span>
                    </td>

                    {/* CUSTOMER */}
                    <td className="col-span-2 sm:col-span-1 min-w-0 lg:table-cell lg:p-4 font-semibold text-gray-800">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Customer
                      </span>

                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                          {row.customer.charAt(0)}
                        </div>

                        <span className="min-w-0 break-words">
                          {row.customer}
                        </span>
                      </div>
                    </td>

                    {/* ITEMS SUMMARY */}
                    <td className="col-span-2 sm:col-span-1 min-w-0 lg:table-cell lg:p-4 text-gray-600 text-sm">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Items Summary
                      </span>

                      <span className="block break-words">
                        {getItemsSummary(row.items)}
                      </span>
                    </td>

                    {/* TOTAL WEIGHT */}
                    <td className="min-w-0 lg:table-cell lg:p-4 font-bold text-orange-600">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Total Weight (Kg)
                      </span>

                      <span className="block">
                        {row.total_weight} Kg
                      </span>
                    </td>

                    {/* STATUS */}
                    <td className="min-w-0 lg:table-cell lg:p-4 font-medium text-gray-600">
                      <span className="block text-[11px] font-semibold uppercase text-gray-400 mb-1 lg:hidden">
                        Status
                      </span>

                      <span className="block break-words">
                        {row.status}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="col-span-2 sm:col-span-3 min-w-0 pt-3 border-t border-gray-100 lg:table-cell lg:p-4 lg:border-0 lg:text-center">
                      <div className="flex items-center justify-between lg:justify-center gap-3">
                        <span className="text-[11px] font-semibold uppercase text-gray-400 lg:hidden">
                          Action
                        </span>

                        {row.is_priced ? (
                          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
                            ✓ Done
                          </span>
                        ) : (
                          <button
                            onClick={() => setSelectedOrder(row)}
                            className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition cursor-pointer whitespace-nowrap"
                          >
                            Set Pricing
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* EXISTING PRICING MODAL */}
      <PurchasePricingModal
        open={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
        dailyPrices={dailyPrices}
        onSuccess={() => {
          setSelectedOrder(null);
          if (onPricingSaved) onPricingSaved();
        }}
      />
    </>
  );
}

export default PurchaseTable;
