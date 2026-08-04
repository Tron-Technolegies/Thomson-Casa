import DateRange from "../components/sales/DateRange";
import BalanceTrendChart from "../components/advanceAnalytics/BalanceTrendChart";

import { FaWallet, FaPercentage, FaShoppingCart, FaClock } from "react-icons/fa";
import PurchaseHistoryChart from "../components/advanceAnalytics/PurchaseHistoryChart";

function AdvanceAnalytics() {
  const monthlyData = [
    {
      month: "Jan",
      purchased: "₹45,000",
      remaining: "₹2,55,000",
    },
    {
      month: "Feb",
      purchased: "₹38,000",
      remaining: "₹2,17,000",
    },
    {
      month: "Mar",
      purchased: "₹42,000",
      remaining: "₹1,75,000",
    },
    {
      month: "Apr",
      purchased: "₹28,000",
      remaining: "₹1,47,000",
    },
    {
      month: "May",
      purchased: "₹31,000",
      remaining: "₹1,16,000",
    },
    {
      month: "Jun",
      purchased: "₹26,000",
      remaining: "₹90,000",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Advance Analytics</h1>

          <p className="text-gray-500 mt-1">Customer advance utilization insights</p>
        </div>

        <DateRange />
      </div>

      {/* Customer */}

      <div className="bg-white rounded-2xl border border-[#00000026] p-5 ">
        <label className="text-sm font-medium text-gray-600">Customer</label>

        <select className="md:w-80 mt-2 mx-2 border border-[#00000026] cursor-pointer rounded-xl px-4 py-3 outline-none">
          <option>Apex Industries</option>

          <option>Fresh Mart</option>

          <option>Nexus Solutions</option>
        </select>
      </div>

      {/* KPI */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Current Balance</p>

              <h2 className="text-4xl font-bold mt-5">₹90,000</h2>
            </div>

            <FaWallet className="text-blue-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Utilized</p>

              <h2 className="text-4xl font-bold mt-5">70%</h2>
            </div>

            <FaPercentage className="text-orange-500" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Avg Purchase</p>

              <h2 className="text-4xl font-bold mt-5">₹35,000</h2>
            </div>

            <FaShoppingCart className="text-green-600" size={24} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026] p-6">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm uppercase">Days Left</p>

              <h2 className="text-4xl font-bold mt-5">18</h2>
            </div>

            <FaClock className="text-red-500" size={24} />
          </div>
        </div>
      </div>

      {/* Chart + Table */}

      <div className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <BalanceTrendChart />
        </div>

        <div className="bg-white rounded-2xl border border-[#00000026]">
          <div className="p-5 border-b border-[#00000026]">
            <h2 className="text-xl font-semibold">Monthly Summary</h2>
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
              {monthlyData.map((item) => (
                <tr key={item.month} className="border-t border-[#00000026]">
                  <td className="p-4">{item.month}</td>

                  <td>{item.purchased}</td>

                  <td className="text-green-600">{item.remaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Purchase History */}

        <div className="xl:col-span-2">
          <PurchaseHistoryChart />
        </div>

        {/* Summary */}

        <div className="bg-white border border-[#00000026] rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-8">Analytics Summary</h2>

          {/* Circular Progress */}

          <div className="flex justify-center">
            <div className="relative w-44 h-44">
              <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="65" stroke="#E5E7EB" strokeWidth="12" fill="none" />

                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  stroke="#4B5EAA"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="408"
                  strokeDashoffset="120"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <span className="text-5xl font-bold text-gray-800">18</span>

                <span className="text-sm text-gray-500">Days Left</span>
              </div>
            </div>
          </div>

          <div className="mt-10 space-y-5">
            <div className="flex justify-between">
              <span className="text-gray-500">Average Purchase</span>

              <span className="font-semibold">₹35,000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Highest Month</span>

              <span className="font-semibold">January</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Lowest Month</span>

              <span className="font-semibold">June</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Expected Exhaustion</span>

              <span className="text-red-500 font-semibold">21 Jul 2026</span>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-indigo-50 p-4">
            <h3 className="font-semibold text-indigo-700 mb-2">Recommendation</h3>

            <p className="text-sm text-gray-600 leading-6">
              Based on the current purchase trend, the advance balance is expected to last for
              another 18 days. Consider collecting an additional advance before the projected
              exhaustion date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvanceAnalytics;
