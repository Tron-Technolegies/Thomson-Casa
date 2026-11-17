
import React, { useState, useEffect } from "react";
import { api } from "../../services/api";

const badge = {
  Overdue: "bg-red-100 text-red-600",
  Partial: "bg-yellow-100 text-yellow-700",
  Unpaid: "bg-orange-100 text-orange-600",
};

function OutstandingPayments({ date }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = date
          ? `/accounts/outstanding/?date=${date}`
          : "/accounts/outstanding/";

        const res = await api.get(url);

        if (res.success && res.invoices) {
          setInvoices(res.invoices.slice(0, 5));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  const formatAmount = (amount) =>
    `₹${Number(amount || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const StatusBadge = ({ status }) => (
    <span
      className={`inline-flex items-center whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold ${
        badge[status] || badge.Unpaid
      }`}
    >
      {status}
    </span>
  );

  return (
    <div className="w-full min-w-0 max-w-full bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 lg:p-6 overflow-hidden">

      {/* Heading */}
      <div className="mb-5 sm:mb-6">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 break-words">
          Outstanding Payments
        </h2>
      </div>

      {/* MOBILE VIEW: Cards */}
      <div className="block md:hidden">
        {loading ? (
          <div className="text-center py-8 text-sm text-gray-500">
            Loading...
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-8 text-sm text-gray-500">
            No outstanding payments.
          </div>
        ) : (
          <div className="space-y-3">
            {invoices.map((item) => (
              <div
                key={item.id}
                className="w-full min-w-0 rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-4"
              >
                {/* Invoice and status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500 mb-1">
                      Invoice
                    </p>

                    <p className="text-sm sm:text-base font-bold text-[#4B5EAA] break-all">
                      {item.id}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <StatusBadge status={item.status} />
                  </div>
                </div>

                {/* Customer */}
                <div className="min-w-0">
                  <p className="text-xs text-gray-500 mb-1">
                    Customer
                  </p>

                  <p className="text-sm font-medium text-gray-800 break-words">
                    {item.customer}
                  </p>
                </div>

                {/* Outstanding amount */}
                <div className="border-t border-gray-200 pt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-500">
                    Balance Due
                  </span>

                  <span className="text-base sm:text-lg font-bold text-red-600 break-all">
                    {formatAmount(item.balance)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TABLET / DESKTOP VIEW: Table */}
      <div className="hidden md:block w-full min-w-0 overflow-x-auto">
        <table className="w-full min-w-[620px] text-sm text-left border-collapse">
          <thead className="text-gray-500">
            <tr>
              <th className="pb-4 pr-4 font-semibold whitespace-nowrap">
                Invoice
              </th>

              <th className="pb-4 px-3 font-semibold">
                Customer
              </th>

              <th className="pb-4 px-3 font-semibold text-right whitespace-nowrap">
                Amount
              </th>

              <th className="pb-4 pl-3 font-semibold text-center whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500"
                >
                  No outstanding payments.
                </td>
              </tr>
            ) : (
              invoices.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-[#00000026] hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pr-4 font-bold text-[#4B5EAA] whitespace-nowrap">
                    {item.id}
                  </td>

                  <td className="py-4 px-3 font-medium text-gray-800 break-words">
                    {item.customer}
                  </td>

                  <td className="py-4 px-3 font-bold text-red-600 text-right whitespace-nowrap">
                    {formatAmount(item.balance)}
                  </td>

                  <td className="py-4 pl-3 text-center">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OutstandingPayments;
