import { Check, Eye, Funnel, X } from "lucide-react";
import { tableData } from "../../../data/data";
import { useState } from "react";
import FilterByStatusDropdown from "../../../shared/components/FilterByStatus";
import useViewModal from "../../../shared/hooks/useViewModal";
import AddGiftModal from "../modals/AddGiftModal";
import UpdateGiftModal from "../modals/UpdateGiftModal";

export default function GiftListTable() {
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const {
    open: edit,
    selectedItem,
    handleViewClick,
    handleClose,
  } = useViewModal();

  return (
    <div className="w-full mb-10">
      {/* search area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 sm:gap-10 gap-3">
        <input
          type="text"
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by agency ID or name"
        />
        <div className="flex items-center sm:gap-3 gap-2">
          <div className="relative">
            <button
              onClick={() => setOpenFilter((prev) => !prev)}
              className="px-3 sm:px-4 py-1.5 rounded-md bg-white border border-[#CCCCCC] font-medium flex items-center gap-2"
            >
              <Funnel size={18} /> Filter
            </button>

            {/* Filter Dropdown */}
            {openFilter && (
              <div className="absolute left-1 top-full mt-2 z-50">
                <FilterByStatusDropdown
                  statusFilter={statusFilter}
                  setStatusFilter={setStatusFilter}
                  onClose={() => setOpenFilter(false)}
                />
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
                {/* <th className="p-3">Sub Category</th> */}
                <th className="p-3">Price (Coins)</th>
                <th className="p-3">Status</th>
                <th className="p-3 sm:pl-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">Diamond Ring</td>
                  <td className="p-3 font-medium">Diamond Ring</td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1.5 text-xs bg-[#D38DBF] text-white px-6"
                      rounded-full font-semibold`}
                    >
                      Romantic
                    </span>
                  </td>
                  {/* <td className="p-3">100</td> */}
                  {/* <td className="p-3">108K</td>
                  <td className="p-3">108K</td> */}
                  <td className="p-3">1.62M</td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1 text-xs bg-[#FF929296] text-[#D21B20] px-6"
                      rounded-full font-semibold`}
                    >
                      Pending
                    </span>
                  </td>
                  <td className="p-3 text-[#181717] text-sm font-medium cursor-pointer flex gap-5 items-center">
                    <button onClick={() => handleViewClick(row)}>Edit</button>
                    <button className="font-semibold bg-[#FFE9E9] text-[#CF0D13] py-1 px-3 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isOpen && (
            <AddGiftModal open={isOpen} onClose={() => setIsOpen(false)} />
          )}
          {edit && <UpdateGiftModal open={edit} onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
}
