import { Users, DollarSign, TrendingUp, CircleCheck } from "lucide-react";
import StatsCards from "../features/dashboard/components/StatsCard";
import DashboardTable from "../features/dashboard/components/DashboardTable";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import useAgencies from "../hooks/useAgencies";

export default function Dashboard() {
  const { agenciesQuery } = useAgencies();
  const agencies = agenciesQuery.data ?? [];
  const totalCoinBuy = agencies.reduce(
    (sum, agency) => sum + Number(agency.coinBuy || 0),
    0,
  );
  const averageLevel =
    agencies.length > 0
      ? agencies.reduce((sum, agency) => sum + Number(agency.level || 0), 0) /
        agencies.length
      : 0;
  const activeAgencies = agencies.filter(
    (agency) => agency.status === "active",
  ).length;
  const formatStat = (value) =>
    agenciesQuery.isPending
      ? "..."
      : agenciesQuery.isError
        ? "—"
        : value.toLocaleString(undefined, { maximumFractionDigits: 2 });

  const stats = [
    {
      title: "Total Agencies",
      value: formatStat(agencies.length),
      icon: <Users className="w-5 h-5 text-gray-600" />,
      footer: formatStat(agencies.length),
      agency: "agencies",
      bar: true,
    },
    {
      title: "Total Coin Buy",
      value: formatStat(totalCoinBuy),
      icon: (
        <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
      ),
    },
    {
      title: "Average Agency Level",
      value: formatStat(averageLevel),
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      change: "Across all agencies",
    },
    {
      title: "Active Agencies",
      value: formatStat(activeAgencies),
      icon: <CircleCheck className="w-5 h-5 text-green-600" />,
      change: "Currently active",
    },
  ];

  return (
    <div>
      <TitleSubTitle
        title="Hello  👋🏻"
        subtitle="Manage ur app from your dashboard"
      />

      {agenciesQuery.isError && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          Unable to load agency statistics:{" "}
          {agenciesQuery.error?.response?.data?.message ||
            agenciesQuery.error?.message ||
            "Something went wrong."}{" "}
          <button
            type="button"
            onClick={() => agenciesQuery.refetch()}
            disabled={agenciesQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {agenciesQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </p>
      )}
      <StatsCards data={stats} />

      <DashboardTable agenciesQuery={agenciesQuery} />
    </div>
  );
}
