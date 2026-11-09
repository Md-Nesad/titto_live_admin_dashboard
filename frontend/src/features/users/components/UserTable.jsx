import { Eye, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import useUsers from "../../../hooks/useUsers";
import Skeleton from "../../../shared/components/loading/Skeleton";
import useViewModal from "../../../shared/hooks/useViewModal";
import useDebounce from "../../../shared/hooks/useDebounce";
import UserDetailsModal from "../modals/userDetailsModal";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function UserTable() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search.trim().toLowerCase());
  const {
    open,
    selectedItem: selectedUser,
    handleViewClick,
    handleClose,
  } = useViewModal();
  const { usersQuery, userQuery, deleteMutation } = useUsers({
    userId: selectedUser?._id,
  });
  const users = usersQuery.data ?? [];
  const filteredUsers = useMemo(() => {
    if (!debouncedSearch) return users;

    return users.filter((user) =>
      [user.userId, user.userName, user.email, user.userType]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(debouncedSearch)),
    );
  }, [debouncedSearch, users]);

  const handleDelete = (user) => {
    if (window.confirm(`Delete user "${user.userName}"?`)) {
      deleteMutation.mutate(user._id);
    }
  };

  return (
    <div className="w-full mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:gap-10 gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by user ID, name or email"
        />
      </div>

      {deleteMutation.isError && (
        <p role="alert" className="mb-3 text-sm text-red-600">
          Unable to delete user: {getErrorMessage(deleteMutation.error)}
        </p>
      )}

      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Level</th>
                <th className="p-3">Beans</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersQuery.isPending &&
                Array.from({ length: 5 }, (_, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-t border-[#DFDFDF]"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 8 }, (_, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 ${cellIndex === 0 ? "pl-5" : ""}`}
                      >
                        <Skeleton className="h-5 w-20" />
                      </td>
                    ))}
                  </tr>
                ))}
              {usersQuery.isError && (
                <tr>
                  <td colSpan="8" className="p-5 text-center text-red-600">
                    Unable to load users: {getErrorMessage(usersQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => usersQuery.refetch()}
                      disabled={usersQuery.isFetching}
                      className="underline disabled:opacity-60"
                    >
                      {usersQuery.isFetching ? "Retrying..." : "Retry"}
                    </button>
                  </td>
                </tr>
              )}
              {!usersQuery.isPending &&
                !usersQuery.isError &&
                filteredUsers.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 font-medium pl-5">{user.userId}</td>
                    <td className="p-3">{user.userName}</td>
                    <td className="p-3">{user.userType ?? "Normal"}</td>
                    <td className="p-3">{user.level ?? 0}</td>
                    <td className="p-3">
                      {Number(user.beans || 0).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {Number(user.coinBuy || 0).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="px-4 py-1 text-xs bg-linear-to-r from-[#79D49B] to-[#25C962] text-[#005D23] rounded-full font-semibold">
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          onClick={() => handleViewClick(user)}
                          title="View user"
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(user)}
                          disabled={deleteMutation.isPending}
                          title="Delete user"
                        >
                          <Trash2
                            size={20}
                            className="text-red-500 disabled:opacity-60"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!usersQuery.isPending &&
                !usersQuery.isError &&
                filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-5 text-center text-gray-500">
                      {users.length
                        ? "No users match your search."
                        : "No users found."}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {open && (
        <UserDetailsModal
          open={open}
          onClose={handleClose}
          user={userQuery.data}
          userQuery={userQuery}
        />
      )}
    </div>
  );
}
