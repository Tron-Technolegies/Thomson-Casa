import { FiEdit2 } from "react-icons/fi";
import { useState } from "react";
import PurchasePricingModal from "./PurchasePricingModal";

const rows = [
  {
    order: "INV-9087-34",
    customer: "Raj Foods Pvt Ltd",
    delivery: "2026-10-08",
    chicken: "Dressed Chicken",
    weight: "250 Kg",
    status: "Delivered",
    price: "1500",
  },
  {
    order: "INV-9087-35",
    customer: "Fresh Mart",
    delivery: "2026-10-08",
    chicken: "Full Chicken",
    weight: "150 Kg",
    status: "Cutting",
    price: "1500",
  },
  {
    order: "INV-9087-36",
    customer: "Splyzone Pvt Ltd",
    delivery: "2026-10-08",
    chicken: "Dressed Chicken",
    weight: "150 Kg",
    status: "Ready",
    price: "1500",
  },
  {
    order: "INV-9087-37",
    customer: "Raj Foods Pvt Ltd",
    delivery: "2026-10-08",
    chicken: "Full Chicken",
    weight: "250 Kg",
    status: "Pending",
    price: "1500",
  },
];

const badge = {
  Delivered: "bg-green-100 text-green-600",
  Cutting: "bg-blue-100 text-blue-600",
  Ready: "bg-purple-100 text-purple-600",
  Pending: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-red-100 text-red-600",
};

function PurchaseTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  return (
    <>
      <div className="bg-white border border-[#00000026] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-5">Order No</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Delivery</th>
                <th>Chicken Type</th>
                <th>Weight</th>
                <th>Status</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="border-t border-[#00000026] hover:bg-gray-50">
                  <td className="p-5">{row.order}</td>
                  <td>{row.customer}</td>
                  <td>{row.delivery}</td>
                  <td>{row.delivery}</td>
                  <td>{row.chicken}</td>
                  <td>{row.weight}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${badge[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td>{row.price}</td>

                  <td>
                    <FiEdit2
                      className="cursor-pointer hover:text-indigo-600"
                      onClick={() => {
                        setSelectedRow(row);
                        setOpenModal(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PurchasePricingModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        row={selectedRow}
      />
    </>
  );
}

export default PurchaseTable;
