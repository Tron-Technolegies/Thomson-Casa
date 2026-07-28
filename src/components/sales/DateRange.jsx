import { FiCalendar, FiFilter } from "react-icons/fi";

function DateRange() {
  return (
    <div className="flex gap-3">
      <button className="flex items-center gap-2 border-[#00000026] border rounded-xl px-4 py-2 bg-[#EEF1F8] text-[#7A8AAA]">
        <FiCalendar />
        01 Jul 2026 — 09 Jul 2026
      </button>

      <button className="flex items-center gap-2 border-[#00000026] border rounded-xl px-4 py-2 bg-[#EEF1F8] text-[#7A8AAA]">
        <FiFilter />
        Filter
      </button>
    </div>
  );
}

export default DateRange;
