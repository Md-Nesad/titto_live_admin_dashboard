import Skeleton from "../../../shared/components/loading/Skeleton";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function UserDetailsModal({
  open,
  onClose,
  user,
  userQuery,
}) {
  if (!open) return null;

  const details = [
    ["User Name", user?.userName],
    ["User ID", user?.userId],
    ["Email", user?.email],
    ["Type", user?.userType ?? "Normal"],
    ["Role", user?.role],
    ["Status", user?.isVerified ? "Verified" : "Unverified"],
    ["Level", user?.level ?? 0],
    ["Beans", Number(user?.beans || 0).toLocaleString()],
    ["Coin Buy", Number(user?.coinBuy || 0).toLocaleString()],
    [
      "Registration Time",
      user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—",
    ],
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-[#FDFDFD] w-full max-w-md rounded-xl shadow-lg sm:px-6 sm:py-4 p-4 relative animatefadeIn">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close user details"
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-md sm:text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          User Details
        </h2>

        {userQuery?.isPending && (
          <div
            role="status"
            aria-label="Loading user details"
            className="space-y-3"
          >
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton key={index} className="h-5 w-full" />
            ))}
          </div>
        )}
        {userQuery?.isError && (
          <p role="alert" className="text-sm text-red-600">
            Unable to load user details: {getErrorMessage(userQuery.error)}{" "}
            <button
              type="button"
              onClick={() => userQuery.refetch()}
              disabled={userQuery.isFetching}
              className="underline disabled:opacity-60"
            >
              {userQuery.isFetching ? "Retrying..." : "Retry"}
            </button>
          </p>
        )}
        {!userQuery?.isPending && !userQuery?.isError && user && (
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
        )}
      </div>
    </div>
  );
}
