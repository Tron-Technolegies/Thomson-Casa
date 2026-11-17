
import { useState } from "react";
import { FaPlus, FaFilePdf } from "react-icons/fa";
import RecordAdvanceModal from "./RecordAdvanceModal";
import { BASE_URL } from "../../services/api";

function AdvanceTable({
  advances = [],
  loading = false,
  onSuccess,
}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-[#00000026] overflow-hidden">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-5 border-b border-[#00000026]">
          <h2 className="font-semibold text-lg text-gray-800">
            Records
          </h2>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="flex-1 sm:flex-none min-w-0 bg-indigo-700 hover:bg-indigo-800 text-white px-3 sm:px-4 py-2 rounded-lg flex cursor-pointer items-center justify-center gap-2 font-medium transition text-sm sm:text-base"
            >
              <FaPlus size={12} className="shrink-0" />
              <span>Record Advance</span>
            </button>

            <button
              type="button"
              onClick={() =>
                window.open(
                  `${BASE_URL}/accounts/advances/pdf/`,
                  "_blank"
                )
              }
              className="shrink-0 flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition cursor-pointer"
            >
              <FaFilePdf size={12} />
              PDF
            </button>
          </div>
        </div>

        {/* MOBILE AND TABLET VIEW */}
        <div className="block xl:hidden w-full min-w-0 p-3 sm:p-4">

          {loading ? (
            <div className="w-full py-10 text-center text-gray-500 text-sm">
              Loading advances...
            </div>
          ) : advances.length === 0 ? (
            <div className="w-full py-10 text-center text-gray-500 text-sm">
              No advances recorded.
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 gap-3">
              {advances.map((row) => (
                <div
                  key={row.id}
                  className="w-full min-w-0 border border-gray-200 rounded-xl bg-white p-4 sm:p-5 hover:bg-gray-50 transition"
                >

                  {/* ID and Amount */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-gray-100 pb-3 mb-4">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        ID
                      </p>

                      <p className="font-bold text-blue-600 break-all">
                        {row.id}
                      </p>
                    </div>

                    <div className="min-w-0 text-right">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Amount
                      </p>

                      <p className="font-bold text-green-600 break-all">
                        ₹
                        {row.amount.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Remaining details */}
                  <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">

                    {/* Customer */}
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Customer
                      </p>

                      <p className="font-semibold text-gray-800 break-words">
                        {row.customer}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Payment Method
                      </p>

                      <p className="text-gray-600 font-medium break-words">
                        {row.payment_method}
                      </p>
                    </div>

                    {/* Reference */}
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Reference
                      </p>

                      <p className="text-gray-500 text-sm break-all">
                        {row.reference_no || "-"}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Date
                      </p>

                      <p className="text-gray-600 text-sm break-words">
                        {row.date}
                      </p>
                    </div>

                    {/* Note */}
                    <div className="min-w-0 min-[420px]:col-span-2 md:col-span-2">
                      <p className="text-xs text-gray-400 font-semibold mb-1">
                        Note
                      </p>

                      <p className="text-gray-500 text-sm break-words whitespace-pre-wrap">
                        {row.note || "-"}
                      </p>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP TABLE - SAME ORIGINAL UI */}
        <div className="hidden xl:block w-full min-w-0">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left text-gray-500">
                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[12%]">
                  ID
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[17%]">
                  Customer
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[13%]">
                  Amount
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[17%]">
                  Payment Method
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[15%]">
                  Reference
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[12%]">
                  Date
                </th>

                <th className="p-3 2xl:p-4 font-semibold uppercase tracking-wider text-xs w-[14%]">
                  Note
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    Loading advances...
                  </td>
                </tr>
              ) : advances.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    No advances recorded.
                  </td>
                </tr>
              ) : (
                advances.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-[#00000026] hover:bg-gray-50 transition"
                  >
                    <td className="p-3 2xl:p-4 font-bold text-blue-600 break-all">
                      {row.id}
                    </td>

                    <td className="p-3 2xl:p-4 font-semibold text-gray-800 break-words">
                      {row.customer}
                    </td>

                    <td className="p-3 2xl:p-4 font-bold text-green-600 break-all">
                      ₹
                      {row.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>

                    <td className="p-3 2xl:p-4 text-gray-600 font-medium break-words">
                      {row.payment_method}
                    </td>

                    <td className="p-3 2xl:p-4 text-gray-500 break-all">
                      {row.reference_no || "-"}
                    </td>

                    <td className="p-3 2xl:p-4 text-gray-600 break-words">
                      {row.date}
                    </td>

                    <td className="p-3 2xl:p-4 text-gray-500 break-words whitespace-pre-wrap">
                      {row.note || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Advance Modal */}
      <RecordAdvanceModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={onSuccess}
      />
    </>
  );
}

export default AdvanceTable;
