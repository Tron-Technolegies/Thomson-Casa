import React, { useState, useEffect } from "react";
import BalanceStatCard from "../components/advanceBalance/BalanceStatCard";
import BalanceTable from "../components/advanceBalance/BalanceTable";
import DateRange from "../components/sales/DateRange";
import { api } from "../services/api";

function AdvanceBalance() {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = date ? `/accounts/advances/balances/?date=${date}` : "/accounts/advances/balances/";
        const res = await api.get(url);
        if (res.success) {
          setBalances(res.balances || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [date]);

  const totalReceived = balances.reduce((sum, b) => sum + (b.received || 0), 0);
  const totalConsumed = balances.reduce((sum, b) => sum + (b.consumed || 0), 0);
  const totalBalance = balances.reduce((sum, b) => sum + (b.balance || 0), 0);
  const utilization = totalReceived > 0 ? ((totalConsumed / totalReceived) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Advance Balance</h1>
          <p className="text-gray-500 mt-1">Customer advance utilization summary</p>
        </div>
        <DateRange date={date} setDate={setDate} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BalanceStatCard
          title="Total Advance Received"
          value={`₹${totalReceived.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          subtitle="Lifetime"
          type="balance"
        />

        <BalanceStatCard
          title="Utilized"
          value={`₹${totalConsumed.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          subtitle={`${utilization}% Utilized`}
          type="utilized"
        />

        <BalanceStatCard
          title="Available"
          value={`₹${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          subtitle="Remaining Balance"
          type="available"
        />
      </div>

      {/* Table */}
      <BalanceTable balances={balances} loading={loading} />
    </div>
  );
}

export default AdvanceBalance;
