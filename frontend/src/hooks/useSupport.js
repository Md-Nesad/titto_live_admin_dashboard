import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createSupportAgency,
  deleteSupportAgency,
  getSupportAgencies,
  getSupportAgencyCountries,
  updateSupportAgency,
} from "../services/supportServices";

const supportAgenciesQueryKey = ["support-agencies"];

export default function useSupport({ includeCountries = false } = {}) {
  const queryClient = useQueryClient();

  const agenciesQuery = useQuery({
    queryKey: supportAgenciesQueryKey,
    queryFn: getSupportAgencies,
  });

  const countriesQuery = useQuery({
    queryKey: ["support-agency-countries"],
    queryFn: getSupportAgencyCountries,
    enabled: includeCountries,
  });

  const createMutation = useMutation({
    mutationFn: createSupportAgency,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: supportAgenciesQueryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: updateSupportAgency,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: supportAgenciesQueryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSupportAgency,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: supportAgenciesQueryKey }),
  });

  return {
    agenciesQuery,
    countriesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
