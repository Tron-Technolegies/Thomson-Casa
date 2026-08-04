import { IoClose } from "react-icons/io5";

function PurchasePricingModal({ open, onClose, row }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-[#00000026] px-6 py-5">
          <h2 className="text-3xl font-bold">Pricing</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-red-500 cursor-pointer">
            <IoClose size={28} />
          </button>
        </div>

        {/* Body */}

        <div className="p-6 space-y-6">
          {/* Customer */}

          <div>
            <label className="text-sm text-gray-500">Customer</label>

            <input
              type="text"
              value={row?.customer || ""}
              readOnly
              className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 outline-none"
            />
          </div>

          {/* Chicken Type */}

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-500">Chicken Type</label>

              <select className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3">
                <option>Dressed Chicken</option>

                <option>Full Chicken</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-500">Weight</label>

              <input
                type="text"
                defaultValue={row?.weight}
                className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3"
              />
            </div>
          </div>

          {/* Selling Price */}

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-500">Selling Price</label>

              <span className="text-xs text-gray-500">
                Market:
                <span className="text-orange-500">₹150/Kg</span> • Default:
                <span className="text-blue-500">₹120/Kg</span>
              </span>
            </div>

            <div className="flex gap-3">
              <input
                placeholder="₹-----"
                className="flex-1 border border-[#00000026] rounded-xl px-4 py-3"
              />

              <button className="px-6 rounded-xl bg-gray-100 hover:bg-gray-200">Use Default</button>
            </div>
          </div>

          {/* GST */}

          <div className="grid md:grid-cols-2 gap-5">
            <input
              placeholder="GST /-"
              className="border border-[#00000026] rounded-xl px-4 py-3"
            />

            <input placeholder="Total" className="border border-[#00000026] rounded-xl px-4 py-3" />
          </div>

          {/* Button */}

          <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white py-4 rounded-xl font-semibold transition cursor-pointer">
            Save Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchasePricingModal;
