import { AlertCircle, Funnel, RotateCw, SquarePen, Trash2 } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import star from "../../../assets/image 343.svg";
import { useNavigate } from "react-router-dom";
import FilterByStatusDropdown from "../../../shared/components/FilterByStatus";
import useSupport from "../../../hooks/useSupport";
import SupportAgencyTableSkeleton from "./SupportAgencyTableSkeleton";
import { getErrorMessage } from "../../../shared/utils/supportAgencyUtils";
import useDebounce from "../../../shared/hooks/useDebounce";

export default function SupportAgencyList() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [filterPosition, setFilterPosition] = useState(null);
  const filterButtonRef = useRef(null);
  const filterMenuRef = useRef(null);
  const debouncedSearch = useDebounce(search.trim().toLowerCase());
  const { agenciesQuery, deleteMutation } = useSupport();
  const agencies = agenciesQuery.data ?? [];

  useLayoutEffect(() => {
    if (!openFilter) return undefined;

    const updateFilterPosition = () => {
      const buttonRect = filterButtonRef.current?.getBoundingClientRect();
      const menuHeight = filterMenuRef.current?.offsetHeight ?? 0;
      if (!buttonRect) return;

      const viewportPadding = 8;
      const spaceBelow =
        window.innerHeight - buttonRect.bottom - viewportPadding;
      const spaceAbove = buttonRect.top - viewportPadding;
      const shouldOpenAbove =
        spaceBelow < menuHeight && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        0,
        (shouldOpenAbove ? spaceAbove : spaceBelow) - 8,
      );
      const top = shouldOpenAbove
        ? Math.max(
            viewportPadding,
            buttonRect.top - Math.min(menuHeight, maxHeight) - 8,
          )
        : buttonRect.bottom + 8;
      const width = filterMenuRef.current?.offsetWidth ?? 224;
      const left = Math.min(
        Math.max(viewportPadding, buttonRect.left),
        Math.max(viewportPadding, window.innerWidth - width - viewportPadding),
      );

      setFilterPosition({ top, left, maxHeight });
    };

    updateFilterPosition();
    window.addEventListener("resize", updateFilterPosition);
    window.addEventListener("scroll", updateFilterPosition, true);

    return () => {
      window.removeEventListener("resize", updateFilterPosition);
      window.removeEventListener("scroll", updateFilterPosition, true);
    };
  }, [openFilter]);

  const filteredAgencies = agencies.filter((agency) => {
    const matchesStatus =
      statusFilter === "all" || agency.status === statusFilter;
    const matchesSearch =
      !debouncedSearch ||
      agency.agencyId?.toLowerCase().includes(debouncedSearch) ||
      agency.name?.toLowerCase().includes(debouncedSearch);

    return matchesStatus && matchesSearch;
  });

  const handleDelete = (agency) => {
    if (window.confirm(`Delete support agency "${agency.name}"?`)) {
      deleteMutation.mutate(agency._id);
    }
  };

  return (
    <div className="w-full mb-10">
      {/* search area */}
      <div className="relative z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 sm:gap-10 gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by agency ID or name"
        />
        <div className="flex items-center sm:gap-3 gap-2">
          <div>
            <button
              ref={filterButtonRef}
              type="button"
              onClick={() => setOpenFilter((prev) => !prev)}
              className="px-3 sm:px-4 py-1.5 rounded-md bg-white border border-[#CCCCCC] font-medium flex items-center gap-2"
            >
              <Funnel size={18} /> Filter
            </button>

            {openFilter &&
              createPortal(
                <div
                  ref={filterMenuRef}
                  className="fixed z-100 overflow-y-auto rounded-lg"
                  style={{
                    top: filterPosition?.top ?? 0,
                    left: filterPosition?.left ?? 8,
                    maxHeight:
                      filterPosition?.maxHeight ?? "calc(100vh - 16px)",
                    visibility: filterPosition ? "visible" : "hidden",
                  }}
                >
                  <FilterByStatusDropdown
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    onClose={() => setOpenFilter(false)}
                  />
                </div>,
                document.body,
              )}
          </div>
          <button
            onClick={() =>
              navigate("/dashboard/support-agency/add-support-agency")
            }
            className="sm:px-5 px-2 py-2 w-30 rounded-md bg-[#FF9080] text-white font-medium text-sm sm:text-md max-sm:w-full"
          >
            Add Agency
          </button>
        </div>
      </div>

      {deleteMutation.isError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold">Unable to delete support agency</p>
            <p className="mt-1 wrap-break-words">
              {getErrorMessage(deleteMutation.error)}
            </p>
          </div>
        </div>
      )}

      {/* Table Area */}
      <div className="relative z-0 bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Agency ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Gender</th>
                <th className="p-3">Level</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Location</th>
                <th className="p-3 pl-4">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {agenciesQuery.isPending && <SupportAgencyTableSkeleton />}
              {agenciesQuery.isError && (
                <tr>
                  <td colSpan="8" className="p-6">
                    <div
                      role="alert"
                      className="mx-auto flex max-w-xl items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-left text-red-800"
                    >
                      <AlertCircle
                        size={22}
                        className="mt-0.5 shrink-0 text-red-600"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">
                          Could not load support agencies
                        </p>
                        <p className="mt-1 wrap-break-words text-sm">
                          {getErrorMessage(agenciesQuery.error)}
                        </p>
                        <button
                          type="button"
                          onClick={() => agenciesQuery.refetch()}
                          className="mt-3 inline-flex items-center gap-2 rounded-md bg-red-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-800"
                        >
                          <RotateCw size={15} />
                          Try again
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {!agenciesQuery.isPending &&
                !agenciesQuery.isError &&
                filteredAgencies.length === 0 && (
                  <tr>
                    <td colSpan="8" className="p-5 text-center text-gray-500">
                      No support agencies found.
                    </td>
                  </tr>
                )}
              {filteredAgencies.map((agency) => (
                <tr
                  key={agency._id}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">{agency.agencyId}</td>
                  <td className="p-3">{agency.name}</td>
                  <td className="p-3">{agency.gender}</td>
                  <td className="p-3">
                    {agency.level && (
                      <span className="p-1 text-xs bg-linear-to-b from-[#DCE0ED] to-[#705996] rounded-lg font-semibold text-white flex items-center gap-2 w-13">
                        <img src={star} alt="" className="w-4 h-4" />{" "}
                        {agency.level}
                      </span>
                    )}
                  </td>

                  <td className="p-3">{agency.phone}</td>
                  <td className="p-3">
                    {agency.location?.name ?? agency.location ?? "-"}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1 text-xs rounded-full font-semibold ${
                        agency.status === "active"
                          ? "bg-linear-to-r from-[#79D49B] to-[#25C962] text-[#005D23]"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {agency.status?.charAt(0).toUpperCase()}
                      {agency.status?.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 text-[#181717] text-sm font-medium cursor-pointer flex gap-5 items-center">
                    <button
                      type="button"
                      aria-label={`Edit ${agency.name}`}
                      onClick={() =>
                        navigate(
                          `/dashboard/support-agency/update-support-agency/${agency._id}`,
                        )
                      }
                    >
                      <SquarePen size={17} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${agency.name}`}
                      disabled={deleteMutation.isPending}
                      onClick={() => handleDelete(agency)}
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
