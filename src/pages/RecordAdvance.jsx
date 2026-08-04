import DateRange from "../components/sales/DateRange";
import AdvanceStatCard from "../components/advances/AdvanceStatCard";
import AdvanceTable from "../components/advances/AdvanceTable";

function RecordAdvance() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Record Advances</h1>

        <DateRange />
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdvanceStatCard
          title="Payment Recorded"
          value="₹1,46,40,000"
          growth="+9.2% vs last month"
          type="yellow"
        />

        <AdvanceStatCard
          title="Advance Collected"
          value="₹1,46,40,000"
          growth="+8.1% vs last period"
          type="red"
        />
      </div>

      <AdvanceTable />
    </div>
  );
}

export default RecordAdvance;
