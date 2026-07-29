import { Users, DollarSign, TrendingUp } from "lucide-react";
import Commission from "../assets/Commission";
import Average from "../assets/Average";
import StatsCards from "../features/dashboard/components/StatsCard";
import DashboardTable from "../features/dashboard/components/DashboardTable";
import TitleSubTitle from "../shared/components/TitleSubTitle";

export default function Dashboard() {
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
        title="Hello  👋🏻"
        subtitle="Manage ur app from your dashboard"
      />

      <StatsCards data={stats} />

      <DashboardTable />
    </div>
  );
}
