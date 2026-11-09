import { useEffect, useState } from "react";
import useCoinManagement from "../../../hooks/useCoinManagement";

const initialRates = {
  masterRate: "",
  agencyRate: "",
  userRate: "",
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function UpdateExchangeRate() {
  const { exchangeRateQuery, updateRateMutation } = useCoinManagement();
  const [rates, setRates] = useState(initialRates);

  useEffect(() => {
    if (exchangeRateQuery.data) {
      setRates({
        masterRate: exchangeRateQuery.data.masterRate ?? "",
        agencyRate: exchangeRateQuery.data.agencyRate ?? "",
        userRate: exchangeRateQuery.data.userRate ?? "",
      });
    }
  }, [exchangeRateQuery.data]);

  const handleChange = (event) => {
    setRates((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateRateMutation.mutate({
      masterRate: Number(rates.masterRate),
      agencyRate: Number(rates.agencyRate),
      userRate: Number(rates.userRate),
    });
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      <h2 className="text-xl font-semibold text-gray-800">
        Update Exchange Rates
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Modify coin exchange rates for different tiers
      </p>

      {exchangeRateQuery.isError && (
        <p role="alert" className="mt-4 text-sm text-red-600">
          Could not load current rates:{" "}
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

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        {[
          ["masterRate", "Master Rate"],
          ["agencyRate", "Agency Rate"],
          ["userRate", "User Rate"],
        ].map(([name, label]) => (
          <label key={name} className="block text-sm font-medium text-gray-700">
            {label}
            <input
              name={name}
              type="number"
              min="0"
              step="any"
              required
              value={rates[name]}
              onChange={handleChange}
              disabled={exchangeRateQuery.isPending || updateRateMutation.isPending}
              className="w-full mt-1 rounded-md px-3 py-1.5 focus:outline-none border border-[#626060] disabled:bg-gray-100"
            />
          </label>
        ))}

        {updateRateMutation.isError && (
          <p role="alert" className="text-sm text-red-600">
            Unable to update rates: {getErrorMessage(updateRateMutation.error)}
          </p>
        )}
        {updateRateMutation.isSuccess && (
          <p role="status" className="text-sm text-green-700">
            Exchange rates updated successfully.
          </p>
        )}

        <div className="flex justify-center sm:justify-end mt-8 gap-4">
          <button
            type="submit"
            disabled={exchangeRateQuery.isPending || updateRateMutation.isPending}
            className="px-10 py-1 rounded-md text-white text-sm font-medium bg-secondary hover:bg-primary transition-colors disabled:opacity-60"
          >
            {updateRateMutation.isPending ? "Updating..." : "Update Rates"}
          </button>
        </div>
      </form>
    </div>
  );
}
