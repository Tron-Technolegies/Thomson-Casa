import { BsCart3 } from "react-icons/bs";

function PurchaseStatCard({ title, value, growth }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-7">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="uppercase text-gray-500 font-medium">{title}</h3>

          <h2 className="text-3xl font-bold mt-8">{value}</h2>

          <p className="mt-8 text-green-600">{growth}</p>
        </div>

        <div className="bg-green-100 p-3 rounded-xl">
          <BsCart3 className="text-green-600" size={24} />
        </div>
      </div>
    </div>
  );
}

export default PurchaseStatCard;
