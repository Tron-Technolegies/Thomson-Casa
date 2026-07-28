const customers = [
  {
    name: "Apex Industries",
    credit: "₹5,00,000",
    debit: "₹4,70,000",
    balance: "+₹30,000",
  },
  {
    name: "Vertex Corp",
    credit: "₹2,50,000",
    debit: "₹2,80,000",
    balance: "-₹30,000",
  },
  {
    name: "Meridian Ltd",
    credit: "₹1,80,000",
    debit: "₹1,50,000",
    balance: "+₹30,000",
  },
];

function CustomerBalance() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 overflow-auto">
      <h2 className="text-2xl font-semibold mb-6">Customer Balance</h2>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500">
          <tr>
            <th className="pb-4">Customer</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((item) => (
            <tr key={item.name} className="border-t border-[#00000026]">
              <td className="py-4">{item.name}</td>

              <td className="text-green-600">{item.credit}</td>

              <td className="text-red-500">{item.debit}</td>

              <td className={item.balance.startsWith("+") ? "text-green-600" : "text-red-500"}>
                {item.balance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerBalance;
