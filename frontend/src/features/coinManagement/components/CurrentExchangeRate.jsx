import useCoinManagement from "../../../hooks/useCoinManagement";
import Skeleton from "../../../shared/components/loading/Skeleton";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function CurrentExchangeRate() {
  const { exchangeRateQuery } = useCoinManagement();
  const tiers = [
    { title: "Master Tier", price: exchangeRateQuery.data?.masterRate },
    { title: "Agency Tier", price: exchangeRateQuery.data?.agencyRate },
    { title: "User Tier", price: exchangeRateQuery.data?.userRate },
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      {/* Title */}
      <h2 className="text-xl font-bold text-[#1a1a1a] opacity-85 mb-5">
        Current Exchange Rate
      </h2>

      {/* Tiers */}
      {exchangeRateQuery.isPending && (
        <div
          role="status"
          aria-label="Loading exchange rates"
          className="flex flex-col gap-4"
        >
          {tiers.map(({ title }) => (
            <div
              key={title}
              className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-3 sm:px-6"
            >
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      )}
      {exchangeRateQuery.isError && (
        <p role="alert" className="text-sm text-red-600">
          Unable to load exchange rates:{" "}
          {getErrorMessage(exchangeRateQuery.error)}{" "}
          <button
            type="button"
            onClick={() => exchangeRateQuery.refetch()}
            disabled={exchangeRateQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {exchangeRateQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </p>
      )}
      {!exchangeRateQuery.isPending &&
        !exchangeRateQuery.isError &&
        (!exchangeRateQuery.data ||
          tiers.every((tier) => tier.price == null)) && (
          <p className="text-sm text-gray-500">No exchange rates are available.</p>
        )}
      {!exchangeRateQuery.isPending &&
        !exchangeRateQuery.isError &&
        exchangeRateQuery.data && (
          <div className="flex flex-col gap-4">
            {tiers.map((t) => (
          <div
            key={t.title}
            className="flex flex-col max-sm:gap-3 justify-start sm:flex-row sm:items-center sm:justify-between w-full border border-gray-200 rounded-lg sm:px-6 px-3 py-2 bg-white"
          >
            {/* Left */}
            <div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                {t.title}
              </h3>
              <p className="text-sm text-[#535353] font-medium">Exchange rate</p>
            </div>

            {/* Right */}
            <div className="sm:text-right text-left">
              <p className="text-xl font-bold text-[#1a1a1a]">
                {t.price ?? "—"}
              </p>
              <p className="text-sm text-[#535353] font-medium">per coin</p>
            </div>
          </div>
            ))}
          </div>
        )}
    </div>
  );
}
