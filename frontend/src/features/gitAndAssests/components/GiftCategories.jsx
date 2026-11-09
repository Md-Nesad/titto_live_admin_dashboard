import Skeleton from "../../../shared/components/loading/Skeleton";

const categoryCardColors = [
  ["bg-[#36A8FF52]", "text-[#0C00E6]"],
  ["bg-[#FFDEFE52]", "text-[#DE06ED]"],
  ["bg-[#86ADFF52]", "text-[#170EBA]"],
  ["bg-[#94FFFA52]", "text-[#00D7E6]"],
  ["bg-[#95F7E852]", "text-[#00D7E6]"],
];

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function GiftCategories({ statsQuery }) {
  if (statsQuery.isPending) {
    return (
      <div
        role="status"
        aria-label="Loading gift categories"
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-10 sm:pr-2"
      >
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="rounded-md bg-white px-8 py-5 text-center shadow-sm"
          >
            <Skeleton className="mx-auto mb-3 h-4 w-20" />
            <Skeleton className="mx-auto h-6 w-10" />
          </div>
        ))}
      </div>
    );
  }

  if (statsQuery.isError) {
    return (
      <p role="alert" className="text-sm text-red-600">
        Unable to load gift categories: {getErrorMessage(statsQuery.error)}{" "}
        <button
          type="button"
          onClick={() => statsQuery.refetch()}
          disabled={statsQuery.isFetching}
          className="underline"
        >
          {statsQuery.isFetching ? "Retrying..." : "Retry"}
        </button>
      </p>
    );
  }

  const categories = statsQuery.data ?? [];
  if (categories.length === 0) {
    return <p className="text-sm text-gray-500">No gift categories yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-10 sm:pr-2">
      {categories.map((category, index) => {
        const [backgroundColor, textColor] =
          categoryCardColors[index % categoryCardColors.length];

        return (
          <div
            key={category._id}
            className={`${backgroundColor} py-5 px-8 rounded-md shadow-sm text-center`}
          >
            <p className="text-sm text-[#6F6E6E] font-medium mb-3">
              {category._id}
            </p>
            <h3 className={`text-xl font-bold ${textColor}`}>
              {category.totalGift}
            </h3>
          </div>
        );
      })}
    </div>
  );
}
