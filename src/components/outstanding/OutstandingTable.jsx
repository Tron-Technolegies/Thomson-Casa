const rows = [
  {
    order: "INV-2026-0458",
    customer: "Vertex Corp",
    amount: "₹84,000",
    due: "08 Jul 2026",
    overdue: "8 Days",
    status: "Overdue",
  },
  {
    order: "INV-2026-0457",
    customer: "Falcon Enterprises",
    amount: "₹52,000",
    due: "05 Jul 2026",
    overdue: "4 Days",
    status: "Overdue",
  },
  {
    order: "INV-2026-0456",
    customer: "Meridian Ltd",
    amount: "₹31,500",
    due: "15 Jul 2026",
    overdue: "--",
    status: "Due Soon",
  },
  {
    order: "INV-2026-0455",
    customer: "Nexus Solutions",
    amount: "₹67,800",
    due: "20 Jul 2026",
    overdue: "--",
    status: "Due Soon",
  },
  {
    order: "INV-2026-0454",
    customer: "Summit Holdings",
    amount: "₹19,200",
    due: "25 Jul 2026",
    overdue: "--",
    status: "Pending",
  },
];

const badge = {
  Overdue: "bg-red-100 text-red-600",
  "Due Soon": "bg-orange-100 text-orange-600",
  Pending: "bg-yellow-100 text-yellow-700",
};

function OutstandingTable() {
  return (
    <div className="bg-white rounded-2xl border border-[#00000026] overflow-hidden">
      <div className="flex justify-between items-center p-6 border-b border-[#00000026]">
        <h2 className="text-xl font-semibold">Outstanding Payment Details</h2>

        <button className="bg-red-100 text-red-500 px-4 py-2 rounded-lg">PDF</button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="p-5 text-left">Orders</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Due Date</th>
              <th className="text-left">Days Overdue</th>
              <th className="text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-[#00000026] hover:bg-gray-50">
                <td className="p-5 text-blue-600">{row.order}</td>

                <td>{row.customer}</td>

                <td>{row.amount}</td>

                <td>{row.due}</td>

                <td className="text-red-500">{row.overdue}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${badge[row.status]}`}
                  >
                    {row.status}
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

export default OutstandingTable;
