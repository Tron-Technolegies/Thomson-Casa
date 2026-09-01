import React, { useState, useEffect } from "react";
import DateRange from "../components/sales/DateRange";
import AdvanceStatCard from "../components/advances/AdvanceStatCard";
import AdvanceTable from "../components/advances/AdvanceTable";
import { api } from "../services/api";

function RecordAdvance() {
  const [advances, setAdvances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const url = date ? `/accounts/advances/?date=${date}` : "/accounts/advances/";
      const res = await api.get(url);
      if (res.success) {
        setAdvances(res.advances || []);
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

  const totalCollected = advances.reduce((sum, a) => sum + (a.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Record Advances</h1>
        <DateRange date={date} setDate={setDate} />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdvanceStatCard
          title="Payment Recorded"
          value={advances.length.toString()}
          growth="Total advance transactions"
          type="yellow"
        />

        <AdvanceStatCard
          title="Advance Collected"
          value={`₹${totalCollected.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`}
          growth="Lifetime advance amount"
          type="red"
        />
      </div>

      <AdvanceTable advances={advances} loading={loading} onSuccess={fetchData} />
    </div>
  );
}

export default RecordAdvance;
