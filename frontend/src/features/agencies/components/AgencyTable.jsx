import { Eye, SquarePen, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAgencies from "../../../hooks/useAgencies";
import useViewModal from "../../../shared/hooks/useViewModal";
import useDebounce from "../../../shared/hooks/useDebounce";
import Skeleton from "../../../shared/components/loading/Skeleton";
import FilterAndAddAgency from "./FilterAndAddAgency";
import AgencyDetailsModal from "../modals/AgencyDetailsModal";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

const getCountryName = (country) =>
  typeof country === "object" ? country?.name ?? "—" : country ?? "—";

export default function AgencyTable({ type, agenciesQuery }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const debouncedSearch = useDebounce(search.trim().toLowerCase());
  const {
    open,
    selectedItem: agency,
    handleViewClick,
    handleClose,
  } = useViewModal();
  const { deleteMutation } = useAgencies();
  const agencies = agenciesQuery.data ?? [];
  const filteredAgencies = useMemo(() => {
    return agencies.filter((item) => {
      const matchesType = item.type?.toLowerCase() === type;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        !debouncedSearch ||
        [
          item.agencyId,
          item.agencyName,
          item.email,
          item.phone,
          getCountryName(item.country),
        ].some((value) => value?.toLowerCase().includes(debouncedSearch));

      return matchesType && matchesStatus && matchesSearch;
    });
  }, [agencies, debouncedSearch, statusFilter, type]);

  const handleDelete = (item) => {
    if (window.confirm(`Delete agency "${item.agencyName}"?`)) {
      deleteMutation.mutate(item._id);
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
          placeholder="Search by agency ID or name"
        />
        <FilterAndAddAgency
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>

      {deleteMutation.isError && (
        <p role="alert" className="mb-3 text-sm text-red-600">
          Unable to delete agency: {getErrorMessage(deleteMutation.error)}
        </p>
      )}

      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Agency ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Level</th>
                <th className="p-3">Beans</th>
                <th className="p-3">Coin Sell</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {agenciesQuery.isPending &&
                Array.from({ length: 5 }, (_, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#DFDFDF]"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 9 }, (_, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={`p-3 ${cellIndex === 0 ? "pl-5" : ""}`}
                      >
                        <Skeleton className="h-5 w-20" />
                      </td>
                    ))}
                  </tr>
                ))}
              {agenciesQuery.isError && (
                <tr>
                  <td colSpan="9" className="p-5 text-center text-red-600">
                    Unable to load agencies:{" "}
                    {getErrorMessage(agenciesQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => agenciesQuery.refetch()}
                      disabled={agenciesQuery.isFetching}
                      className="underline disabled:opacity-60"
                    >
                      {agenciesQuery.isFetching ? "Retrying..." : "Retry"}
                    </button>
                  </td>
                </tr>
              )}
              {!agenciesQuery.isPending &&
                !agenciesQuery.isError &&
                filteredAgencies.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 font-medium pl-5">{item.agencyId}</td>
                    <td className="p-3">{item.agencyName}</td>
                    <td className="p-3">
                      {item.level ? (
                        <span className="rounded-lg bg-linear-to-b from-[#DCE0ED] to-[#705996] p-1 text-xs font-semibold text-white">
                          {item.level}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="p-3">{item.beans ?? 0}</td>
                    <td className="p-3">—</td>
                    <td className="p-3">{item.coinBuy ?? 0}</td>
                    <td className="p-3">{getCountryName(item.country)}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-linear-to-r from-[#79D49B] to-[#25C962] px-4 py-1 text-xs font-semibold text-[#005D23]">
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          title="View agency details"
                          onClick={() => handleViewClick(item)}
                        >
                          <Eye size={20} />
                        </button>
                        <button
                          type="button"
                          title="Update agency details"
                          onClick={() =>
                            navigate(
                              `/dashboard/agencies/update-agency/${item._id}`,
                            )
                          }
                        >
                          <SquarePen size={20} />
                        </button>
                        <button
                          type="button"
                          title="Delete agency"
                          onClick={() => handleDelete(item)}
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 size={20} className="text-red-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!agenciesQuery.isPending &&
                !agenciesQuery.isError &&
                filteredAgencies.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-5 text-center text-gray-500">
                      {agencies.some((item) => item.type?.toLowerCase() === type)
                        ? "No agencies match your search or status filter."
                        : "No agencies have been added to this category."}
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
