import { useQuery } from "@tanstack/react-query";
import { getMonthlyRevenue } from "../services/revenueService";

export default function useRevenue() {
  return useQuery({
    queryKey: ["monthly-revenue"],
    queryFn: getMonthlyRevenue,
  });
}
