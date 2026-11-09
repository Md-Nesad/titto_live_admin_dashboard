import { Users, DollarSign, TrendingUp } from "lucide-react";
import Commission from "../assets/Commission";
import Average from "../assets/Average";
import StatsCards from "../features/dashboard/components/StatsCard";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import UserTable from "../features/users/components/UserTable";
import useUsers from "../hooks/useUsers";

export default function UsersList() {
  const { statsQuery } = useUsers();
  const statsData = statsQuery.data;
  const getStat = (value) =>
    statsQuery.isPending
      ? "..."
      : statsQuery.isError
        ? "—"
        : Number(value ?? 0).toLocaleString();

  const stats = [
    {
      title: "Total Users",
      value: getStat(statsData?.totalUsers),
      icon: <Users className="w-5 h-5 text-gray-600" />,
      footer: getStat(statsData?.totalUsers),
      agency: "users",
      bar: true,
    },
    {
      title: "Total Coin Buy",
      value: getStat(statsData?.totalCoins),
      icon: (
        <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
      ),
    },
    {
      title: "Avg Coins",
      value: getStat(statsData?.avgCoins),
      icon: <Average className="w-5 h-5 text-blue-500" />,
      change: "Average coins per user",
    },
  ];
  return (
    <div>
      <TitleSubTitle
        title="Hello  👋🏻"
        subtitle="Manage your users from your dashboard"
      />

      {statsQuery.isError && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          Unable to load user statistics:{" "}
          {statsQuery.error?.response?.data?.message ||
            statsQuery.error?.message ||
            "Something went wrong."}{" "}
          <button
            type="button"
            onClick={() => statsQuery.refetch()}
            disabled={statsQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {statsQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </p>
      )}
      <StatsCards data={stats} />

      <UserTable />
    </div>
  );
}
