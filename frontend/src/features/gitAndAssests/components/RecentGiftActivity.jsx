import formatTimeAgo from "../../../shared/utils/formatTimeAgo";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

const getGiftCreationTime = (gift) => {
  const createdAt = new Date(gift.createdAt).getTime();
  if (Number.isFinite(createdAt)) return createdAt;

  const objectIdTimestamp = String(gift._id ?? "").slice(0, 8);
  return /^[\da-f]{8}$/i.test(objectIdTimestamp)
    ? Number.parseInt(objectIdTimestamp, 16) * 1000
    : null;
};

export default function RecentGiftActivity({ giftsQuery }) {
  const gifts = giftsQuery.data ?? [];
  const recentGifts = [...gifts].sort(
    (first, second) =>
      (getGiftCreationTime(second) ?? 0) -
        (getGiftCreationTime(first) ?? 0) ||
      String(second._id).localeCompare(String(first._id)),
  );

  return (
    <div
      aria-busy={giftsQuery.isPending}
      className="w-full mx-auto bg-white rounded-lg p-3 sm:p-5 shadow mb-10 border border-[#E5E7EB]"
    >
      <h2 className="text-lg font-semibold mb-4">Recent Gift Activity</h2>

      {giftsQuery.isPending && (
        <div
          role="status"
          aria-label="Loading gifts"
          className="space-y-3"
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-[#ABABAB54] px-3 py-3 sm:px-4"
            >
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <div className="h-10 w-15 shrink-0 animate-pulse rounded-md bg-gray-200" />
                <div className="space-y-2">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
              <div className="ml-3 h-4 w-16 shrink-0 animate-pulse rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}
      {giftsQuery.isError && (
        <p role="alert" className="py-3 text-sm text-red-600">
          Unable to load gifts: {getErrorMessage(giftsQuery.error)}{" "}
          <button
            type="button"
            onClick={() => giftsQuery.refetch()}
            disabled={giftsQuery.isFetching}
            className="underline"
          >
            {giftsQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </p>
      )}
      {!giftsQuery.isPending && !giftsQuery.isError && gifts.length === 0 && (
        <p className="py-3 text-sm text-gray-500">No gifts have been added yet.</p>
      )}

      {!giftsQuery.isPending && !giftsQuery.isError && gifts.length > 0 && (
        <div className="space-y-3">
          {recentGifts.map((gift) => (
            <div
              key={gift._id}
              className="flex items-center justify-between border border-[#ABABAB54] rounded-lg px-3 sm:px-4 py-3"
            >
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                {gift.giftImage && (
                  <img
                    src={gift.giftImage}
                    alt={gift.giftName}
                    className="h-10 w-15 shrink-0 rounded-md object-cover"
                  />
                )}
                <div className="min-w-0 space-y-1">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {gift.giftName}
                  </p>
                  <p className="text-xs font-medium text-gray-500">
                    Sent{" "}
                    {formatTimeAgo(
                      getGiftCreationTime(gift) ?? Number.NaN,
                    )}
                  </p>
                </div>
              </div>

              <div className="ml-3 shrink-0 text-sm sm:text-md font-semibold text-gray-900">
                {gift.giftPrice} coins
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
