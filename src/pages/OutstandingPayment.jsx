import React, { useState, useEffect } from "react";
import DateRange from "../components/sales/DateRange";
import OutstandingStatCard from "../components/outstanding/OutstandingStatCard";
import OutstandingTable from "../components/outstanding/OutstandingTable";
import { api } from "../services/api";

function OutstandingPayment() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({
    total_outstanding: 0,
    overdue_amount: 0,
    due_this_week_count: 0
  });
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = date ? `/accounts/outstanding/?date=${date}` : "/accounts/outstanding/";
      const res = await api.get(url);
      if (res.success) {
        setInvoices(res.invoices || []);
        setStats(res.stats || {
          total_outstanding: 0,
          overdue_amount: 0,
          due_this_week_count: 0
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold">Outstanding Payment</h1>
        <DateRange date={date} setDate={setDate} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OutstandingStatCard
          title="Total Outstanding"
          value={`₹${stats.total_outstanding.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          growth={`${invoices.length} unpaid invoices`}
          color="yellow"
        />

        <OutstandingStatCard
          title="Overdue Amount"
          value={`₹${stats.overdue_amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          growth="Action required"
          color="red"
        />

        <OutstandingStatCard
          title="Due This Week"
          value={stats.due_this_week_count.toString()}
          growth="invoices due soon"
          color="blue"
        />
      </div>

      {/* Table */}
      <OutstandingTable invoices={invoices} loading={loading} onPaymentSuccess={fetchData} />
    </div>
  );
}

export default OutstandingPayment;
