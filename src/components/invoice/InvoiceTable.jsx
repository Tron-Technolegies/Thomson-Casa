
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import InvoicePreviewModal from "./InvoicePreviewModal";

const badge = {
  Paid: "bg-green-100 text-green-700",
  Unpaid: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
};

function InvoiceTable({
  invoices = [],
  loading = false,
  onPaymentSuccess,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Status filter
  const [statusFilter, setStatusFilter] = useState("All");

  const statusOptions = [
    "All",
    "Paid",
    "Partial",
    "Unpaid",
  ];

  // Filter invoices based on selected status
  const filteredInvoices = invoices.filter((invoice) => {
    if (statusFilter === "All") return true;

    return (
      String(invoice.status || "").toLowerCase() ===
      statusFilter.toLowerCase()
    );
  });

  const formatAmount = (amount) =>
    Number(amount || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <>
      <div className="w-full min-w-0 max-w-full bg-white border border-[#00000026] rounded-2xl overflow-hidden">

        {/* STATUS FILTER HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-[#00000026]">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Invoice Records
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </p>
          </div>

          {/* Status Dropdown */}
          <div className="flex items-center gap-3 w-full sm:w-auto min-w-0">
            <div className="flex items-center gap-2 text-gray-600 shrink-0">
              <FiFilter size={18} />
              <span className="text-sm font-medium">
                Status
              </span>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-44 min-w-0 border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-medium bg-white text-gray-700 outline-none focus:ring-2 focus:ring-[#4B5EAA]/20 focus:border-[#4B5EAA] cursor-pointer"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "All"
                    ? "All Status"
                    : status}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MOBILE AND TABLET VIEW */}
        <div className="block 2xl:hidden w-full min-w-0 p-3 sm:p-4">
          {loading ? (
            <div className="w-full py-10 text-center text-gray-500 text-sm">
              Loading invoices...
            </div>
          ) : filteredInvoices.length === 0 ? (
            <div className="w-full py-10 text-center text-gray-500 text-sm">
              No {statusFilter === "All" ? "" : statusFilter.toLowerCase() + " "}invoices found.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 w-full">
              {filteredInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="w-full min-w-0 border border-gray-200 rounded-xl bg-white p-4 sm:p-5 hover:bg-gray-50 transition"
                >
                  {/* Invoice Number and Status */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-4 mb-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Invoice No
                      </p>

                      <p className="text-[#4B5EAA] font-bold break-all">
                        {invoice.id}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                        badge[invoice.status] || badge.Unpaid
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>

                  {/* Invoice Details */}
                  <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
                    {/* Customer */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Customer
                      </p>

                      <p className="font-medium text-gray-900 break-words">
                        {invoice.customer}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Date
                      </p>

                      <p className="text-gray-600 break-words">
                        {invoice.date}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Amount
                      </p>

                      <p className="font-medium text-gray-900 break-all">
                        ₹{formatAmount(invoice.amount)}
                      </p>
                    </div>

                    {/* Tax */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Tax
                      </p>

                      <p className="text-gray-500 break-all">
                        ₹{formatAmount(invoice.tax)}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Total
                      </p>

                      <p className="font-bold text-gray-900 break-all">
                        ₹{formatAmount(invoice.total)}
                      </p>
                    </div>

                    {/* Advance Used */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Advance Used
                      </p>

                      <p className="font-medium text-red-500 break-all">
                        ₹{formatAmount(invoice.advance)}
                      </p>
                    </div>

                    {/* Balance */}
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-400 uppercase mb-1">
                        Balance
                      </p>

                      <p className="font-bold text-green-600 break-all">
                        ₹{formatAmount(invoice.balance)}
                      </p>
                    </div>
                  </div>

                  {/* View Action */}
                  <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-400 uppercase">
                      Action
                    </span>

                    <button
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setOpenModal(true);
                      }}
                      className="bg-[#4B5EAA] text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3f518f] text-sm font-semibold transition-colors"
                    >
                      <FaFilePdf size={14} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden 2xl:block w-full min-w-0">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="px-3 py-4 w-[13%]">
                  Invoice No
                </th>
                <th className="px-3 py-4 w-[13%]">
                  Customer
                </th>
                <th className="px-3 py-4 w-[9%]">
                  Date
                </th>
                <th className="px-3 py-4 w-[10%]">
                  Amount
                </th>
                <th className="px-3 py-4 w-[8%]">
                  Tax
                </th>
                <th className="px-3 py-4 w-[10%]">
                  Total
                </th>
                <th className="px-3 py-4 w-[9%]">
                  Status
                </th>
                <th className="px-3 py-4 w-[10%]">
                  Advance Used
                </th>
                <th className="px-3 py-4 w-[10%]">
                  Balance
                </th>
                <th className="px-3 py-4 w-[8%] text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    Loading invoices...
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No {statusFilter === "All" ? "" : statusFilter.toLowerCase() + " "}invoices found.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className="border-t border-[#00000026] hover:bg-gray-50"
                  >
                    {/* Invoice No */}
                    <td className="px-3 py-5 text-[#4B5EAA] font-bold break-all">
                      {invoice.id}
                    </td>

                    {/* Customer */}
                    <td className="px-3 py-5 font-medium text-gray-900 break-words">
                      {invoice.customer}
                    </td>

                    {/* Date */}
                    <td className="px-3 py-5 text-gray-600 break-words">
                      {invoice.date}
                    </td>

                    {/* Amount */}
                    <td className="px-3 py-5 font-medium text-gray-900 break-all">
                      ₹{formatAmount(invoice.amount)}
                    </td>

                    {/* Tax */}
                    <td className="px-3 py-5 text-gray-500 break-all">
                      ₹{formatAmount(invoice.tax)}
                    </td>

                    {/* Total */}
                    <td className="px-3 py-5 font-bold text-gray-900 break-all">
                      ₹{formatAmount(invoice.total)}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-5">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${
                          badge[invoice.status] || badge.Unpaid
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>

                    {/* Advance Used */}
                    <td className="px-3 py-5 font-medium text-red-500 break-all">
                      ₹{formatAmount(invoice.advance)}
                    </td>

                    {/* Balance */}
                    <td className="px-3 py-5 font-bold text-green-600 break-all">
                      ₹{formatAmount(invoice.balance)}
                    </td>

                    {/* Action */}
                    <td className="px-3 py-5 text-center">
                      <button
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setOpenModal(true);
                        }}
                        className="bg-[#4B5EAA] text-white px-3 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-[#3f518f] mx-auto text-sm font-semibold transition-colors"
                      >
                        <FaFilePdf size={14} />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Existing Invoice Preview Modal */}
      <InvoicePreviewModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        invoice={selectedInvoice}
        onPaymentSuccess={onPaymentSuccess}
      />
    </>
  );
}

export default InvoiceTable;
