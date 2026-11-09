import { useMemo, useState } from "react";
import useAgencies from "../../../hooks/useAgencies";
import useCoinManagement from "../../../hooks/useCoinManagement";

const initialForm = { agencyId: "", coins: "" };

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function SellCoins() {
  const [formData, setFormData] = useState(initialForm);
  const { agenciesQuery } = useAgencies();
  const { exchangeRateQuery, sellCoinsMutation } = useCoinManagement();
  const agencies = agenciesQuery.data ?? [];
  const agency = agencies.find((item) => item.agencyId === formData.agencyId);
  const rate = useMemo(() => {
    if (!agency || !exchangeRateQuery.data) return 0;
    const type = agency.type?.toLowerCase();
    if (type === "master") return Number(exchangeRateQuery.data.masterRate) || 0;
    if (type === "coin") return Number(exchangeRateQuery.data.agencyRate) || 0;
    return Number(exchangeRateQuery.data.userRate) || 0;
  }, [agency, exchangeRateQuery.data]);
  const totalPrice = (Number(formData.coins) || 0) * rate;

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    sellCoinsMutation.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!agency) return;
    sellCoinsMutation.mutate(
      {
        agencyId: agency.agencyId,
        coins: Number(formData.coins),
        price: totalPrice,
        category: agency.type,
      },
      {
        onSuccess: () => setFormData(initialForm),
      },
    );
  };

  return (
    <div className="bg-white rounded-md p-6 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      <h2 className="text-[22px] font-semibold text-gray-800 mt-2">
        Sell Coins
      </h2>
      <p className="text-gray-500 text-md mb-7">Transfer coins from platform</p>

      <form
        id="sell-coins-form"
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:ml-10"
      >
        <label className="flex flex-col gap-1 mb-3 text-[15px] font-medium text-gray-700">
          Research ID
          <select
            name="agencyId"
            value={formData.agencyId}
            onChange={handleChange}
            required
            disabled={agenciesQuery.isPending || agencies.length === 0}
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
          >
            <option value="">Select Agency ID</option>
            {agencies.map((item) => (
              <option key={item._id} value={item.agencyId}>
                {item.agencyId} - {item.agencyName}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 mb-3 text-[15px] font-medium text-gray-700">
          Category
          <select
            value={agency?.type ?? ""}
            disabled
            className="border border-[#626060] rounded-md px-3 py-2 text-[15px] text-[#636363] disabled:bg-gray-100"
          >
            <option value="">Select</option>
            {agency && <option value={agency.type}>{agency.type}</option>}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-[15px] font-medium text-gray-700">
          Number of Coins
          <input
            name="coins"
            type="number"
            min="1"
            step="1"
            value={formData.coins}
            onChange={handleChange}
            placeholder="Enter Amount"
            required
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-[15px] font-medium text-gray-700">
          Price
          <input
            value={totalPrice ? totalPrice.toFixed(2) : ""}
            type="number"
            readOnly
            className="border border-[#626060] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </label>
      </form>

      {agenciesQuery.isPending && (
        <p role="status" className="mt-3 text-sm text-gray-500">
          Loading agencies...
        </p>
      )}
      {agenciesQuery.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          Unable to load agencies: {getErrorMessage(agenciesQuery.error)}{" "}
          <button
            type="button"
            onClick={() => agenciesQuery.refetch()}
            disabled={agenciesQuery.isFetching}
            className="underline disabled:opacity-60"
          >
            {agenciesQuery.isFetching ? "Retrying..." : "Retry"}
          </button>
        </p>
      )}
      {exchangeRateQuery.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
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
      {!agenciesQuery.isPending &&
        !agenciesQuery.isError &&
        agencies.length === 0 && (
          <p className="mt-3 text-sm text-gray-500">No agencies available.</p>
        )}
      {sellCoinsMutation.isError && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          Unable to sell coins: {getErrorMessage(sellCoinsMutation.error)}
        </p>
      )}
      {sellCoinsMutation.isSuccess && (
        <p role="status" className="mt-3 text-sm text-green-700">
          Coins sold successfully.
        </p>
      )}

      <div className="flex justify-center sm:justify-end items-center gap-2 mt-6">
        <button
          type="button"
          onClick={() => {
            setFormData(initialForm);
            sellCoinsMutation.reset();
          }}
          className="px-10 py-1 rounded-md border border-[#CCCCCC] text-[#181717] bg-white hover:bg-gray-200 font-[490]"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="sell-coins-form"
          disabled={
            !agency ||
            !rate ||
            agenciesQuery.isPending ||
            exchangeRateQuery.isPending ||
            sellCoinsMutation.isPending
          }
          className="px-12 py-1 rounded-md text-white font-medium bg-secondary hover:bg-primary transition-colors duration-100 disabled:opacity-60"
        >
          {sellCoinsMutation.isPending ? "Selling..." : "Sell Coins"}
        </button>
      </div>
    </div>
  );
}
