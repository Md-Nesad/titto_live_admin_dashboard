import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAgency,
  deleteAgency,
  getAgencies,
  getAgency,
  getAgencyCountries,
  updateAgency,
} from "../services/agencyService";

const agenciesQueryKey = ["agencies"];
const countriesQueryKey = ["agency-countries"];

export default function useAgencies({
  agencyId,
  includeAgencies = true,
  includeCountries = false,
} = {}) {
  const queryClient = useQueryClient();
  const invalidateAgencyData = async (updatedAgencyId) => {
    const queryKeys = [
      agenciesQueryKey,
      ["rate-transactions"],
      ["transaction-history"],
    ];
    if (updatedAgencyId) queryKeys.push(["agency", updatedAgencyId]);

    await Promise.all(
      queryKeys.map((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      ),
    );
  };

  const agenciesQuery = useQuery({
    queryKey: agenciesQueryKey,
    queryFn: getAgencies,
    enabled: includeAgencies,
  });

  const agencyQuery = useQuery({
    queryKey: ["agency", agencyId],
    queryFn: () => getAgency(agencyId),
    enabled: Boolean(agencyId),
  });

  const countriesQuery = useQuery({
    queryKey: countriesQueryKey,
    queryFn: getAgencyCountries,
    enabled: includeCountries,
  });

  const createMutation = useMutation({
    mutationFn: createAgency,
    onSuccess: () => invalidateAgencyData(),
  });

  const updateMutation = useMutation({
    mutationFn: updateAgency,
    onSuccess: (_data, variables) =>
      invalidateAgencyData(variables.agencyId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAgency,
    onSuccess: (_data, deletedAgencyId) =>
      invalidateAgencyData(deletedAgencyId),
  });

  return {
    agenciesQuery,
    agencyQuery,
    countriesQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
