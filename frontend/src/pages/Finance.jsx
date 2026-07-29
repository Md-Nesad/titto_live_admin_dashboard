import React from "react";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import Commission from "../assets/Commission";
import Average from "../assets/Average";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import StatsCards from "../features/dashboard/components/StatsCard";
import RevenueChart from "../features/finance/components/RevenueChart";
import PaymentChart from "../features/finance/components/PaymentGatewayChart";

export default function Finance() {
  const stats = [
    {
      title: "Total Agencies",
      value: "+3 this month",
      icon: <Users className="w-5 h-5 text-gray-600" />,
      footer: "14",
      agency: "agencies",
      bar: true,
    },
    {
      title: "Total Coin Sales",
      value: "5.3M",
      icon: (
        <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
      ),
      change: "+3 this month",
    },
    {
      title: "Avg Commission",
      value: "10.0%",
      icon: <Average className="w-5 h-5 text-blue-500" />,
      change: "+3 this month",
    },
    {
      title: "Platform Revenue",
      value: "৳2.4M",
      icon: <Commission className="w-5 h-5 text-blue-500" />,
      change: "+3 this month",
    },
  ];

  return (
    <div>
      <TitleSubTitle
        title="Finance and Wallets"
        subtitle="See you revenue per month here"
      />

      <StatsCards data={stats} />

      <section className="flex flex-col sm:flex-row items-center mt-7 gap-6 mb-6">
        <RevenueChart />
        <PaymentChart />
      </section>
    </div>
  );
}
