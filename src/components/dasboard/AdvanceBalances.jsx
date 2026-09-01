import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

function AdvanceBalances() {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/accounts/advances/balances/");
        if (res.success && res.balances) {
          // Sort by percent descending and take top 5 for the dashboard widget
          const top = res.balances.sort((a, b) => b.percent - a.percent).slice(0, 5);
          setBalances(top);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold mb-8">Advance Balances</h2>

      <div className="space-y-8 border-t p-6 border-[#00000026]">
        {loading ? (
          <p className="text-gray-500 text-center">Loading...</p>
        ) : balances.length === 0 ? (
          <p className="text-gray-500 text-center">No advance balances found.</p>
        ) : (
          balances.map((item) => (
            <div key={item.customer_name}>
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-800">{item.customer_name}</span>
                <span className="font-bold text-[#4B5EAA]">{item.percent}% Used</span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#4B5EAA] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(item.percent, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdvanceBalances;
