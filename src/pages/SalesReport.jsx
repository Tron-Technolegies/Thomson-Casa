import DateRange from "../components/sales/DateRange";
import FilterBar from "../components/sales/FilterBar";
import RecentTransactions from "../components/sales/RecentTransactions";
import RevenueGraph from "../components/sales/RevenueGraph";
import SalesStatCard from "../components/sales/SalesStatCard";

function SalesReport() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">Sales Report</h1>

        <div className="flex gap-3">
          <DateRange />
        </div>
      </div>

      <FilterBar />

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SalesStatCard
          title="Total Revenue"
          value="₹1,38,600"
          growth="+12.4% vs last period"
          positive
        />

        <SalesStatCard title="Orders" value="379" growth="+8.1% vs last period" positive />
      </div>

      <RevenueGraph />

      <RecentTransactions />
    </div>
  );
}

export default SalesReport;
