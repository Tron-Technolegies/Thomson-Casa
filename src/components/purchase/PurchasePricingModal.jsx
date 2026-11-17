
import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "../../services/api";

function PurchasePricingModal({
  open,
  onClose,
  order,
  dailyPrices,
  onSuccess,
}) {
  const [gstType, setGstType] = useState("percentage");
  const [gstInput, setGstInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [pricingMode, setPricingMode] = useState("live_rate");
  const [customerLiveRate, setCustomerLiveRate] = useState(null);
  const [liveRateOverrides, setLiveRateOverrides] = useState({});
  const [meatRateOverrides, setMeatRateOverrides] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);
  const [customerRatesError, setCustomerRatesError] = useState(false);

  // Round values to 2 decimal places
  const roundMoney = (value) =>
    Math.round((value + Number.EPSILON) * 100) / 100;

  // Normalize chicken type names for matching
  const normalizeType = (type) =>
    String(type || "").trim().toLowerCase();

  // Get daily live rate for a chicken type
const getTodayLocalDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

    const getDailyLiveRate = (chickenType) => {
      if (!dailyPrices) return null;

      const today = getTodayLocalDate();
      const normalizedChickenType = normalizeType(chickenType);

      if (Array.isArray(dailyPrices)) {
        const found = dailyPrices.find(
          (item) =>
            normalizeType(item.chicken_type) === normalizedChickenType &&
            item.date === today
        );

        if (!found) return null;

        const rate = Number(found.price);
        return Number.isFinite(rate) && rate > 0 ? rate : null;
      }

      if (dailyPrices.date !== today) return null;

      const prices = dailyPrices.prices || {};

      const matchingEntry = Object.entries(prices).find(
        ([key]) => normalizeType(key) === normalizedChickenType
      );

      if (!matchingEntry) return null;

      const value = matchingEntry[1];
      const rate = Number(
        typeof value === "object" ? value?.price : value
      );

      return Number.isFinite(rate) && rate > 0 ? rate : null;
    };

      const getCustomerLiveRate = (chickenType) => {
        const rate = Number(customerLiveRate);

        return customerLiveRate !== null &&
          customerLiveRate !== "" &&
          Number.isFinite(rate) &&
          rate > 0
          ? rate
          : null;
      };


  // Calculate pricing for each order item
const pricingRows = (order?.items || []).map((item) => {
  const dailyLiveRate = getDailyLiveRate(item.chicken_type);
  const customerLiveRate = getCustomerLiveRate(item.chicken_type);

  // Customer rate takes priority over the global daily rate.
  const defaultLiveRate =
    customerLiveRate !== null
      ? customerLiveRate
      : dailyLiveRate;

  // Use the manually edited rate if one exists.
  const hasOverride = Object.prototype.hasOwnProperty.call(
    liveRateOverrides,
    item.id
  );

  const liveRate = hasOverride
    ? Number(liveRateOverrides[item.id])
    : defaultLiveRate;

  const weight = Number(item.weight);
  const yieldPercentage = Number(item.approx_yield_percentage);

  const validLiveRate =
    Number.isFinite(liveRate) && liveRate > 0;

  const validYield =
    Number.isFinite(yieldPercentage) &&
    yieldPercentage > 0 &&
    yieldPercentage <= 100;

  const validWeight =
    Number.isFinite(weight) && weight > 0;


  let autoMeatRate = null;

  if (validLiveRate && validYield) {
    autoMeatRate = roundMoney(
      (liveRate * 100) / yieldPercentage
    );
  }

  const hasMeatOverride = Object.prototype.hasOwnProperty.call(
    meatRateOverrides,
    item.id
  );

  const meatRate = hasMeatOverride
    ? Number(meatRateOverrides[item.id])
    : autoMeatRate;


  const selectedRate =
    pricingMode === "live_rate" ? liveRate : meatRate;

  const validSelectedRate =
    selectedRate !== null &&
    Number.isFinite(selectedRate) &&
    selectedRate > 0;

  const subtotal =
    validSelectedRate && validWeight
      ? roundMoney(weight * selectedRate)
      : 0;

  return {
    id: item.id,
    chickenType: item.chicken_type,
    weight,
    liveRate,
    defaultLiveRate,
    rateSource: hasOverride
      ? "Manually adjusted for this invoice"
      : customerLiveRate !== null
      ? "Customer-specific rate"
      : "Daily market rate",
    yieldPercentage,
    autoMeatRate,
    hasMeatOverride,
    meatRate,
    selectedRate,
    subtotal,
    validLiveRate,
    validYield,
    validWeight,
    validSelectedRate,
  };
});

  // Calculate invoice subtotal
  const currentSubtotal = roundMoney(
    pricingRows.reduce((sum, item) => sum + item.subtotal, 0)
  );

  // Calculate GST
  const gstValue = Number(gstInput) || 0;

  const currentGstAmount = roundMoney(
    gstType === "percentage"
      ? currentSubtotal * (gstValue / 100)
      : gstValue
  );

  const currentTotal = roundMoney(
    currentSubtotal + currentGstAmount
  );


  useEffect(() => {
  if (!open || !order) return;

  let cancelled = false;

  const fetchCustomerPrices = async () => {
    setRatesLoading(true);
    setCustomerRatesError(false);
    setCustomerLiveRate(null);
    setLiveRateOverrides({});
    setMeatRateOverrides({});

    try {
      if (!order.customer_id) {
        throw new Error("Customer ID is missing from the order.");
      }

      const response = await api.get(
        `/admin/customers/${order.customer_id}/live-rate/`,
        false
      );

      if (!response.success) {
        throw new Error(
          response.message || "Unable to fetch customer rates."
        );
      }

      if (!cancelled) {
        setCustomerLiveRate(response.live_rate ?? null);
      }
    } catch (error) {
      console.error("Customer rate fetch error:", error);

      if (!cancelled) {
        setCustomerRatesError(true);
        setError("Unable to load customer-specific rates. Please try again.");
      }
    } finally {
      if (!cancelled) {
        setRatesLoading(false);
      }
    }
  };

  fetchCustomerPrices();

  return () => {
    cancelled = true;
  };
}, [open, order?.id, order?.customer_id]);
  // Reset modal values when opening a new order
  useEffect(() => {
    if (open && order) {
      setPricingMode("live_rate");
      setGstType("percentage");
      setGstInput("");
      setError("");
      setSuccessMsg("");
    }
  }, [open, order?.id]);

  if (!open || !order) return null;


  // Validate pricing before invoice generation
  const validatePricing = () => {
    if (!pricingRows.length) {
      return "This order does not contain any items.";
    }
    if (ratesLoading) {
      return "Please wait while customer rates are loading.";
    }

    if (customerRatesError) {
      return "Unable to load customer rates. Please reopen the invoice.";
    }

    const invalidItem = pricingRows.find(
      (item) => !item.validWeight || !item.validSelectedRate
    );

    if (invalidItem) {
      if (!invalidItem.validWeight) {
        return `Invalid weight for ${invalidItem.chickenType}.`;
      }

      if (!invalidItem.validLiveRate) {
        return `Please enter a valid Live Rate for ${invalidItem.chickenType}.`;
      }

      if (
          pricingMode === "meat_rate" &&
          !invalidItem.validYield &&
          !invalidItem.hasMeatOverride
        ) {
        return `Valid Yield Percentage is missing for ${invalidItem.chickenType}.`;
      }

      return `Unable to calculate the selected rate for ${invalidItem.chickenType}.`;
    }

    if (!Number.isFinite(gstValue) || gstValue < 0) {
      return "Please enter a valid GST value.";
    }

    return null;
  };

  // Generate invoice
  const handleGenerateInvoice = async () => {
    setError("");
    setSuccessMsg("");

    const validationError = validatePricing();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "/accounts/invoices/create/",
        {
          order_id: order.id,
          pricing_mode: pricingMode,
          gst_type: gstType,
          gst_input: gstValue,


        item_rates: pricingRows.map((item) => ({
          order_item_id: item.id,
          live_rate: item.liveRate,
          meat_rate:
            pricingMode === "meat_rate" && item.hasMeatOverride
              ? item.meatRate
              : null,
        })),

        }
      );
      if (response.success) {
        setSuccessMsg(
          "Invoice generated successfully!"
        );

        if (onSuccess) {
          onSuccess();
        }

        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setError(
          response.message || "Failed to generate invoice."
        );
      }
    } catch (err) {
      console.error("Invoice generation error:", err);

      setError(
        err?.data?.message ||
        err?.message ||
        "An error occurred during invoice generation."
      );
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) =>
    `₹${Number(value || 0).toFixed(2)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00000026] px-6 py-5 shrink-0">
          <div>
            <h2 className="text-2xl font-bold">
              Invoice Pricing
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Order: {order.order_number}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="text-gray-500 hover:text-red-500 cursor-pointer"
          >
            <IoClose size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm font-medium">
              {error}
            </div>
          )}

          {/* Success */}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm font-medium">
              {successMsg}
            </div>
          )}

          {/* Customer */}
          <div>
            <label className="text-sm text-gray-500 font-medium">
              Customer
            </label>

            <input
              type="text"
              value={order.customer || ""}
              readOnly
              className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 outline-none bg-gray-50 text-gray-700"
            />
          </div>

          {/* Pricing Mode Selection */}
<div className="space-y-3">
  <h3 className="text-lg font-semibold">
    Select Pricing Mode
  </h3>

  <div className="grid grid-cols-2 gap-3">
    <button
      type="button"
      onClick={() => setPricingMode("live_rate")}
      className={`rounded-xl border-2 p-4 text-left transition ${
        pricingMode === "live_rate"
          ? "border-orange-500 bg-orange-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <span className="block font-semibold">
        Live Rate
      </span>
      <span className="block text-xs text-gray-500 mt-1">
        Use Daily Live Rate
      </span>
    </button>

    <button
      type="button"
      onClick={() => setPricingMode("meat_rate")}
      className={`rounded-xl border-2 p-4 text-left transition ${
        pricingMode === "meat_rate"
          ? "border-indigo-600 bg-indigo-50"
          : "border-gray-200 bg-white"
      }`}
    >
      <span className="block font-semibold">
        Meat Rate
      </span>
      <span className="block text-xs text-gray-500 mt-1">
        Automatically calculate Meat Rate
      </span>
    </button>
  </div>
</div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold">
                Order Items
              </h3>

              <span className="text-xs text-gray-500">
                Automatic Pricing
              </span>
            </div>

            {pricingRows.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 p-4 rounded-xl border border-[#00000026] space-y-4"
              >
                {/* Chicken Type and Weight */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Chicken Type
                    </label>

                    <input
                      type="text"
                      value={item.chickenType || ""}
                      readOnly
                      className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 font-medium">
                      Weight
                    </label>

                    <input
                      type="text"
                      value={`${item.weight || 0} Kg`}
                      readOnly
                      className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white text-orange-600 font-medium"
                    />
                  </div>
                </div>

                {/* Editable Live Rate */}
<div className="bg-white rounded-xl p-4 border border-orange-200">
  <label className="text-sm text-gray-600 font-medium">
    Live Rate (₹ / Kg)
  </label>

  <input
    type="number"
    min="0"
    step="0.01"
    value={
      Object.prototype.hasOwnProperty.call(
        liveRateOverrides,
        item.id
      )
        ? liveRateOverrides[item.id]
        : item.defaultLiveRate ?? ""
    }
    onChange={(e) => {
      setLiveRateOverrides((prev) => ({
        ...prev,
        [item.id]: e.target.value,
      }));
    }}
    className="mt-2 w-full border border-orange-200 rounded-xl px-4 py-3 text-lg font-bold text-orange-600 outline-none focus:ring-2 focus:ring-orange-300"
    placeholder="Enter Live Rate"
  />

  <p className="text-xs text-gray-500 mt-2">
    Default: {item.rateSource}
  </p>
</div>

                {/* Selected Pricing Rate */}
                {pricingMode === "live_rate" ? (
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <p className="text-sm text-gray-600">
                      Daily Live Rate
                    </p>

                    <p className="text-2xl font-bold text-orange-600 mt-1">
                      {item.validLiveRate
                        ? `${formatCurrency(item.liveRate)} / Kg`
                        : "Not Available"}
                    </p>
                  </div>

                      ) : (
                        <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                          <div className="flex justify-between items-center gap-3 mb-3">
                            <label className="text-sm font-medium text-gray-700">
                              Meat Rate (₹ / Kg)
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                setMeatRateOverrides((prev) => {
                                  const updated = { ...prev };
                                  delete updated[item.id];
                                  return updated;
                                });
                              }}
                              className="text-xs font-semibold text-indigo-600 hover:underline"
                            >
                              Reset to Auto
                            </button>
                          </div>

                          <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={
                              item.hasMeatOverride
                                ? meatRateOverrides[item.id]
                                : item.autoMeatRate ?? ""
                            }
                            onChange={(e) => {
                              setMeatRateOverrides((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }));
                            }}
                            placeholder="Enter Meat Rate"
                            className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-xl font-bold text-indigo-700 bg-white outline-none focus:ring-2 focus:ring-indigo-300"
                          />

                          <p className="text-xs text-gray-500 mt-2">
                            {item.hasMeatOverride
                              ? `Manually entered rate. Auto rate: ${
                                  item.autoMeatRate !== null
                                    ? `₹${item.autoMeatRate.toFixed(2)}/kg`
                                    : "Unavailable"
                                }`
                              : "Automatically calculated from Live Rate and Yield Percentage"}
                          </p>
                        </div>
                      )}


                {/* Item Subtotal */}
                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-sm font-medium text-gray-600">
                    Item Subtotal
                  </span>

                  <span className="text-lg font-bold text-gray-900">
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* GST Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">
              Invoice Generation
            </h3>

            <div className="bg-[#EEF1F8] p-5 rounded-xl border border-[#00000026] space-y-4">

              <div className="grid md:grid-cols-2 gap-5">

                {/* GST Type */}
                <div>
                  <label className="text-sm text-gray-700 font-medium">
                    GST Type
                  </label>

                  <select
                    value={gstType}
                    onChange={(e) => setGstType(e.target.value)}
                    className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                  >
                    <option value="percentage">
                      Percentage (%)
                    </option>

                    <option value="fixed">
                      Fixed Amount (₹)
                    </option>
                  </select>
                </div>

                {/* GST Value */}
                <div>
                  <label className="text-sm text-gray-700 font-medium">
                    GST Value {gstType === "percentage" ? "(%)" : "(₹)"}
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={
                      gstType === "percentage" ? "5" : "500"
                    }
                    value={gstInput}
                    onChange={(e) => setGstInput(e.target.value)}
                    className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                  />
                </div>
              </div>

              {/* Invoice Preview */}
              <div className="mt-4 pt-4 border-t border-[#00000015]">

                <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
                  <span>Subtotal</span>

                  <span className="font-medium">
                    {formatCurrency(currentSubtotal)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-sm mb-3 text-gray-600">
                  <span>GST Amount</span>

                  <span className="font-medium">
                    {formatCurrency(currentGstAmount)}
                  </span>
                </div>

                <div className="flex justify-between items-center text-base mt-2 pt-3 border-t border-[#00000015] text-gray-900 font-bold">
                  <span>Total Amount</span>

                  <span className="text-[#4B5EAA] text-xl">
                    {formatCurrency(currentTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Generate Invoice Button */}
          <button
            onClick={handleGenerateInvoice}
            disabled={loading || !pricingRows.length}
            className="w-full bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-400 text-white py-4 rounded-xl font-bold transition cursor-pointer"
          >
            {loading ? "Generating Invoice..." : "Generate Invoice"}
          </button>

        </div>
      </div>
    </div>
  );
}

export default PurchasePricingModal;
