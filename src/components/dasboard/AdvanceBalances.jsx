const balances = [
  {
    name: "Apex Industries",
    progress: 56,
  },
  {
    name: "Pinnacle Traders",
    progress: 93,
  },
  {
    name: "Meridian Ltd",
    progress: 75,
  },
];

function AdvanceBalances() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-8">Advance Balances</h2>

      <div className="space-y-8 border-t p-6 border-[#00000026]">
        {balances.map((item) => (
          <div key={item.name}>
            <div className="flex justify-between mb-2">
              <span>{item.name}</span>

              <span>{item.progress}%</span>
            </div>

            <div className="bg-gray-200 h-2 rounded-full">
              <div
                className="bg-indigo-700 h-full rounded-full"
                style={{
                  width: `${item.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdvanceBalances;
