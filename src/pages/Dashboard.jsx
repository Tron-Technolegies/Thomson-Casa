import React, { useState, useEffect } from "react";
import AdvanceBalances from "../components/dasboard/AdvanceBalances";
import CustomerBalance from "../components/dasboard/CustomerBalance";
import OutstandingPayments from "../components/dasboard/OutstandingPayments";
import PaymentMethods from "../components/dasboard/PaymentMethods";
import RevenueChart from "../components/dasboard/RevenueChart";
import StatCard from "../components/dasboard/StatCard";
import TopCustomers from "../components/dasboard/TopCustomers";
import DateRange from "../components/sales/DateRange";
import { api } from "../services/api";

function Dashboard() {
  const [data, setData] = useState({
    revenue: 0,
    orders: 0,
    customers: 0,
    outstanding: 0,
  });

  const [charts, setCharts] = useState({
    payment_methods: [],
    revenue_trend: [],
    top_customers: [],
  });
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsUrl = date ? `/accounts/dashboard/stats/?date=${date}` : "/accounts/dashboard/stats/";
        const chartsUrl = date ? `/accounts/dashboard/charts/?date=${date}` : "/accounts/dashboard/charts/";
        
        const [res, chartsRes] = await Promise.all([
          api.get(statsUrl),
          api.get(chartsUrl)
        ]);
        if (res.success) {
          setData({
            revenue: res.revenue || 0,
            orders: res.orders || 0,
            customers: res.customers || 0,
            outstanding: res.outstanding || 0,
          });
        }
        if (chartsRes.success) {
          setCharts({
            payment_methods: chartsRes.payment_methods || [],
            revenue_trend: chartsRes.revenue_trend || [],
            top_customers: chartsRes.top_customers || [],
          });
        }
      } catch (err) {
        console.error(err);
      }
    };
      fetchStats();
  }, [date]);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${data.revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      subtitle: "Gross Invoiced",
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: data.orders.toString(),
      subtitle: "Lifetime Orders",
      color: "text-green-600",
    },
    {
      title: "Outstanding",
      value: `₹${data.outstanding.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`,
      subtitle: "Unpaid & Partial",
      color: "text-red-500",
    },
    {
      title: "Total Customers",
      value: data.customers.toString(),
      subtitle: "Registered Clients",
      color: "text-blue-600",
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your business</p>
        </div>
        <DateRange date={date} setDate={setDate} />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            color={item.color}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart data={charts.revenue_trend} />
        </div>

        <PaymentMethods methods={charts.payment_methods} />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomerBalance />

        <OutstandingPayments />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdvanceBalances />

        <TopCustomers customers={charts.top_customers} />
      </section>
    </div>
  );
}

export default Dashboard;
