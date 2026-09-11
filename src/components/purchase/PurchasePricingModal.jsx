import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "../../services/api";

function PurchasePricingModal({ open, onClose, order, dailyPrices, onSuccess }) {
  const [itemPrices, setItemPrices] = useState({});
  const [gstType, setGstType] = useState("percentage");
  const [gstInput, setGstInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [customerPrices, setCustomerPrices] = useState({});

  useEffect(() => {
    const fetchCustomerPrices = async () => {
      if (order && order.customer_id) {
        try {
          const res = await api.get(`/admin/customers/${order.customer_id}/prices/`);
          if (res.success) {
            setCustomerPrices(res.prices || {});
          } else {
            setCustomerPrices({});
          }
        } catch (err) {
          console.error("Failed to fetch customer prices", err);
        }
      }
    };
    fetchCustomerPrices();
  }, [order]);

  useEffect(() => {
    if (order && order.items) {
      const initialPrices = {};
      order.items.forEach(item => {
        let price = item.price_per_kg || "";
        
        // If no price set, try to prefill from customer price or market
        if (!price) {
          if (customerPrices[item.chicken_type]) {
            price = customerPrices[item.chicken_type];
          } else if (dailyPrices && Array.isArray(dailyPrices)) {
            const priceObj = dailyPrices.find(p => p.chicken_type === item.chicken_type);
            if (priceObj) {
              price = priceObj.price;
            }
          }
        }
        
        initialPrices[item.id] = price;
      });
      setItemPrices(initialPrices);
      setGstType("percentage");
      setGstInput("");
      setError("");
      setSuccessMsg("");
    }
  }, [order, dailyPrices, customerPrices]);

  if (!open || !order) return null;

  const handlePriceChange = (id, value) => {
    setItemPrices(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const getMarketPrice = (type) => {
    if (!dailyPrices || !Array.isArray(dailyPrices)) return null;
    const priceObj = dailyPrices.find(p => p.chicken_type === type);
    return priceObj ? priceObj.price : null;
  };

  const setMarketPrice = (id, type) => {
    const p = getMarketPrice(type);
    if (p !== null) {
      handlePriceChange(id, p);
    }
  };

  // Live calculation for preview
  const currentSubtotal = order?.items?.reduce((sum, item) => {
    const val = parseFloat(itemPrices[item.id]);
    const weight = parseFloat(item.weight);
    if (!isNaN(val) && !isNaN(weight)) {
      return sum + (val * weight);
    }
    return sum;
  }, 0) || 0;

  let currentGstAmount = 0;
  const gstVal = parseFloat(gstInput) || 0;
  if (gstType === "percentage") {
    currentGstAmount = currentSubtotal * (gstVal / 100);
  } else {
    currentGstAmount = gstVal;
  }
  const currentTotal = currentSubtotal + currentGstAmount;

  const handleSave = async () => {
    setError("");
    setLoading(true);

    const itemsToSave = order.items.map(item => {
      const val = parseFloat(itemPrices[item.id]);
      return {
        id: item.id,
        price_per_kg: isNaN(val) ? null : val
      };
    });

    // Validation
    const invalidItem = itemsToSave.find(i => i.price_per_kg === null || i.price_per_kg < 0);
    if (invalidItem) {
      setError("Please enter a valid positive price for all items.");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(`/accounts/orders/${order.id}/pricing/`, {
        items: itemsToSave
      });

      if (res.success) {
        setSuccessMsg("Pricing saved successfully.");
        if (onSuccess) onSuccess();
      } else {
        setError(res.message || "Failed to save pricing.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateInvoice = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);

    const itemsToSave = order.items.map(item => {
      const val = parseFloat(itemPrices[item.id]);
      return {
        id: item.id,
        price_per_kg: isNaN(val) ? null : val
      };
    });

    const invalidItem = itemsToSave.find(i => i.price_per_kg === null || i.price_per_kg < 0);
    if (invalidItem) {
      setError("Please enter a valid positive price for all items.");
      setLoading(false);
      return;
    }

    try {
      // 1. Save pricing first
      const priceRes = await api.post(`/accounts/orders/${order.id}/pricing/`, {
        items: itemsToSave
      });

      if (!priceRes.success) {
        setError(priceRes.message || "Failed to save pricing.");
        setLoading(false);
        return;
      }

      // 2. Generate Invoice
      const gstVal = parseFloat(gstInput) || 0;
      const invRes = await api.post('/accounts/invoices/create/', {
        order_id: order.id,
        gst_type: gstType,
        gst_input: gstVal
      });

      if (invRes.success) {
        setSuccessMsg("Invoice generated successfully! You can view it in the Invoices tab.");
        setTimeout(() => {
          if (onSuccess) onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(invRes.message || "Failed to generate invoice.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during invoice generation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#00000026] px-6 py-5 shrink-0">
          <h2 className="text-2xl font-bold">Pricing for {order.order_number}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 cursor-pointer">
            <IoClose size={28} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 text-sm font-medium">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm font-medium">
              {successMsg}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-500 font-medium">Customer</label>
            <input
              type="text"
              value={order.customer || ""}
              readOnly
              className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 outline-none bg-gray-50 text-gray-700"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Order Items</h3>
            {order.items && order.items.map((item, idx) => {
              const mktPrice = getMarketPrice(item.chicken_type);
              
              return (
                <div key={item.id} className="bg-gray-50 p-4 rounded-xl border border-[#00000026] space-y-4">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Chicken Type</label>
                      <input
                        type="text"
                        value={item.chicken_type}
                        readOnly
                        className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-500 font-medium">Weight</label>
                      <input
                        type="text"
                        value={`${item.weight} Kg`}
                        readOnly
                        className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white text-orange-600 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm text-gray-500 font-medium">Selling Price (₹ per Kg)</label>
                      <span className="text-xs font-medium text-gray-500">
                        Market: <span className="text-orange-500 font-bold">{mktPrice ? `₹${mktPrice}` : "N/A"}</span>
                        {customerPrices[item.chicken_type] && (
                          <span className="ml-2 bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Custom: ₹{customerPrices[item.chicken_type]}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="₹0.00"
                        value={itemPrices[item.id] !== undefined ? itemPrices[item.id] : ""}
                        onChange={(e) => handlePriceChange(item.id, e.target.value)}
                        className="flex-1 border border-[#00000026] rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                      <button 
                        onClick={() => setMarketPrice(item.id, item.chicken_type)}
                        disabled={!mktPrice}
                        className="px-6 rounded-xl bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 font-medium transition cursor-pointer"
                      >
                        Use Market
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* GST Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-4">Invoice Generation</h3>
            <div className="bg-[#EEF1F8] p-5 rounded-xl border border-[#00000026] space-y-4">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="text-sm text-gray-700 font-medium">GST Type</label>
                  <select
                    value={gstType}
                    onChange={(e) => setGstType(e.target.value)}
                    className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700 font-medium">
                    GST Value {gstType === "percentage" ? "(%)" : "(₹)"}
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder={gstType === "percentage" ? "5" : "500"}
                    value={gstInput}
                    onChange={(e) => setGstInput(e.target.value)}
                    className="mt-2 w-full border border-[#00000026] rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                  />
                </div>
              </div>
              
              {/* Live Preview */}
              <div className="mt-4 pt-4 border-t border-[#00000015]">
                <div className="flex justify-between items-center text-sm mb-2 text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">₹{currentSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm mb-2 text-gray-600">
                  <span>GST Amount</span>
                  <span className="font-medium">₹{currentGstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-base mt-2 pt-2 border-t border-[#00000015] text-gray-900 font-bold">
                  <span>Total Amount</span>
                  <span className="text-[#4B5EAA]">₹{currentTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-4">
            <button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-white border border-[#4B5EAA] hover:bg-gray-50 disabled:opacity-50 text-[#4B5EAA] py-4 rounded-xl font-bold transition cursor-pointer"
            >
              {loading ? "Saving..." : "Save Pricing Draft"}
            </button>
            <button 
              onClick={handleGenerateInvoice}
              disabled={loading}
              className="flex-1 bg-indigo-700 hover:bg-indigo-800 disabled:bg-indigo-400 text-white py-4 rounded-xl font-bold transition cursor-pointer"
            >
              {loading ? "Processing..." : "Generate Invoice"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PurchasePricingModal;

