import { Eye } from "lucide-react";
import useTransactions from "../../../hooks/useTransactions";
import Skeleton from "../../../shared/components/loading/Skeleton";
import useViewModal from "../../../shared/hooks/useViewModal";
import AgencyDetailsModal from "../../agencies/modals/AgencyDetailsModal";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString()
    : "—";

export default function RateTransactionTable() {
  const { rateTransactionsQuery } = useTransactions({ includeHistory: false });
  const {
    open,
    selectedItem: agency,
    handleViewClick,
    handleClose,
  } = useViewModal();
  const transactions = rateTransactionsQuery.data ?? [];

  return (
    <div className="w-full mb-10 mt-1">
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-nowrap">
            <thead>
              <tr className="text-[#535353] text-md font-medium">
                <th className="p-3 pl-5">Agency ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Beans</th>
                <th className="p-3">Last Updated</th>
                <th className="p-3 sm:pl-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {rateTransactionsQuery.isPending &&
                Array.from({ length: 5 }, (_, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#DFDFDF]"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 7 }, (_, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 ${cellIndex === 0 ? "pl-5" : ""}`}
                      >
                        <Skeleton className="h-5 w-20" />
                      </td>
                    ))}
                  </tr>
                ))}
              {rateTransactionsQuery.isError && (
                <tr>
                  <td colSpan="7" className="p-5 text-center text-red-600">
                    Unable to load rate transactions:{" "}
                    {getErrorMessage(rateTransactionsQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => rateTransactionsQuery.refetch()}
                      disabled={rateTransactionsQuery.isFetching}
                      className="underline disabled:opacity-60"
                    >
                      {rateTransactionsQuery.isFetching
                        ? "Retrying..."
                        : "Retry"}
                    </button>
                  </td>
                </tr>
              )}
              {!rateTransactionsQuery.isPending &&
                !rateTransactionsQuery.isError &&
                transactions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 font-medium pl-5">{item.agencyId}</td>
                    <td className="p-3">{item.agencyName}</td>
                    <td className="p-3 capitalize">{item.type}</td>
                    <td className="p-3">{item.coinBuy?.toLocaleString()}</td>
                    <td className="p-3 text-[#00D519]">
                      {item.beans?.toLocaleString()}
                    </td>
                    <td className="p-3">{formatDate(item.updatedAt)}</td>
                    <td className="p-3">
                      <button
                        type="button"
                        onClick={() => handleViewClick(item)}
                        title="View agency details"
                      >
                        <Eye size={19} />
                      </button>
                    </td>
                  </tr>
                ))}
              {!rateTransactionsQuery.isPending &&
                !rateTransactionsQuery.isError &&
                transactions.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-5 text-center text-gray-500">
                      No rate transactions found.
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
        {open && (
          <AgencyDetailsModal
            open={open}
            onClose={handleClose}
            agency={agency}
          />
        )}
      </div>
    </div>
  );
}
