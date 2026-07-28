const methods = [
  {
    name: "Bank Transfer",
    amount: "₹58,212",
    percent: 42,
  },
  {
    name: "Cheque",
    amount: "₹38,808",
    percent: 28,
  },
  {
    name: "UPI",
    amount: "₹24,948",
    percent: 18,
  },
  {
    name: "Cash",
    amount: "₹16,632",
    percent: 12,
  },
];

function PaymentMethods() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-8">Payment Methods</h2>

      <div className="space-y-7">
        {methods.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>{item.amount}</span>
            </div>

            <div className="h-2 rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-indigo-700"
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>

            <p className="text-xs mt-2 text-gray-500">{item.percent}% of total</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentMethods;
