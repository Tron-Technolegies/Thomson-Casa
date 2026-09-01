import React, { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import PurchasePricingModal from "./PurchasePricingModal";

function PurchaseTable({ orders = [], loading = false, dailyPrices = [], onPricingSaved }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getItemsSummary = (items) => {
    if (!items || items.length === 0) return "-";
    return items.map(i => i.chicken_type).join(" + ");
  };

  return (
    <>
      <div className="bg-white border border-[#00000026] rounded-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-[#00000026]">
          <h2 className="text-xl font-semibold">Orders Pending Pricing</h2>
          <button 
            onClick={() => window.open('http://localhost:8000/api/accounts/orders/pdf/', '_blank')}
            className="bg-red-100 text-red-500 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition cursor-pointer"
          >
            <FaFilePdf className="inline mr-2" /> PDF
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-sm">
              <tr className="text-left text-gray-500">
                <th className="p-5 font-semibold">Order No</th>
                <th className="font-semibold">Customer</th>
                <th className="font-semibold">Items Summary</th>
                <th className="font-semibold">Total Weight (Kg)</th>
                <th className="font-semibold">Status</th>
                <th className="font-semibold text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr><td colSpan="6" className="text-center py-6 text-gray-500">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-6 text-gray-500">No pending orders available.</td></tr>
              ) : (
                orders.map((row, index) => (
                  <tr key={index} className="border-t border-[#00000026] hover:bg-gray-50 transition">
                    <td className="p-5 font-bold text-[#4B5EAA]">{row.order_number}</td>
                    <td className="font-semibold text-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                          {row.customer.charAt(0)}
                        </div>
                        {row.customer}
                      </div>
                    </td>
                    <td className="text-gray-600 text-sm">{getItemsSummary(row.items)}</td>
                    <td className="font-bold text-orange-600">{row.total_weight} Kg</td>
                    <td className="font-medium text-gray-600">{row.status}</td>
                    <td className="text-center">
                      <button 
                        onClick={() => setSelectedOrder(row)}
                        className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-100 transition cursor-pointer"
                      >
                        Set Pricing
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
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
