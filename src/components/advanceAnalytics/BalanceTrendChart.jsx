import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { month: "Jan", balance: 300000 },
  { month: "Feb", balance: 255000 },
  { month: "Mar", balance: 217000 },
  { month: "Apr", balance: 175000 },
  { month: "May", balance: 147000 },
  { month: "Jun", balance: 116000 },
  { month: "Jul", balance: 90000 },
];

function BalanceTrendChart() {
  return (
    <div className="bg-white rounded-2xl border border-[#00000026] p-6">
      <div className="flex justify-between mb-8">
        <h2 className="text-2xl font-semibold">Remaining Balance Trend</h2>

        <span className="text-sm text-gray-500">Last 7 Months</span>
      </div>

      <div className="h-[380px]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4B5EAA" stopOpacity={0.4} />

                <stop offset="95%" stopColor="#4B5EAA" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" />

            <YAxis tickFormatter={(v) => `${v / 1000}K`} />

            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Balance"]} />

            <Area
              type="monotone"
              dataKey="balance"
              stroke="#4B5EAA"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BalanceTrendChart;
