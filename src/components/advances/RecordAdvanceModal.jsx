import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { api } from "../../services/api";

function RecordAdvanceModal({ open, onClose, onSuccess }) {
  const [customers, setCustomers] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Bank Transfer");
  const [referenceNo, setReferenceNo] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      const fetchCustomers = async () => {
        try {
          const res = await api.get("/accounts/customers/");
          if (res.success && res.customers) {
            setCustomers(res.customers);
            if (res.customers.length > 0) setCustomerId(res.customers[0].id);
          }
        } catch (err) {
          console.error(err);
        }
      };
      fetchCustomers();
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        customer_id: customerId,
        amount: parseFloat(amount),
        payment_method: paymentMethod,
        reference_no: referenceNo,
        note: note
      };

      const res = await api.post("/accounts/advances/record/", payload);
      if (res.success) {
        setAmount("");
        setReferenceNo("");
        setNote("");
        if (onSuccess) onSuccess();
        onClose();
      } else {
        setError(res.message || "Failed to record advance.");
      }
    } catch (err) {
      setError("Server error while recording advance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#00000026] px-6 py-4 bg-gray-50">
          <h2 className="text-xl font-bold">Record Advance</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-800">
            <IoClose size={26} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-5">
              <div>
                <label className="text-sm font-semibold text-gray-700">Customer</label>
                <select
                  required
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>{c.customer_name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Amount (₹)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Payment Method</label>
                <select
                  required
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                >
                  <option value="Cash">Cash</option>
                  <option value="UPI">UPI</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="text-sm font-semibold text-gray-700">Reference No. (Optional)</label>
                <input
                  value={referenceNo}
                  onChange={(e) => setReferenceNo(e.target.value)}
                  placeholder="e.g. NEFT-20260709-001"
                  className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">Note (Optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Optional note"
                  className="mt-2 w-full border border-[#00000026] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B5EAA]"
                />
              </div>
            </div>

            <div className="flex justify-end mt-8 gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !amount}
                className="bg-indigo-700 hover:bg-indigo-800 text-white cursor-pointer px-8 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? "Recording..." : "Record Advance"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecordAdvanceModal;
