import PurchaseStatCard from "../components/purchase/PurchaseStatCard";
import MarketPriceCard from "../components/purchase/MarketPriceCard";
import PurchaseTable from "../components/purchase/PurchaseTable";
import DateRange from "../components/sales/DateRange";

function CustomerPurchase() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold">Customer Purchase Report</h1>

        <DateRange />
      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PurchaseStatCard
          title="Total Purchases"
          value="₹ 1,46,40,000"
          growth="+9.2% vs last month"
        />

        <PurchaseStatCard title="Orders" value="379" growth="+8.1% vs last period" />

        <div className="space-y-4">
          <MarketPriceCard title="Market Price — Dressed" price="₹150/kg" />

          <MarketPriceCard title="Market Price — Full" price="₹130/kg" />
        </div>
      </div>

      <PurchaseTable />
    </div>
  );
}

export default CustomerPurchase;
