import React from "react";
import DateRange from "../components/sales/DateRange";
import SalesStatCard from "../components/sales/SalesStatCard";

export default function CustomerPurchase() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-bold">Customer Purchase Report</h1>

        <div className="flex gap-3">
          <DateRange />
        </div>

        <SalesStatCard
          title="Total Revenue"
          value="₹1,46,40,000"
          growth="+9.2% vs last month"
          positive
        />
        <SalesStatCard title="Orders" value="379" growth="+8.1% vs last period" positive />
      </div>
    </div>
  );
}
