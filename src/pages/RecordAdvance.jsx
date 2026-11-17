
import React, { useState, useEffect } from "react";
import { FiCalendar, FiFilter } from "react-icons/fi";
import AdvanceStatCards from "../components/advance/AdvanceStatCards";
import AdvanceTable from "../components/advance/AdvanceTable";
import { api } from "../services/api";

export default function RecordAdvance() {
  const [advances, setAdvances] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date();
  const pastWeek = new Date(today);
  pastWeek.setDate(pastWeek.getDate() - 7);

  const [startDate, setStartDate] = useState(
    pastWeek.toISOString().split("T")[0]
  );

  const [endDate, setEndDate] = useState(
    today.toISOString().split("T")[0]
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const fetchAdvances = async () => {
    setLoading(true);

    try {
      const query = new URLSearchParams();

      if (startDate) {
        query.append("start_date", startDate);
      }

      if (endDate) {
        query.append("end_date", endDate);
      }

      const res = await api.get(
        `/admin/advances/?${query.toString()}`
      );

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
    fetchAdvances();
  }, [startDate, endDate]);

  return (
    <div className="w-full min-w-0 max-w-[1600px] mx-auto pb-10 overflow-x-hidden">

      {/* PAGE TITLE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5 sm:mb-8">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          Record Advance
        </h1>
      </div>

      {/* DATE FILTERS */}
      <div className="w-full min-w-0 bg-white border border-[#00000026] rounded-xl mb-6">
        <div
          className="p-3 sm:p-4 lg:p-6 flex justify-end items-center relative w-full min-w-0"
          ref={filterRef}
        >
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border font-medium transition text-sm sm:text-base ${
              isFilterOpen
                ? "bg-[#465C8F] text-white border-[#465C8F]"
                : "bg-white border-[#00000026] text-gray-700 hover:bg-gray-50"
            }`}
          >
            <FiFilter size={20} className="shrink-0" />
            Filters
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`shrink-0 transition-transform ${
                isFilterOpen ? "rotate-180" : ""
              }`}
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {isFilterOpen && (
            <div className="absolute top-full right-3 sm:right-4 lg:right-6 mt-2 w-[calc(100%-1.5rem)] sm:w-72 max-w-full min-w-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-5 z-20 max-h-[70vh] overflow-y-auto">
              <div className="space-y-5">

                {/* DATE RANGE */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    Date Range
                  </label>

                  <div className="flex flex-col gap-3">
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) =>
                        setStartDate(e.target.value)
                      }
                      className="w-full min-w-0 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 outline-none text-gray-700 text-sm focus:border-[#465C8F]"
                    />

                    <div className="text-center text-gray-400 font-bold text-xs">
                      TO
                    </div>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) =>
                        setEndDate(e.target.value)
                      }
                      className="w-full min-w-0 border border-gray-200 bg-gray-50 rounded-xl px-3 py-2 outline-none text-gray-700 text-sm focus:border-[#465C8F]"
                    />
                  </div>
                </div>

                {/* RESET DATES */}
                <div className="pt-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setStartDate(
                        pastWeek.toISOString().split("T")[0]
                      );
                      setEndDate(
                        today.toISOString().split("T")[0]
                      );
                      setIsFilterOpen(false);
                    }}
                    className="w-full py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
                  >
                    Reset Dates
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </div>

      {/* ADVANCE STATS */}
      <div className="w-full min-w-0 mb-6">
        <AdvanceStatCards advances={advances} />
      </div>

      {/* ADVANCE TABLE */}
      <div className="w-full min-w-0">
        <AdvanceTable
          advances={advances}
          loading={loading}
          onSuccess={fetchAdvances}
        />
      </div>
    </div>
  );
}
