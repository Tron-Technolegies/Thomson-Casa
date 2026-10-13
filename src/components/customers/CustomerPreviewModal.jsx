
import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import {
  FiDownload,
  FiPrinter,
  FiShare2,
  FiChevronUp,
  FiChevronDown,
} from 'react-icons/fi';
import { api } from "../../services/api";

export default function CustomerPreviewModal({
  isOpen,
  onClose,
  customer,
}) {
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(true);
  const [isTransactionOpen, setIsTransactionOpen] = useState(true);
  const [detailedCustomer, setDetailedCustomer] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !customer?.id) {
      setDetailedCustomer(null);
      return;
    }

    let cancelled = false;

    const fetchCustomer = async () => {
      setLoading(true);

      try {
        // Fetch the detailed customer information and history.
        const [detailsResponse, accountsResponse] = await Promise.all([
          api.get(`/admin/customers/${customer.id}/`),
          api.get("/accounts/customers/"),
        ]);

        if (cancelled) return;

        // Support either a direct response or an Axios response.
        const detailsData = detailsResponse?.data ?? detailsResponse;
        const accountsData = accountsResponse?.data ?? accountsResponse;

        const detailsCustomer =
          detailsData?.customer ?? detailsData;

        const accountsCustomer = Array.isArray(accountsData?.customers)
          ? accountsData.customers.find(
              (item) => String(item.id) === String(customer.id)
            )
          : null;

        setDetailedCustomer({
          ...customer,
          ...(detailsCustomer || {}),
          ...(accountsCustomer || {}),
        });
      } catch (err) {
        console.error("Failed to fetch customer details:", err);

        if (!cancelled) {
          setDetailedCustomer(customer);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCustomer();

    return () => {
      cancelled = true;
    };
  }, [isOpen, customer?.id]);


  if (!isOpen || !customer) return null;

  const displayCustomer = detailedCustomer || customer;

  const purchaseHistory = displayCustomer.purchase_history || [];
  const transactionHistory = displayCustomer.transaction_history || [];

  const parseMoney = (value) => {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }

    const parsed = Number(
      String(value ?? "0").replace(/[^0-9.-]+/g, "")
    );

    return Number.isFinite(parsed) ? parsed : 0;
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === "") {
      return "—";
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return String(value);
    }

    return `₹${number.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const totalPurchaseAmount = purchaseHistory.reduce(
    (sum, purchase) => sum + parseMoney(purchase.amount),
    0
  );

  // Derive recent purchases from the available purchase history.
  // The backend-provided value takes priority when available.
  const today = new Date();
  today.setHours(23, 59, 59, 999);

  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const derivedRecentPurchases = purchaseHistory.reduce(
    (sum, purchase) => {
      const purchaseDate = new Date(purchase.date);

      if (
        !Number.isNaN(purchaseDate.getTime()) &&
        purchaseDate >= thirtyDaysAgo &&
        purchaseDate <= today
      ) {
        return sum + parseMoney(purchase.amount);
      }

      return sum;
    },
    0
  );

  const derivedTotalAdvances = transactionHistory
    .filter((transaction) => transaction.type === "Advance Payment")
    .reduce(
      (sum, transaction) => sum + parseMoney(transaction.amount),
      0
    );

  const derivedAdvanceUsed = transactionHistory
    .filter(
      (transaction) =>
        transaction.type === "Payment Received" &&
        transaction.mode === "Advance Applied"
    )
    .reduce(
      (sum, transaction) => sum + parseMoney(transaction.amount),
      0
    );

  const score = Number(displayCustomer.performance_score ?? 0);

  const performanceCategory =
    displayCustomer.performance_category ||
    (
      score >= 85
        ? "Excellent"
        : score >= 70
          ? "Good"
          : score >= 55
            ? "Watch Carefully"
            : score >= 40
              ? "Reduce Credit"
              : "High Risk"
    );

  const scoreColor =
    score >= 85
      ? "bg-green-50 text-green-700 border-green-200"
      : score >= 70
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : score >= 55
          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
          : "bg-red-50 text-red-700 border-red-200";

  const categoryColor =
    score >= 85
      ? "bg-green-100 text-green-700"
      : score >= 70
        ? "bg-blue-100 text-blue-700"
        : score >= 55
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700";

  const metrics = [
    {
      label: "Recent Purchases (30 days)",
      value:
        displayCustomer.recent_purchases ??
        derivedRecentPurchases,
      type: "currency",
    },
    {
      label: "Payment Performance",
      value: displayCustomer.payment_performance,
      type: "percentage",
    },
    {
      label: "Outstanding Balance",
      value: displayCustomer.outstanding_balance,
      type: "currency",
    },
    {
      label: "Total Advances",
      value:
        displayCustomer.total_advances ??
        derivedTotalAdvances,
      type: "currency",
    },
    {
      label: "Advance Used",
      value:
        displayCustomer.total_advance_used ??
        derivedAdvanceUsed,
      type: "currency",
    },
    {
      label: "Advance Balance",
      value:
        displayCustomer.advance_balance ??
        (
          displayCustomer.total_advances !== undefined
            ? parseMoney(displayCustomer.total_advances) -
              parseMoney(displayCustomer.total_advance_used)
            : derivedTotalAdvances - derivedAdvanceUsed
        ),
      type: "currency",
    },
  ];

  const handlePrint = () => {
    setIsPurchaseOpen(true);
    setIsTransactionOpen(true);

    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleShare = async () => {
    const shareText = `Customer Details
Name: ${displayCustomer.customer_name || "N/A"}
Company: ${displayCustomer.company_name || "N/A"}
Phone: ${displayCustomer.phone || "N/A"}
Address: ${displayCustomer.address || "N/A"}
Performance Score: ${score}/100
Performance Category: ${performanceCategory}
Outstanding Balance: ${formatCurrency(displayCustomer.outstanding_balance)}
Advance Balance: ${formatCurrency(displayCustomer.advance_balance)}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Customer Details",
          text: shareText,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error sharing customer details:", err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Customer details copied to clipboard!");
      } catch (err) {
        console.error("Could not copy customer details:", err);
        alert("Unable to copy customer details.");
      }
    }
  };

  return (
    <>
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }

            #printable-modal,
            #printable-modal * {
              visibility: visible;
            }

            #printable-modal {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: auto;
              max-height: none !important;
              overflow: visible !important;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }

            .no-print {
              display: none !important;
            }
          }
        `}
      </style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <div
          id="printable-modal"
          className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between border-b border-gray-100 bg-white px-8 py-6">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:mb-0">
              Customer Details
            </h2>

            <div className="no-print flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FiDownload />
                PDF / Print
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
              >
                <FiShare2 />
                Share
              </button>

              <button
                onClick={onClose}
                className="ml-2 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              >
                <IoClose size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-6 p-8">
            {loading ? (
              <div className="py-10 text-center font-medium text-gray-500">
                Loading customer details...
              </div>
            ) : (
              <>
                {/* Customer Information */}
                <div className="relative rounded-2xl bg-[#F8F9FB] p-6">
                  <h3 className="mb-1 text-xl font-bold text-gray-900">
                    {displayCustomer.customer_name || "N/A"}
                  </h3>

                  <p className="mb-1 text-sm text-gray-600">
                    {displayCustomer.company_name || "N/A"},{" "}
                    {displayCustomer.address || "No Address"}
                  </p>

                  <p className="mb-1 text-sm text-gray-600">
                    {displayCustomer.phone || "N/A"} |{" "}
                    {displayCustomer.email || "N/A"}
                  </p>

                  <p className="text-sm text-gray-600">
                    GST: {displayCustomer.gst_number || "N/A"}
                  </p>

                  {/* Performance Score */}
                  <div className="mt-5 flex flex-wrap items-center gap-3 sm:absolute sm:right-6 sm:top-6 sm:mt-0 sm:flex-col sm:items-end">
                    <span className="text-xs font-semibold uppercase text-gray-500">
                      Performance Score
                    </span>

                    <div
                      className={`rounded-xl border px-4 py-2 text-lg font-bold ${scoreColor}`}
                    >
                      {score}
                      <span className="ml-1 text-xs opacity-70">
                        / 100
                      </span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${categoryColor}`}
                    >
                      {performanceCategory}
                    </span>
                  </div>
                </div>

                {/* Financial Overview */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-gray-200 bg-white p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {metric.label}
                      </p>

                      <p className="mt-2 text-xl font-bold text-gray-900">
                        {metric.value === null ||
                        metric.value === undefined ||
                        metric.value === ""
                          ? "—"
                          : metric.type === "percentage"
                            ? `${parseMoney(metric.value).toLocaleString(
                                "en-IN",
                                { maximumFractionDigits: 2 }
                              )}%`
                            : formatCurrency(metric.value)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Purchase History */}
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <div
                    className="flex cursor-pointer select-none items-center justify-between bg-[#F8F9FB] px-6 py-4"
                    onClick={() => setIsPurchaseOpen(!isPurchaseOpen)}
                  >
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">
                        Purchase History
                      </h4>

                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                        {purchaseHistory.length} orders
                      </span>
                    </div>

                    {isPurchaseOpen ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </div>

                  {isPurchaseOpen && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="border-y border-gray-100 text-xs font-semibold uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-3">Invoice</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Item</th>
                            <th className="px-6 py-3">Weight</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-center">Status</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {purchaseHistory.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-6 py-4 text-center text-gray-500"
                              >
                                No purchase history.
                              </td>
                            </tr>
                          ) : (
                            purchaseHistory.map((row, index) => (
                              <tr
                                key={row.id ?? row.invoice ?? index}
                                className="hover:bg-gray-50"
                              >
                                <td className="px-6 py-4 font-medium text-[#4B5EAA]">
                                  {row.invoice || "—"}
                                </td>

                                <td className="px-6 py-4">
                                  {row.date || "—"}
                                </td>

                                <td className="px-6 py-4">
                                  {row.item || "—"}
                                </td>

                                <td className="px-6 py-4">
                                  {row.weight ?? "—"}
                                </td>

                                <td className="px-6 py-4 text-right font-semibold text-gray-900">
                                  {formatCurrency(row.amount)}
                                </td>

                                <td className="px-6 py-4 text-center">
                                  <span
                                    className={`rounded px-2 py-1 text-xs font-semibold ${
                                      row.status === "Pending" ||
                                      row.status === "Unpaid"
                                        ? "bg-orange-100 text-orange-600"
                                        : row.status === "Partial"
                                          ? "bg-yellow-100 text-yellow-700"
                                          : "bg-green-100 text-green-700"
                                    }`}
                                  >
                                    {row.status || "—"}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>

                        {purchaseHistory.length > 0 && (
                          <tfoot className="border-t border-gray-200 bg-gray-50">
                            <tr>
                              <td
                                colSpan={4}
                                className="px-6 py-4 font-medium text-gray-500"
                              >
                                Total ({purchaseHistory.length} purchases)
                              </td>

                              <td className="px-6 py-4 text-right font-bold text-gray-900">
                                {formatCurrency(totalPurchaseAmount)}
                              </td>

                              <td />
                            </tr>
                          </tfoot>
                        )}
                      </table>
                    </div>
                  )}
                </div>

                {/* Transaction History */}
                <div className="overflow-hidden rounded-2xl border border-gray-200">
                  <div
                    className="flex cursor-pointer select-none items-center justify-between bg-[#F8F9FB] px-6 py-4"
                    onClick={() =>
                      setIsTransactionOpen(!isTransactionOpen)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">
                        Transaction History
                      </h4>

                      <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
                        {transactionHistory.length} entries
                      </span>
                    </div>

                    {isTransactionOpen ? (
                      <FiChevronUp className="text-gray-500" />
                    ) : (
                      <FiChevronDown className="text-gray-500" />
                    )}
                  </div>

                  {isTransactionOpen && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-gray-600">
                        <thead className="border-y border-gray-100 text-xs font-semibold uppercase text-gray-400">
                          <tr>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Reference</th>
                            <th className="px-6 py-3">Mode</th>
                            <th className="px-6 py-3 text-right">Amount</th>
                            <th className="px-6 py-3 text-right">Balance</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {transactionHistory.length === 0 ? (
                            <tr>
                              <td
                                colSpan={6}
                                className="px-6 py-4 text-center text-gray-500"
                              >
                                No transaction history.
                              </td>
                            </tr>
                          ) : (
                            transactionHistory.map((row, index) => {
                              let typeStyle =
                                "rounded-full border px-3 py-1";

                              if (row.type === "Invoice Raised") {
                                typeStyle +=
                                  " border-blue-200 bg-blue-50 text-blue-600";
                              } else if (
                                row.type === "Advance Payment"
                              ) {
                                typeStyle +=
                                  " border-purple-200 bg-purple-50 text-purple-600";
                              } else if (
                                row.type === "Payment Received"
                              ) {
                                typeStyle +=
                                  " border-green-200 bg-green-50 text-green-600";
                              } else {
                                typeStyle +=
                                  " border-gray-200 bg-gray-50 text-gray-600";
                              }

                              return (
                                <tr
                                  key={row.id ?? row.reference ?? index}
                                  className="hover:bg-gray-50"
                                >
                                  <td className="whitespace-nowrap px-6 py-4">
                                    {row.date || "—"}
                                  </td>

                                  <td className="whitespace-nowrap px-6 py-4">
                                    <span
                                      className={`text-xs font-semibold ${typeStyle}`}
                                    >
                                      {row.type || "—"}
                                    </span>
                                  </td>

                                  <td className="whitespace-nowrap px-6 py-4 font-medium text-[#4B5EAA]">
                                    {row.reference || "—"}
                                  </td>

                                  <td className="px-6 py-4">
                                    {row.mode || "—"}
                                  </td>

                                  <td
                                    className={`whitespace-nowrap px-6 py-4 text-right font-semibold ${
                                      row.amountColor || "text-gray-900"
                                    }`}
                                  >
                                    {row.amount ?? "—"}
                                  </td>

                                  <td className="whitespace-nowrap px-6 py-4 text-right font-medium text-gray-900">
                                    {row.balance ?? "—"}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}