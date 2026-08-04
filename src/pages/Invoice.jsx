import InvoiceStatCard from "../components/invoice/InvoiceStatCard";
import InvoiceTable from "../components/invoice/InvoiceTable";
import DateRange from "../components/sales/DateRange";

function Invoice() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Invoice</h1>

          <p className="text-gray-500 mt-1">Manage customer invoices and payments</p>
        </div>

        <DateRange />
      </div>

      {/* KPI Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <InvoiceStatCard
          title="Total Invoiced"
          value="₹4,18,500"
          subtitle="Net amount"
          type="invoice"
        />

        <InvoiceStatCard title="Total Tax" value="₹41,850" subtitle="GST collected" type="tax" />

        <InvoiceStatCard
          title="Gross Total"
          value="₹4,60,350"
          subtitle="Incl. taxes"
          type="gross"
        />

        <InvoiceStatCard
          title="Amount Paid"
          value="₹2,51,350"
          subtitle="4 invoices cleared"
          type="paid"
        />
      </div>

      {/* Table */}

      <InvoiceTable />
    </div>
  );
}

export default Invoice;
