const transactions = [
  {
    id: "ORD-0091",
    customer: "Apex Industries",
    product: "Steel Pipes 2in",
    qty: "120 pcs",
    amount: "₹84,000",
    date: "09 Jul 2026",
    status: "Completed",
  },
  {
    id: "ORD-0090",
    customer: "Vertex Corp",
    product: "Copper Wire 6mm",
    qty: "500 m",
    amount: "₹37,500",
    date: "09 Jul 2026",
    status: "Completed",
  },
  {
    id: "ORD-0089",
    customer: "Meridian Ltd",
    product: "Aluminium Sheet",
    qty: "80 Sheets",
    amount: "₹56,000",
    date: "08 Jul 2026",
    status: "Pending",
  },
];

const badge = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
};

function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-[#00000026]">
        <h2 className="text-2xl font-semibold">Recent Transactions</h2>

        <button className="bg-red-100 text-red-500 px-4 py-2 rounded-lg">PDF</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500 text-sm">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className="border-t border-[#00000026] hover:bg-gray-50">
                <td className="p-4 text-blue-600">{item.id}</td>

                <td className="p-4">{item.customer}</td>

                <td className="p-4">{item.product}</td>

                <td className="p-4">{item.qty}</td>

                <td className="p-4 font-medium">{item.amount}</td>

                <td className="p-4">{item.date}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${badge[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
