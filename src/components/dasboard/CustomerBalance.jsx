import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

function CustomerBalance() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/accounts/advances/balances/");
        if (res.success && res.balances) {
          // Take top 5 for the dashboard widget
          setCustomers(res.balances.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Customer Balance</h2>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="pb-4">Customer</th>
            <th>Credit (Advance)</th>
            <th>Debit (Used)</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">Loading...</td></tr>
          ) : customers.length === 0 ? (
            <tr><td colSpan="4" className="text-center py-4 text-gray-500">No balances available.</td></tr>
          ) : (
            customers.map((item) => (
              <tr key={item.customer_name} className="border-t border-[#00000026] hover:bg-gray-50">
                <td className="py-4 font-medium text-gray-800">{item.customer_name}</td>
                <td className="text-green-600 font-semibold">₹{item.received.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className="text-red-500 font-semibold">₹{item.consumed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                <td className={item.balance >= 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
                  {item.balance >= 0 ? "+" : ""}₹{item.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerBalance;
