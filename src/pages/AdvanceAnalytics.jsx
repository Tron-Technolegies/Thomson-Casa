import React, { useState, useEffect } from "react";
import DateRange from "../components/sales/DateRange";
import BalanceTrendChart from "../components/advanceAnalytics/BalanceTrendChart";
import { FaWallet, FaPercentage, FaShoppingCart, FaClock } from "react-icons/fa";
import PurchaseHistoryChart from "../components/advanceAnalytics/PurchaseHistoryChart";
import { api } from "../services/api";

function AdvanceAnalytics() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [balances, setBalances] = useState([]);
  const [analytics, setAnalytics] = useState({ trend: [], monthly_summary: [] });
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [custRes, balRes] = await Promise.all([
          api.get("/accounts/customers/"),
          api.get("/accounts/advances/balances/")
        ]);
        if (custRes.success) {
          setCustomers(custRes.customers || []);
          if (custRes.customers.length > 0) setSelectedCustomerId(custRes.customers[0].id.toString());
        }
        if (balRes.success) setBalances(balRes.balances || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCustomerId) {
      const fetchAnalytics = async () => {
        try {
          const url = date ? `/accounts/advances/analytics/${selectedCustomerId}/?date=${date}` : `/accounts/advances/analytics/${selectedCustomerId}/`;
          const res = await api.get(url);
          if (res.success) {
            setAnalytics({
              trend: res.trend || [],
              monthly_summary: res.monthly_summary || []
            });
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchAnalytics();
    }
  }, [selectedCustomerId, date]);

  const selectedCustomerName = customers.find(c => c.id.toString() === selectedCustomerId)?.customer_name || "";
  const selectedBalance = balances.find(b => b.customer_name === selectedCustomerName) || {
    received: 0, consumed: 0, balance: 0, percent: 0
  };


  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Advance Analytics</h1>
          <p className="text-gray-500 mt-1">Customer advance utilization insights</p>
        </div>
        <DateRange date={date} setDate={setDate} />
      </div>

      <div className="bg-white rounded-2xl border border-[#00000026] p-5 ">
        <label className="text-sm font-medium text-gray-600">Customer</label>
        <select 
          value={selectedCustomerId}
          onChange={(e) => setSelectedCustomerId(e.target.value)}
          className="md:w-80 mt-2 mx-2 border border-[#00000026] cursor-pointer rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
        >
          {customers.map(c => (
            <option key={c.id} value={c.id}>{c.customer_name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Current Balance</p>
              <h2 className="text-3xl font-bold mt-5">₹{selectedBalance.balance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            </div>
            <FaWallet className="text-[#4B5EAA]" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Utilized</p>
              <h2 className="text-3xl font-bold mt-5">{selectedBalance.percent}%</h2>
            </div>
            <FaPercentage className="text-orange-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Advance Received</p>
              <h2 className="text-3xl font-bold mt-5">₹{selectedBalance.received.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            </div>
            <FaShoppingCart className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Advance Consumed</p>
              <h2 className="text-3xl font-bold mt-5">₹{selectedBalance.consumed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
            </div>
            <FaClock className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <BalanceTrendChart data={analytics.trend} />
          <PurchaseHistoryChart data={analytics.trend} />
        </div>
        <div className="bg-white rounded-2xl border border-[#00000026]">
          <div className="p-5 border-b border-[#00000026]">
            <h2 className="text-xl font-semibold">Monthly Summary (Upcoming)</h2>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="p-4">Month</th>
                <th>Purchase</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {analytics.monthly_summary.map((item) => (
                <tr key={item.month} className="border-t border-[#00000026]">
                  <td className="p-4">{item.month}</td>
                  <td className="text-gray-400">{item.purchased}</td>
                  <td className="text-gray-400">{item.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdvanceAnalytics;
