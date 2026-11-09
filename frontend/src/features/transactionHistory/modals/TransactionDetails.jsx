const formatDate = (date) =>
  date && Number.isFinite(new Date(date).getTime())
    ? new Date(date).toLocaleString()
    : "—";

export default function TransactionDetailsModal({
  open,
  onClose,
  transaction,
}) {
  if (!open) return null;

  const details = [
    ["Transaction ID", transaction?.transactionId],
    ["Category", transaction?.category],
    ["Sender Type", transaction?.sender?.role ?? transaction?.sender?.type],
    [
      "Sender ID",
      transaction?.sender?.userId ?? transaction?.sender?.agencyId,
    ],
    ["Receiver Type", transaction?.receiver?.type],
    ["Receiver Agency ID", transaction?.receiver?.agencyId],
    ["Coin Amount", Number(transaction?.coins || 0).toLocaleString()],
    ["Price", transaction?.price],
    ["Date", formatDate(transaction?.createdAt)],
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FDFDFD] w-full max-w-md rounded-xl shadow-lg sm:px-6 sm:py-4 p-4 relative animatefadeIn">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close transaction details"
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-md sm:text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Transaction Details
        </h2>

        <div className="space-y-2 text-sm sm:text-base">
          {details.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <p className="font-medium text-gray-700">{label}:</p>
              <p className="break-all text-right text-gray-800">
                {value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
