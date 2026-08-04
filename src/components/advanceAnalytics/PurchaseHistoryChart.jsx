import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { month: "Jan", purchase: 45000 },
  { month: "Feb", purchase: 38000 },
  { month: "Mar", purchase: 42000 },
  { month: "Apr", purchase: 28000 },
  { month: "May", purchase: 31000 },
  { month: "Jun", purchase: 26000 },
  { month: "Jul", purchase: 35000 },
];

function PurchaseHistoryChart() {
  return (
    <div className="bg-white rounded-2xl border border-[#00000026] p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Purchase History</h2>

        <span className="text-sm text-gray-500">Last 7 Months</span>
      </div>

      <div className="h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="month" />

            <YAxis tickFormatter={(v) => `${v / 1000}K`} />

            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Purchase"]} />

            <Bar dataKey="purchase" fill="#4B5EAA" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PurchaseHistoryChart;
