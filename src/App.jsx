import React from "react";
import { Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";

import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import AdvanceAnalytics from "./pages/AdvanceAnalytics";
import AdvanceBalance from "./pages/AdvanceBalance";
import Categories from "./pages/Categories";
import CustomerPurchase from "./pages/CustomerPurchase";
import Invoice from "./pages/Invoice";
import Notification from "./pages/Notification";
import OutstandingPayment from "./pages/OutstandingPayment";
import RecordAdvance from "./pages/RecordAdvance";
import SalesReport from "./pages/SalesReport";

export default function App() {
  return (
    <NotificationProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="advance-analytics" element={<AdvanceAnalytics />} />
          <Route path="advance-balance" element={<AdvanceBalance />} />
          <Route path="categories" element={<Categories />} />
          <Route path="customer-purchase" element={<CustomerPurchase />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="notification" element={<Notification />} />
          <Route path="outstanding-payment" element={<OutstandingPayment />} />
          <Route path="record-advance" element={<RecordAdvance />} />
          <Route path="sales-report" element={<SalesReport />} />
        </Route>
      </Routes>
    </NotificationProvider>
  );
}
