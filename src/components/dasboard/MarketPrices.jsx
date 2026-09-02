import React, { useState, useEffect } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { api } from "../../services/api";

export default function MarketPrices({ date }) {
  const [dailyPrices, setDailyPrices] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [pricesForm, setPricesForm] = useState({
    "Full Chicken": "",
    "Dressed Chicken": "",
    "Boneless Chicken": ""
  });
  const [loading, setLoading] = useState(false);

  const fetchPrices = async () => {
    try {
      const url = date ? `/admin/daily-prices/?date=${date}` : "/admin/daily-prices/";
      const priceRes = await api.get(url);
      if (priceRes.success && priceRes.prices) {
        setDailyPrices(priceRes.prices);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [date]);

  const handleEditClick = () => {
    setPricesForm({
      "Full Chicken": dailyPrices["Full Chicken"] || "",
      "Dressed Chicken": dailyPrices["Dressed Chicken"] || "",
      "Boneless Chicken": dailyPrices["Boneless Chicken"] || ""
    });
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/admin/daily-prices/update/", { 
        prices: pricesForm,
        date: date
      });
      if (res.success) {
        fetchPrices();
      }
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-3 h-full">
        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-bold text-gray-400 tracking-wider uppercase">Today's Market</span>
          <button onClick={handleEditClick} className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 transition">
            <FiEdit2 /> Edit
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-3 h-full">
          <div className="bg-white border border-[#00000026] rounded-xl p-4 shadow-sm flex flex-col justify-center transition-transform hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-xs font-bold text-gray-500 mb-1 uppercase">Dressed Chicken</h4>
            <span className="text-orange-500 font-bold text-lg">₹{dailyPrices["Dressed Chicken"] || "---"}/kg</span>
          </div>
          <div className="bg-white border border-[#00000026] rounded-xl p-4 shadow-sm flex flex-col justify-center transition-transform hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-xs font-bold text-gray-500 mb-1 uppercase">Full Chicken</h4>
            <span className="text-orange-500 font-bold text-lg">₹{dailyPrices["Full Chicken"] || "---"}/kg</span>
          </div>
          <div className="bg-white border border-[#00000026] rounded-xl p-4 shadow-sm flex flex-col justify-center col-span-2 transition-transform hover:-translate-y-1 hover:shadow-md">
            <h4 className="text-xs font-bold text-gray-500 mb-1 uppercase">Boneless Chicken</h4>
            <span className="text-orange-500 font-bold text-lg">₹{dailyPrices["Boneless Chicken"] || "---"}/kg</span>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setIsEditing(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
              <FiX size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Set Today's Market Price</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {Object.keys(pricesForm).map((type) => (
                <div key={type}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">{type} (₹/kg)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required
                    value={pricesForm[type]}
                    onChange={(e) => setPricesForm({...pricesForm, [type]: e.target.value})}
                    className="w-full rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-[#4B5EAA] transition"
                  />
                </div>
              ))}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full rounded-xl bg-[#4B5EAA] py-3 font-semibold text-white hover:bg-[#3d4f92] disabled:opacity-70 mt-4 transition cursor-pointer"
              >
                {loading ? "Saving..." : "Save Prices"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
