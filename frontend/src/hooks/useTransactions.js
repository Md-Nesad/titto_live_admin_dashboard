import { useQuery } from "@tanstack/react-query";
import {
  getRateTransactions,
  getTransactionHistory,
} from "../services/transactionService";

export default function useTransactions({ includeRate = true, includeHistory = true } = {}) {
  const rateTransactionsQuery = useQuery({
    queryKey: ["rate-transactions"],
    queryFn: getRateTransactions,
    enabled: includeRate,
  });

  const transactionHistoryQuery = useQuery({
    queryKey: ["transaction-history"],
    queryFn: getTransactionHistory,
    enabled: includeHistory,
  });

  return { rateTransactionsQuery, transactionHistoryQuery };
}
