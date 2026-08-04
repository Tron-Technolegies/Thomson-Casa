function MarketPriceCard({ title, price }) {
  return (
    <div className="bg-white border border-[#00000026] rounded-2xl p-5">
      <h3 className="text-sm uppercase font-semibold text-gray-600">{title}</h3>

      <div className="mt-6 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
        <span className="text-orange-500 font-semibold">{price}</span>
      </div>
    </div>
  );
}

export default MarketPriceCard;
