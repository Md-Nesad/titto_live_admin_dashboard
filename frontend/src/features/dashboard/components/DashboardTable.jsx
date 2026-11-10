import { useMemo, useState } from "react";
import useViewModal from "../../../shared/hooks/useViewModal";
import FilterAndAddAgency from "../../agencies/components/FilterAndAddAgency";
import AgencyDetailsModal from "../../agencies/modals/AgencyDetailsModal";
import DashboardTableSkeleton from "../../../shared/components/loading/TableSkeleton";
import useDebounce from "../../../shared/hooks/useDebounce";
import capitalizeFirstLetter from "../../../shared/utils/capitalizeFirstLetter";
import formatCompactNumber from "../../../shared/utils/formatCompactNumber";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

const getCountryName = (country) =>
  typeof country === "object" ? country?.name ?? "—" : country ?? "—";

export default function DashboardTable({ agenciesQuery }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const debouncedSearch = useDebounce(search.trim().toLowerCase());
  const {
    open,
    selectedItem: agency,
    handleViewClick,
    handleClose,
  } = useViewModal();
  const agencies = agenciesQuery.data ?? [];
  const filteredAgencies = useMemo(() => {
    return agencies.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesSearch =
        !debouncedSearch ||
        [
          item.agencyId,
          item.agencyName,
          item.type,
          getCountryName(item.country),
        ].some((value) => value?.toLowerCase().includes(debouncedSearch));
      return matchesStatus && matchesSearch;
    });
  }, [agencies, debouncedSearch, statusFilter]);

  if (agenciesQuery.isPending) {
    return <DashboardTableSkeleton />;
  }

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

      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Agency ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Level</th>
                <th className="p-3">Beans</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
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
              {!agenciesQuery.isError &&
                filteredAgencies.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 font-medium pl-5">{item.agencyId}</td>
                    <td className="p-3">{item.agencyName}</td>
                    <td className="p-3 capitalize">{item.type}</td>
                    <td className="p-3">{item.level ?? 0}</td>
                    <td className="p-3">
                      {formatCompactNumber(item.beans || 0)}
                    </td>
                    <td className="p-3">
                      {formatCompactNumber(item.coinBuy || 0)}
                    </td>
                    <td className="p-3">{getCountryName(item.country)}</td>
                    <td className="p-3">
                      <span
                        className={`px-4 py-1 text-xs rounded-full font-semibold ${
                          item.status?.toLowerCase() === "pending"
                            ? "bg-[#FEF3C7] text-[#92400E]"
                            : "bg-linear-to-r from-[#79D49B] to-[#25C962] text-[#005D23]"
                        }`}
                      >
                        {capitalizeFirstLetter(item.status)}
                      </span>
                    </td>
                    <td className="p-3 text-[#181717] text-sm font-medium">
                      <button
                        type="button"
                        onClick={() => handleViewClick(item)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              {!agenciesQuery.isError &&
                filteredAgencies.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-5 text-center text-gray-500">
                      {agencies.length
                        ? "No agencies match your search or status filter."
                        : "No agencies found."}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {open && (
            <AgencyDetailsModal
              open={open}
              onClose={handleClose}
              agency={agency}
            />
          )}
        </div>
      </div>
    </div>
  );
}
