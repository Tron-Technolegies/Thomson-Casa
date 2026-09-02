import React, { useState, useEffect } from "react";
import PurchaseStatCard from "../components/purchase/PurchaseStatCard";
import MarketPrices from "../components/dasboard/MarketPrices";
import PurchaseTable from "../components/purchase/PurchaseTable";
import DateRange from "../components/sales/DateRange";
import { api } from "../services/api";

function CustomerPurchase() {
  const [orders, setOrders] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const url = date ? `/accounts/orders/?date=${date}` : "/accounts/orders/";
      const [ordersRes, priceRes] = await Promise.all([
        api.get(url),
        api.get("/accounts/reports/daily-prices/")
      ]);
      
      if (ordersRes.success) setOrders(ordersRes.orders || []);
      if (priceRes.success) setPrices(priceRes.prices || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const totalWeight = orders.reduce((sum, o) => sum + (o.total_weight || 0), 0);
  const totalOrders = orders.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold">Customer Purchase Report</h1>
        <DateRange date={date} setDate={setDate} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <PurchaseStatCard
          title="Total Weight"
          value={`${totalWeight.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} Kg`}
          growth="Total weight pending pricing"
        />

        <PurchaseStatCard 
          title="Orders" 
          value={totalOrders.toString()} 
          growth="Orders ready for accounts" 
        />

        <div className="h-full">
          <MarketPrices date={date} />
        </div>
      </div>

      <PurchaseTable orders={orders} loading={loading} dailyPrices={prices} onPricingSaved={fetchData} />
    </div>
  );
}

export default CustomerPurchase;
