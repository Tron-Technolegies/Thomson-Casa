import { FaMoneyBillWave, FaHandHoldingUsd } from "react-icons/fa";

function AdvanceStatCard({ title, value, growth, type }) {
  const icon = type === "yellow" ? <FaMoneyBillWave /> : <FaHandHoldingUsd />;

  const bg = type === "yellow" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-500";

  return (
    <div className="bg-white rounded-2xl border border-[#00000026] p-6">
      <div className="flex justify-between">
        <div>
          <h4 className="uppercase text-sm text-gray-500">{title}</h4>

          <h2 className="text-4xl font-bold mt-6">{value}</h2>

          <p className="text-green-600 text-sm mt-6">{growth}</p>
        </div>

        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>{icon}</div>
      </div>
    </div>
  );
}

export default AdvanceStatCard;
