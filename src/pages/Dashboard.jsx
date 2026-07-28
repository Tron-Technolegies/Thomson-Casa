import AdvanceBalances from "../components/dasboard/AdvanceBalances";
import CustomerBalance from "../components/dasboard/CustomerBalance";
import OutstandingPayments from "../components/dasboard/OutstandingPayments";
import PaymentMethods from "../components/dasboard/PaymentMethods";
import RevenueChart from "../components/dasboard/RevenueChart";
import StatCard from "../components/dasboard/StatCard";
import TopCustomers from "../components/dasboard/TopCustomers";

function Dashboard() {
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,38,600",
      subtitle: "+12.4% from last month",
      color: "text-green-600",
    },
    {
      title: "Total Orders",
      value: "379",
      subtitle: "+12.4% from last month",
      color: "text-green-600",
    },
    {
      title: "Outstanding",
      value: "₹3,67,500",
      subtitle: "₹1,36,000 overdue",
      color: "text-red-500",
    },
    {
      title: "Net Balance",
      value: "₹50,000",
      subtitle: "Net Credit Position",
      color: "text-blue-600",
    },
    {
      title: "Advance Balance",
      value: "₹1,66,000",
      subtitle: "Available Across Customers",
      color: "text-purple-600",
    },
    {
      title: "Invoices Unpaid",
      value: "₹2,09,000",
      subtitle: "3 Pending",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Dashboard Heading */}

      {/* <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

        <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
      </div> */}

      {/* ==========================
            Stat Cards
      =========================== */}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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

      {/* ==========================
            Revenue + Payment
      =========================== */}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <PaymentMethods />
      </section>

      {/* ==========================
            Customer + Outstanding
      =========================== */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomerBalance />

        <OutstandingPayments />
      </section>

      {/* ==========================
            Bottom Section
      =========================== */}

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AdvanceBalances />

        <TopCustomers />
      </section>
    </div>
  );
}

export default Dashboard;
