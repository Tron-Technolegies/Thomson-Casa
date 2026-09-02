import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const badge = {
  Overdue: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
  Unpaid: "bg-orange-100 text-orange-600",
};

function OutstandingPayments({ date }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = date ? `/accounts/outstanding/?date=${date}` : "/accounts/outstanding/";
        const res = await api.get(url);
        if (res.success && res.invoices) {
          setInvoices(res.invoices.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-hidden">
      <h2 className="text-2xl font-semibold mb-6">Outstanding Payments</h2>

      <div className="overflow-x-auto">

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="pb-4">Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">Loading...</td></tr>
          ) : invoices.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No outstanding payments.</td></tr>
          ) : (
            invoices.map((item) => (
              <tr key={item.id} className="border-t border-[#00000026] hover:bg-gray-50">
                <td className="py-4 font-bold text-[#4B5EAA]">{item.id}</td>
                <td className="font-medium text-gray-800">{item.customer}</td>
                <td className="font-bold text-red-600">₹{item.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${badge[item.status] || badge.Unpaid}`}>
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

export default OutstandingPayments;
