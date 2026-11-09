import React from "react";
import { Users, DollarSign, TrendingUp } from "lucide-react";
import Commission from "../assets/Commission";
import Average from "../assets/Average";
import TitleSubTitle from "../shared/components/TitleSubTitle";
import StatsCards from "../features/dashboard/components/StatsCard";
import CoinSenderTable from "../features/transactionHistory/components/CoinSenderTable";
import useTransactions from "../hooks/useTransactions";

export default function TransactionHistory() {
  const { transactionHistoryQuery } = useTransactions({ includeRate: false });
  const transactions = transactionHistoryQuery.data ?? [];
  const receiverAgencyIds = new Set(
    transactions.map((item) => item.receiver?.agencyId).filter(Boolean),
  );
  const totalCoins = transactions.reduce(
    (sum, item) => sum + Number(item.coins || 0),
    0,
  );
  const totalRevenue = transactions.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0,
  );
  const getValue = (value) =>
    transactionHistoryQuery.isPending
      ? "..."
      : transactionHistoryQuery.isError
        ? "—"
        : value.toLocaleString();

  const stats = [
    {
      title: "Total Agencies",
      value: getValue(receiverAgencyIds.size),
      icon: <Users className="w-5 h-5 text-gray-600" />,
      footer: getValue(receiverAgencyIds.size),
      agency: "agencies",
      bar: true,
    },
    {
      title: "Total Coin Sales",
      value: getValue(totalCoins),
      icon: (
        <DollarSign className="w-5 h-5 text-[#1C1D1D] border-2 border-[#1C1D1D] rounded-full" />
      ),
    },
    {
      title: "Avg Commission",
      value: "—",
      icon: <Average className="w-5 h-5 text-blue-500" />,
      change: "Not provided by transaction API",
    },
    {
      title: "Platform Revenue",
      value:
        transactionHistoryQuery.isPending || transactionHistoryQuery.isError
          ? getValue(0)
          : `৳${totalRevenue.toLocaleString()}`,
      icon: <Commission className="w-5 h-5 text-blue-500" />,
      change: "Total transaction value",
    },
  ];
  return (
    <div>
      <TitleSubTitle
        title="Transaction History"
        subtitle="Manage host and Master Agencies"
      />

      <StatsCards data={stats} />

      <CoinSenderTable transactionHistoryQuery={transactionHistoryQuery} />
    </div>
  );
}
