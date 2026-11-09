import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteUser,
  getUser,
  getUserStats,
  getUsers,
} from "../services/userService";

const usersQueryKey = ["users"];
const userStatsQueryKey = ["user-stats"];

export default function useUsers({ userId } = {}) {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: usersQueryKey,
    queryFn: getUsers,
  });

  const statsQuery = useQuery({
    queryKey: userStatsQueryKey,
    queryFn: getUserStats,
  });

  const userQuery = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: Boolean(userId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async (_data, deletedUserId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: usersQueryKey }),
        queryClient.invalidateQueries({ queryKey: userStatsQueryKey }),
        queryClient.removeQueries({ queryKey: ["user", deletedUserId] }),
      ]);
    },
  });

  return { usersQuery, statsQuery, userQuery, deleteMutation };
}
