import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import SalesReport from "./pages/SalesReport";
// import CustomerPurchase from "./pages/CustomerPurchase";
// import OutstandingPayment from "./pages/OutstandingPayment";
// import RecordAdvance from "./pages/RecordAdvance";
// import AdvanceBalance from "./pages/AdvanceBalance";
// import AdvanceAnalytics from "./pages/AdvanceAnalytics";
// import Invoice from "./pages/Invoice";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />

        <Route path="sales-report" element={<SalesReport />} />

        {/* <Route path="customer-purchase" element={<CustomerPurchase />} />

        <Route path="outstanding-payment" element={<OutstandingPayment />} />

        <Route path="record-advance" element={<RecordAdvance />} />

        <Route path="advance-balance" element={<AdvanceBalance />} />

        <Route path="advance-analytics" element={<AdvanceAnalytics />} />

        <Route path="invoice" element={<Invoice />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
