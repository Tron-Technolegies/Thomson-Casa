import { useState } from "react";
import { FaPlus, FaFilePdf } from "react-icons/fa";
import RecordAdvanceModal from "./RecordAdvanceModal";

const rows = [
  {
    id: "ADV-0021",
    customer: "Apex Industries",
    amount: "₹1,50,000",
    method: "Bank Transfer",
    reference: "RTGS-20260701-004",
    date: "01 Jul 2026",
    note: "Advance for Q3 orders",
  },
  {
    id: "ADV-0020",
    customer: "Pinnacle Traders",
    amount: "₹2,00,000",
    method: "Cheque",
    reference: "CHQ-440012",
    date: "28 Jun 2026",
    note: "Pre-delivery advance",
  },
  {
    id: "ADV-0019",
    customer: "Nexus Solutions",
    amount: "₹1,00,000",
    method: "UPI",
    reference: "UPI-9801234500",
    date: "25 Jun 2026",
    note: "Project advance",
  },
];

function AdvanceTable() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl border border-[#00000026] overflow-hidden">
        {/* Header */}

        <div className="flex justify-between items-center p-5 border-b border-[#00000026]">
          <h2 className="font-semibold text-lg">Records</h2>

          <div className="flex gap-3">
            <button
              onClick={() => setOpenModal(true)}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg flex  cursor-pointer items-center gap-2"
            >
              <FaPlus size={12} />
              Record Advance
            </button>

            <button className="bg-red-100 text-red-500 px-4 py-2 rounded-lg flex items-center gap-2">
              <FaFilePdf size={12} />
              PDF
            </button>
          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="p-4">ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Reference</th>
                <th>Date</th>
                <th>Note</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[#00000026] hover:bg-gray-50">
                  <td className="p-4 text-blue-600">{row.id}</td>

                  <td>{row.customer}</td>

                  <td>{row.amount}</td>

                  <td>{row.method}</td>

                  <td>{row.reference}</td>

                  <td>{row.date}</td>

                  <td>{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <RecordAdvanceModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default AdvanceTable;
