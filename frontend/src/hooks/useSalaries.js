import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSalary,
  deleteSalary,
  getSalaries,
  updateSalary,
} from "../services/salaryService";

const salariesQueryKey = ["salaries"];

export default function useSalaries() {
  const queryClient = useQueryClient();

  const salariesQuery = useQuery({
    queryKey: salariesQueryKey,
    queryFn: getSalaries,
  });

  const createMutation = useMutation({
    mutationFn: createSalary,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: salariesQueryKey }),
  });

  const updateMutation = useMutation({
    mutationFn: updateSalary,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: salariesQueryKey }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSalary,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: salariesQueryKey }),
  });

  return { salariesQuery, createMutation, updateMutation, deleteMutation };
}