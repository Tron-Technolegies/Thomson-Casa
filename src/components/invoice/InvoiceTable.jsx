import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import InvoicePreviewModal from "./InvoicePreviewModal";

const invoices = [
  {
    id: "INV-2026-0461",
    customer: "Apex Industries",
    date: "09 Jul 2026",
    amount: "₹84,000",
    tax: "₹8,400",
    total: "₹92,400",
    status: "Paid",
    advance: "₹84,000",
    balance: "₹66,000",
  },
  {
    id: "INV-2026-0460",
    customer: "Pinnacle Traders",
    date: "09 Jul 2026",
    amount: "₹1,13,000",
    tax: "₹11,300",
    total: "₹1,24,300",
    status: "Unpaid",
    advance: "₹74,000",
    balance: "₹66,000",
  },
  {
    id: "INV-2026-0459",
    customer: "Vertex Corp",
    date: "08 Jul 2026",
    amount: "₹37,500",
    tax: "₹3,750",
    total: "₹41,250",
    status: "Paid",
    advance: "₹24,000",
    balance: "₹66,000",
  },
  {
    id: "INV-2026-0458",
    customer: "Meridian Ltd",
    date: "08 Jul 2026",
    amount: "₹56,000",
    tax: "₹5,600",
    total: "₹61,600",
    status: "Partial",
    advance: "₹34,000",
    balance: "₹66,000",
  },
];

const badge = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
};

function InvoiceTable() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <>
      <div className="bg-white border border-[#00000026] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500 text-sm">
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Tax</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Advance Used</th>
                <th className="px-6 py-4">Balance</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-t border-[#00000026] hover:bg-gray-50">
                  <td className="px-6 py-5 text-blue-600 font-medium">{invoice.id}</td>

                  <td className="px-6">{invoice.customer}</td>

                  <td className="px-6">{invoice.date}</td>

                  <td className="px-6">{invoice.amount}</td>

                  <td className="px-6">{invoice.tax}</td>

                  <td className="px-6 font-semibold">{invoice.total}</td>

                  <td className="px-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${badge[invoice.status]}`}
                    >
                      {invoice.status}
                    </span>
                  </td>

                  <td className="px-6">{invoice.advance}</td>

                  <td className="px-6 text-green-600 font-semibold">{invoice.balance}</td>

                  <td className="px-6">
                    <button
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setOpenModal(true);
                      }}
                      className="bg-[#4B5EAA] text-white px-3 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:bg-[#3f518f]"
                    >
                      <FaFilePdf size={12} />
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoicePreviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        invoice={selectedInvoice}
      />
    </>
  );
}

export default InvoiceTable;
