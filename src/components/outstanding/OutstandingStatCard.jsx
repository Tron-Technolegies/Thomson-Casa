import { FaMoneyBillWave, FaExclamationCircle, FaClock } from "react-icons/fa";

const icons = {
  yellow: <FaMoneyBillWave className="text-yellow-500" />,
  red: <FaExclamationCircle className="text-red-500" />,
  blue: <FaClock className="text-blue-500" />,
};

function OutstandingStatCard({ title, value, growth, color }) {
  return (
    <div className="bg-white border border-[#00000026] rounded-2xl p-6">
      <div className="flex justify-between">
        <div>
          <h4 className="uppercase text-sm text-gray-500">{title}</h4>

          <h2 className="text-4xl font-bold mt-6">{value}</h2>

          <p className="mt-6 text-green-600 text-sm">{growth}</p>
        </div>

        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
          {icons[color]}
        </div>
      </div>
    </div>
  );
}

export default OutstandingStatCard;
