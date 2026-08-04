import { FaWallet, FaPercentage, FaBalanceScale } from "react-icons/fa";

const icons = {
  balance: <FaWallet size={22} />,
  utilized: <FaPercentage size={22} />,
  available: <FaBalanceScale size={22} />,
};

const colors = {
  balance: "bg-blue-100 text-blue-600",
  utilized: "bg-orange-100 text-orange-600",
  available: "bg-green-100 text-green-600",
};

function BalanceStatCard({ title, value, subtitle, type }) {
  return (
    <div className="bg-white border border-[#00000026] rounded-2xl p-6 hover:shadow-md transition-all">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="uppercase text-sm text-gray-500 font-medium">{title}</h4>

          <h2 className="text-4xl font-bold mt-6 text-gray-800">{value}</h2>

          <p className="mt-5 text-sm text-green-600">{subtitle}</p>
        </div>

        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[type]}`}>
          {icons[type]}
        </div>
      </div>
    </div>
  );
}

export default BalanceStatCard;
