import React from "react";

function StatCard({ title, value, subtitle, color = "text-green-500" }) {
  return (
    <div className="bg-white rounded-2xl border border-[#00000026] p-6 hover:shadow-lg transition duration-300">
      <h4 className="text-gray-500 text-sm uppercase tracking-wide font-medium">{title}</h4>

      <h2 className="text-3xl font-bold text-gray-800 mt-5">{value}</h2>

      <p className={`mt-6 text-sm font-medium ${color}`}>{subtitle}</p>
    </div>
  );
}

export default StatCard;
