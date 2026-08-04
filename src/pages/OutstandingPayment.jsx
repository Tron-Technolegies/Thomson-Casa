import DateRange from "../components/sales/DateRange";
import OutstandingStatCard from "../components/outstanding/OutstandingStatCard";
import OutstandingTable from "../components/outstanding/OutstandingTable";

function OutstandingPayment() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold">Outstanding Payment</h1>

        <DateRange />
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OutstandingStatCard
          title="Total Outstanding"
          value="₹1,46,40,000"
          growth="+9.2% vs last month"
          color="yellow"
        />

        <OutstandingStatCard
          title="Overdue Amount"
          value="₹1,46,40,000"
          growth="+8.1% vs last period"
          color="red"
        />

        <OutstandingStatCard
          title="Due This Week"
          value="₹1,46,40,000"
          growth="4 invoices due soon"
          color="blue"
        />
      </div>

      {/* Table */}

      <OutstandingTable />
    </div>
  );
}

export default OutstandingPayment;
