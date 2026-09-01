function TopCustomers({ customers = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-8">Top Customers</h2>

      <div className="h-80 flex items-end justify-around border-t border-[#00000026] pt-6">
        {customers.map((c, index) => (
          <div key={index} className="flex flex-col items-center justify-end h-full w-full">
            <span className="text-xs text-gray-500 mb-2 whitespace-nowrap overflow-hidden text-ellipsis w-16 text-center">{c.customer}</span>
            <div
              className="w-12 bg-indigo-700 rounded-t-lg transition-all duration-500"
              style={{
                height: `${c.percent}%`,
              }}
              title={`₹${c.total}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopCustomers;
