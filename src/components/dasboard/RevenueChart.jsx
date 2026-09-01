import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function RevenueChart({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Revenue Trend</h2>

        <span className="text-sm text-gray-400">Last 7 Days</span>
      </div>

      <div className="h-80 w-full">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl">
            <p className="text-gray-400">No revenue data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4B5EAA" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#4B5EAA" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(v) => `₹${v >= 1000 ? (v / 1000) + 'K' : v}`} />
              <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#4B5EAA"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}

export default RevenueChart;
