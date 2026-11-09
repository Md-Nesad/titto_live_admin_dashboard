import { Eye } from "lucide-react";
import { useMemo, useState } from "react";
import useViewModal from "../../../shared/hooks/useViewModal";
import useDebounce from "../../../shared/hooks/useDebounce";
import Skeleton from "../../../shared/components/loading/Skeleton";
import TransactionDetailsModal from "../modals/TransactionDetails";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

const getSenderId = (sender) => sender?.userId || sender?.agencyId || "—";
const getSenderType = (sender) => sender?.role || sender?.type || "—";

const formatDate = (date) =>
  date && Number.isFinite(new Date(date).getTime())
    ? new Date(date).toLocaleDateString()
    : "—";

export default function CoinSenderTable({ transactionHistoryQuery }) {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim().toLowerCase());
  const {
    open,
    selectedItem: transaction,
    handleViewClick,
    handleClose,
  } = useViewModal();
  const transactions = transactionHistoryQuery.data ?? [];
  const filteredTransactions = useMemo(() => {
    if (!debouncedSearch) return transactions;
    return transactions.filter((item) =>
      [
        item.transactionId,
        item.category,
        item.sender?.userId,
        item.sender?.agencyId,
        item.sender?.role,
        item.sender?.type,
        item.receiver?.agencyId,
        item.receiver?.type,
      ].some((value) =>
        String(value ?? "").toLowerCase().includes(debouncedSearch),
      ),
    );
  }, [debouncedSearch, transactions]);

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:gap-10 gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by transaction ID or agency"
        />
      </div>

      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Transaction ID</th>
                <th className="p-3">Sender Type</th>
                <th className="p-3">Sender User ID</th>
                <th className="p-3">Receiver Type</th>
                <th className="p-3">Coin Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3 pl-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {transactionHistoryQuery.isPending &&
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
              {transactionHistoryQuery.isError && (
                <tr>
                  <td colSpan="7" className="p-5 text-center text-red-600">
                    Unable to load transaction history:{" "}
                    {getErrorMessage(transactionHistoryQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => transactionHistoryQuery.refetch()}
                      disabled={transactionHistoryQuery.isFetching}
                      className="underline disabled:opacity-60"
                    >
                      {transactionHistoryQuery.isFetching
                        ? "Retrying..."
                        : "Retry"}
                    </button>
                  </td>
                </tr>
              )}
              {!transactionHistoryQuery.isPending &&
                !transactionHistoryQuery.isError &&
                filteredTransactions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 font-medium pl-5">
                      {item.transactionId}
                    </td>
                    <td className="p-3 capitalize">
                      {getSenderType(item.sender)}
                    </td>
                    <td className="p-3">{getSenderId(item.sender)}</td>
                    <td className="p-3 capitalize">
                      {item.receiver?.type ?? "—"}
                    </td>
                    <td className="p-3">
                      {Number(item.coins || 0).toLocaleString()}
                    </td>
                    <td className="p-3">{formatDate(item.createdAt)}</td>
                    <td className="p-3 pl-4.5">
                      <button
                        type="button"
                        onClick={() => handleViewClick(item)}
                        title="View transaction details"
                      >
                        <Eye size={18} className="cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              {!transactionHistoryQuery.isPending &&
                !transactionHistoryQuery.isError &&
                filteredTransactions.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-5 text-center text-gray-500">
                      {transactions.length
                        ? "No transactions match your search."
                        : "No transactions found."}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {open && (
            <TransactionDetailsModal
              open={open}
              onClose={handleClose}
              transaction={transaction}
            />
          )}
        </div>
      </div>
    </div>
  );
}
