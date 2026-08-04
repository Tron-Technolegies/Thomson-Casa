import BalanceStatCard from "../components/advanceBalance/BalanceStatCard";
import BalanceTable from "../components/advanceBalance/BalanceTable";
import DateRange from "../components/sales/DateRange";

function AdvanceBalance() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Advance Balance</h1>

          <p className="text-gray-500 mt-1">Customer advance utilization summary</p>
        </div>

        <DateRange />
      </div>

      {/* Filters */}

      <div className="bg-white border border-[#00000026] rounded-2xl p-5">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Customer</label>

            <select className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500">
              <option>All Customers</option>

              <option>Apex Industries</option>

              <option>Pinnacle Traders</option>

              <option>Nexus Solutions</option>

              <option>Fresh Mart</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Status</label>

            <select className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none">
              <option>All</option>

              <option>Active</option>

              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Sort By</label>

            <select className="w-full mt-2 border border-gray-300 rounded-xl px-4 py-3 outline-none">
              <option>Latest</option>

              <option>Highest Balance</option>

              <option>Lowest Balance</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full bg-[#4B5EAA] hover:bg-[#405299] text-white rounded-xl py-3 font-medium transition">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceStatCard
          title="Total Balance"
          value="₹4,56,000"
          subtitle="+12.5% from last month"
          type="balance"
        />

        <BalanceStatCard
          title="Utilized"
          value="₹2,90,000"
          subtitle="63.6% Utilized"
          type="utilized"
        />

        <BalanceStatCard
          title="Available"
          value="₹1,66,000"
          subtitle="Remaining Balance"
          type="available"
        />
      </div>

      {/* Table */}

      <BalanceTable />
    </div>
  );
}

export default AdvanceBalance;
