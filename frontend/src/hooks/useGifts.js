import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createGift,
  deleteGift,
  getGift,
  getGiftStats,
  getGifts,
  updateGift,
} from "../services/giftServices";

const giftsQueryKey = ["gifts"];
const giftStatsQueryKey = ["gift-stats"];

export default function useGifts({
  giftId,
  includeGifts = true,
  includeStats = true,
} = {}) {
  const queryClient = useQueryClient();

  const giftsQuery = useQuery({
    queryKey: giftsQueryKey,
    queryFn: getGifts,
    enabled: includeGifts,
  });

  const statsQuery = useQuery({
    queryKey: giftStatsQueryKey,
    queryFn: getGiftStats,
    enabled: includeStats,
  });

  const giftQuery = useQuery({
    queryKey: ["gift", giftId],
    queryFn: () => getGift(giftId),
    enabled: Boolean(giftId),
  });

  const invalidateGiftData = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: giftsQueryKey }),
      queryClient.invalidateQueries({ queryKey: giftStatsQueryKey }),
    ]);
  };

  const createMutation = useMutation({
    mutationFn: createGift,
    onSuccess: invalidateGiftData,
  });

  const updateMutation = useMutation({
    mutationFn: updateGift,
    onSuccess: async (_data, variables) => {
      await invalidateGiftData();
      await queryClient.invalidateQueries({
        queryKey: ["gift", variables.id],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteGift,
    onSuccess: invalidateGiftData,
  });

  return {
    giftsQuery,
    statsQuery,
    giftQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}
