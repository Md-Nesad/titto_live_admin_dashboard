import { Funnel } from "lucide-react";
import { useMemo, useState } from "react";
import useViewModal from "../../../shared/hooks/useViewModal";
import AddGiftModal from "../modals/AddGiftModal";
import UpdateGiftModal from "../modals/UpdateGiftModal";
import useGifts from "../../../hooks/useGifts";
import giftCategories from "../giftCategories";
import Skeleton from "../../../shared/components/loading/Skeleton";

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function GiftListTable({ giftsQuery }) {
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const {
    open: edit,
    selectedItem,
    handleViewClick,
    handleClose,
  } = useViewModal();

  const { giftQuery, deleteMutation } = useGifts({
    giftId: selectedItem?._id,
    includeGifts: false,
    includeStats: false,
  });

  const gifts = giftsQuery.data ?? [];

  const filteredGifts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return gifts.filter((gift) => {
      const matchesCategory =
        selectedCategory === "all" || gift.category === selectedCategory;
      const matchesSearch =
        !normalizedSearch ||
        [gift.giftName, gift.category].some((value) =>
          value?.toLowerCase().includes(normalizedSearch),
        );
      return matchesCategory && matchesSearch;
    });
  }, [gifts, search, selectedCategory]);

  const handleDelete = (gift) => {
    if (window.confirm(`Delete "${gift.giftName}"?`)) {
      deleteMutation.mutate(gift._id);
    }
  };

  return (
    <div className="w-full mb-10">
      {/* search area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 sm:gap-10 gap-3">
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search gifts by name or category"
        />
        <div className="flex items-center sm:gap-3 gap-2">
          <div className="relative">
            <button
              onClick={() => setOpenFilter((prev) => !prev)}
              className="px-3 sm:px-4 py-1.5 rounded-md bg-white border border-[#CCCCCC] font-medium flex items-center gap-2"
            >
              <Funnel size={18} /> Category
            </button>

            {/* Filter Dropdown */}
            {openFilter && (
              <div className="absolute left-1 top-full mt-2 z-50 w-48 rounded-lg border bg-white p-3 shadow-lg">
                <label className="block text-sm font-medium">
                  Filter by category
                  <select
                    value={selectedCategory}
                    onChange={(event) => {
                      setSelectedCategory(event.target.value);
                      setOpenFilter(false);
                    }}
                    className="mt-2 w-full rounded border px-2 py-1.5"
                  >
                    <option value="all">All categories</option>
                    {giftCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="sm:px-5 px-2 py-2 w-30 rounded-md bg-[#FF9080] text-white font-medium text-sm sm:text-md max-sm:w-full"
          >
            + Add Gift
          </button>
        </div>
      </div>
      {/* Card Container */}
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="pl-5 p-3">Gift Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Price (Coins)</th>
                <th className="p-3 sm:pl-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {giftsQuery.isPending &&
                Array.from({ length: 5 }, (_, index) => (
                  <tr
                    key={index}
                    className="border-t border-[#DFDFDF]"
                    aria-hidden="true"
                  >
                    <td className="p-3 pl-5">
                      <Skeleton className="h-12 w-12 rounded-md" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-4 w-28" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </td>
                    <td className="p-3">
                      <Skeleton className="h-4 w-16" />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-5">
                        <Skeleton className="h-4 w-8" />
                        <Skeleton className="h-7 w-16 rounded" />
                      </div>
                    </td>
                  </tr>
                ))}
              {giftsQuery.isError && (
                <tr>
                  <td colSpan="5" className="p-5 text-center text-red-600">
                    Unable to load gifts: {getErrorMessage(giftsQuery.error)}{" "}
                    <button
                      type="button"
                      onClick={() => giftsQuery.refetch()}
                      disabled={giftsQuery.isFetching}
                      className="underline"
                    >
                      {giftsQuery.isFetching ? "Retrying..." : "Retry"}
                    </button>
                  </td>
                </tr>
              )}
              {!giftsQuery.isPending &&
                !giftsQuery.isError &&
                filteredGifts.map((gift) => (
                  <tr
                    key={gift._id}
                    className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                  >
                    <td className="p-3 pl-5">
                      <img
                        src={gift.giftImage}
                        alt={gift.giftName}
                        className="h-12 w-12 rounded-md object-cover"
                      />
                    </td>
                    <td className="p-3 font-medium">{gift.giftName}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-[#D38DBF] px-4 py-1.5 text-xs font-semibold text-white">
                        {gift.category}
                      </span>
                    </td>
                    <td className="p-3">${gift.giftPrice}</td>
                    <td className="p-3 text-[#181717] text-sm font-medium">
                      <div className="flex items-center gap-5">
                        <button
                          type="button"
                          onClick={() => handleViewClick(gift)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(gift)}
                          disabled={deleteMutation.isPending}
                          className="rounded bg-[#FFE9E9] px-3 py-1 font-semibold text-[#CF0D13] disabled:opacity-60"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {!giftsQuery.isPending &&
                !giftsQuery.isError &&
                filteredGifts.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-5 text-center text-gray-500">
                      {gifts.length
                        ? "No gifts match your search or category."
                        : "No gifts have been added yet."}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {deleteMutation.isError && (
            <p role="alert" className="p-3 text-sm text-red-600">
              Unable to delete gift: {getErrorMessage(deleteMutation.error)}
            </p>
          )}
          {isOpen && (
            <AddGiftModal open={isOpen} onClose={() => setIsOpen(false)} />
          )}
          {edit && (
            <UpdateGiftModal
              open={edit}
              gift={giftQuery.data}
              giftQuery={giftQuery}
              onClose={handleClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
