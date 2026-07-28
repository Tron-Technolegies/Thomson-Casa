const invoices = [
  {
    invoice: "0441",
    customer: "Vertex Corp",
    amount: "₹84,000",
    status: "Overdue",
  },
  {
    invoice: "0437",
    customer: "Falcon",
    amount: "₹52,000",
    status: "Due Soon",
  },
  {
    invoice: "0451",
    customer: "Meridian",
    amount: "₹31,500",
    status: "Pending",
  },
];

function OutstandingPayments() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Outstanding Payments</h2>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="pb-4">Invoice</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((item) => (
            <tr key={item.invoice} className="border-t border-[#00000026]">
              <td className="py-4">{item.invoice}</td>

              <td>{item.customer}</td>

              <td>{item.amount}</td>

              <td>
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-500 text-xs">
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OutstandingPayments;
