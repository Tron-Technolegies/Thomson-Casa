import { FaFilePdf, FaPrint } from "react-icons/fa";

const balances = [
  {
    id: 1,
    customer: "Apex Industries",
    advance: 250000,
    utilized: 180000,
    remaining: 70000,
    percentage: 72,
    status: "Active",
  },
  {
    id: 2,
    customer: "Pinnacle Traders",
    advance: 180000,
    utilized: 85000,
    remaining: 95000,
    percentage: 47,
    status: "Active",
  },
  {
    id: 3,
    customer: "Fresh Mart",
    advance: 120000,
    utilized: 120000,
    remaining: 0,
    percentage: 100,
    status: "Completed",
  },
  {
    id: 4,
    customer: "Nexus Solutions",
    advance: 300000,
    utilized: 210000,
    remaining: 90000,
    percentage: 70,
    status: "Active",
  },
];

function BalanceTable() {
  return (
    <div className="bg-white border border-[#00000026] rounded-2xl overflow-hidden">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 border-b border-[#00000026]">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Advance Balance Details</h2>

          <p className="text-sm text-gray-500 mt-1">Track customer advance utilization</p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition">
            <FaFilePdf />
            PDF
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition">
            <FaPrint />
            Print
          </button>
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600 text-sm">
              <th className="px-6 py-4 font-semibold">Customer</th>

              <th className="px-6 py-4 font-semibold">Advance</th>

              <th className="px-6 py-4 font-semibold">Utilized</th>

              <th className="px-6 py-4 font-semibold">Remaining</th>

              <th className="px-6 py-4 font-semibold">Utilization</th>

              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {balances.map((item) => (
              <tr key={item.id} className="border-t border-[#00000020] hover:bg-gray-50 transition">
                {/* Customer */}

                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-700 font-semibold flex items-center justify-center">
                      {item.customer.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-800">{item.customer}</p>

                      <p className="text-xs text-gray-500">Customer #{item.id}</p>
                    </div>
                  </div>
                </td>

                {/* Advance */}

                <td className="px-6 py-5 font-semibold text-gray-800">
                  ₹{item.advance.toLocaleString()}
                </td>

                {/* Utilized */}

                <td className="px-6 py-5 text-orange-600 font-medium">
                  ₹{item.utilized.toLocaleString()}
                </td>

                {/* Remaining */}

                <td className="px-6 py-5 text-green-600 font-medium">
                  ₹{item.remaining.toLocaleString()}
                </td>

                {/* Progress */}

                <td className="px-6 py-5 w-64">
                  <div className="flex justify-between text-sm mb-2">
                    <span>{item.percentage}%</span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.percentage >= 90
                          ? "bg-red-500"
                          : item.percentage >= 70
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>
                </td>

                {/* Status */}

                <td className="px-6 py-5">
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-semibold ${
                      item.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
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

export default BalanceTable;
