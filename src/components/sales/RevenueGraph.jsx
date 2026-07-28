import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { day: "Mon", revenue: 12000 },
  { day: "Tue", revenue: 18000 },
  { day: "Wed", revenue: 9000 },
  { day: "Thu", revenue: 22000 },
  { day: "Fri", revenue: 32000 },
  { day: "Sat", revenue: 29000 },
  { day: "Sun", revenue: 15000 },
];
export default function RevenueGraph() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-800">Revenue Overview</h2>

        <span className="text-sm text-gray-400">Daily View</span>
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="day" />

            <YAxis tickFormatter={(value) => `₹${value / 1000}k`} />

            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Revenue"]} />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{
                r: 4,
                fill: "#3B82F6",
              }}
              activeDot={{
                r: 7,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
