import { Ellipsis, Funnel } from "lucide-react";
import star from "../../../assets/image 343.svg";
import { tableData } from "../../../data/data";
import FilterByStatusDropdown from "../../../shared/components/FilterByStatus";
import FilterAndAddAgency from "../../agencies/components/FilterAndAddAgency";
import AgencyDetailsModal from "../../agencies/modals/AgencyDetailsModal";
import { useState } from "react";
import useViewModal from "../../../shared/hooks/useViewModal";

export default function DashboardTable() {
  const {
    open,
    selectedItem: agency,
    handleViewClick,
    handleClose,
  } = useViewModal();

  return (
    <div className="w-full mb-10">
      {/* search area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:gap-10 gap-3">
        <input
          type="text"
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by agency ID or name"
        />
        <FilterAndAddAgency />
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Agency ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Level</th>
                {/* <th className="p-3">Diamonds</th> */}
                <th className="p-3">Beans</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((agency, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">{agency.id}</td>
                  <td className="p-3">{agency.name}</td>
                  <td className="p-3">Host</td>
                  <td className="p-3">
                    {agency.level && (
                      <span className="p-1 text-xs bg-linear-to-b from-[#DCE0ED] to-[#705996] rounded-lg font-semibold text-white flex items-center gap-2 w-13">
                        <img src={star} alt="" className="w-4 h-4" />{" "}
                        {agency.level}
                      </span>
                    )}
                  </td>

                  {/* <td className="p-3">{agency.beans}</td> */}
                  <td className="xl:p-3 px-7">{agency.coinSell}</td>
                  <td className="xl:p-3 px-7">{agency.coinBuy}</td>
                  <td className="p-3">{agency.location}</td>
                  <td className="p-3">
                    <span className="px-4 py-1 text-xs bg-linear-to-r from-[#79D49B] to-[#25C962] text-[#005D23] rounded-full font-semibold">
                      {agency.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#181717] text-sm font-medium cursor-pointer flex gap-5 items-center">
                    <button onClick={() => handleViewClick(agency)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
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
