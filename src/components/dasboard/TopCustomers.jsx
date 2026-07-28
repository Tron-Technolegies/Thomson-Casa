function TopCustomers() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-8">Top Customers</h2>

      <div className="h-80 flex items-end justify-around border-t border-[#00000026]">
        {[90, 80, 60, 55, 50].map((height, index) => (
          <div
            key={index}
            className="w-12 bg-indigo-700 rounded-t-lg"
            style={{
              height: `${height}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default TopCustomers;
