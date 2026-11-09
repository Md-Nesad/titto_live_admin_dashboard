import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getExchangeRate,
  sellCoinsToAgency,
  updateExchangeRate,
} from "../services/coinManagementService";

const exchangeRateQueryKey = ["exchange-rate"];

export default function useCoinManagement() {
  const queryClient = useQueryClient();

  const exchangeRateQuery = useQuery({
    queryKey: exchangeRateQueryKey,
    queryFn: getExchangeRate,
  });

  const updateRateMutation = useMutation({
    mutationFn: updateExchangeRate,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: exchangeRateQueryKey }),
  });

  const sellCoinsMutation = useMutation({
    mutationFn: sellCoinsToAgency,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["agencies"] }),
        queryClient.invalidateQueries({ queryKey: ["rate-transactions"] }),
        queryClient.invalidateQueries({ queryKey: ["transaction-history"] }),
      ]);
    },
  });

  return { exchangeRateQuery, updateRateMutation, sellCoinsMutation };
}
