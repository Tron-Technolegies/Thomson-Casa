
import React, { useState, useEffect } from "react";
import { FiEdit2, FiX } from "react-icons/fi";
import { api } from "../../services/api";

export default function MarketPrices({ date, onPricesUpdated }) {
  const [categories, setCategories] = useState([]);
  const [dailyPrices, setDailyPrices] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [liveRate, setLiveRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPricesAndCategories = async () => {
    try {
      const url = date
        ? `/admin/daily-prices/?date=${date}`
        : "/admin/daily-prices/";

      const [priceRes, catRes] = await Promise.all([
        api.get(url),
        api.get("/admin/categories/")
      ]);

      if (catRes.success) {
        setCategories(catRes.categories || []);
      }

      if (priceRes.success && priceRes.prices) {
        setDailyPrices(priceRes.prices);
      }
    } catch (err) {
      console.error("Failed to fetch market prices:", err);
    }
  };

  useEffect(() => {
    fetchPricesAndCategories();
  }, [date]);

  // Get one common Live Rate from the existing category prices.
  const currentLiveRate =
    categories
      .map((cat) => dailyPrices[cat.name])
      .find((rate) => rate !== null && rate !== undefined && rate !== "") ?? "";

  const handleEditClick = () => {
    setLiveRate(
      currentLiveRate !== "" ? String(currentLiveRate) : ""
    );
    setError("");
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const numericRate = Number(liveRate);

    if (
      liveRate.trim() === "" ||
      !Number.isFinite(numericRate) ||
      numericRate <= 0
    ) {
      setError("Please enter a valid Live Rate.");
      return;
    }

    if (categories.length === 0) {
      setError("No categories available.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Apply the same Live Rate to every category.
      const prices = {};

      categories.forEach((cat) => {
        prices[cat.name] = numericRate;
      });

      const res = await api.post("/admin/daily-prices/update/", {
        prices,
        date: date
      });

      if (!res.success) {
        throw new Error(
          res.message || "Failed to save Live Rate."
        );
      }

      // Refresh displayed prices.
      await fetchPricesAndCategories();

      // Refresh parent component data.
      if (onPricesUpdated) {
        await onPricesUpdated();
      }

      setIsEditing(false);

    } catch (err) {
      console.error("Live Rate update error:", err);

      setError(
        err?.data?.message ||
        err?.message ||
        "Unable to update Live Rate."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Today's Market */}
      <div className="flex flex-col gap-3 h-full">

        <div className="flex justify-between items-center px-1">
          <span className="text-sm font-bold text-gray-400 tracking-wider uppercase">
            Today's Market
          </span>

          <button
            onClick={handleEditClick}
            className="text-blue-500 hover:text-blue-700 text-sm flex items-center gap-1 transition"
          >
            <FiEdit2 />
            Edit
          </button>
        </div>

        {/* Single Live Rate Card */}
        <div className="bg-white border border-[#00000026] rounded-xl p-5 shadow-sm flex flex-col justify-center h-full">

          <h4 className="text-xs font-bold text-gray-500 mb-2 uppercase">
            LIVE RATE
          </h4>

          <span className="text-orange-500 font-bold text-2xl">
            {currentLiveRate !== ""
              ? `₹${currentLiveRate}/kg`
              : "---"}
          </span>

          <p className="text-xs text-gray-400 mt-2">
            Common rate for all categories
          </p>

        </div>
      </div>

      {/* Edit Live Rate Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative">

            <button
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <FiX size={24} />
            </button>

            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Set Today's Live Rate
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              This rate will be applied to all chicken categories.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Live Rate (₹/kg)
                </label>

                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  required
                  value={liveRate}
                  onChange={(e) => setLiveRate(e.target.value)}
                  placeholder="Enter Live Rate"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-lg font-bold outline-none focus:border-[#4B5EAA] transition"
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-[#4B5EAA] py-3 font-semibold text-white hover:bg-[#3d4f92] disabled:opacity-70 mt-4 transition cursor-pointer"
              >
                {loading ? "Saving..." : "Save Live Rate"}
              </button>

            </form>
          </div>
        </div>
      )}
    </>
  );
}
