import { Funnel } from "lucide-react";
import star from "../../../assets/image 343.svg";
import { tableData } from "../../../data/data";

export default function AdminAgencyTable() {
  return (
    <div className="w-full mb-10">
      {/* search area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:gap-10 gap-3">
        <input
          type="text"
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full px-4 py-1.5 rounded-md shrink"
          placeholder="Search by agency ID or name"
        />
        <div className="flex items-center sm:gap-3 gap-2">
          <button className="sm:px-5 px-2 py-2 rounded-md bg-[#FFFFFF] border border-[#FF9080] font-medium flex items-center max-sm:justify-center sm:gap-2 gap-4 text-sm sm:text-md text-[#FF9080] max-sm:w-full">
            <Funnel size={18} className="text-[#FF9080]" /> Filter
          </button>
          <button className="sm:px-5 px-2 py-2 w-33 rounded-md bg-[#FF9080] text-white font-medium text-sm sm:text-md max-sm:w-full">
            + Add Agency
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
                <th className="p-3 pl-5">Reference</th>
                <th className="p-3">Agnacy ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Coin Sell</th>
                <th className="p-3">Coin Buy</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Country</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">MST-042 </td>
                  <td className="p-3">Coin-042 </td>
                  <td className="p-3">StartHost Agency</td>
                  <td className="p-3">1.2M</td>
                  <td className="xl:p-3 px-7">1.2M</td>
                  <td className="xl:p-3 px-7">৳2.25M</td>
                  <td className="p-3">{row.location}</td>
                  <td className="p-3">
                    <span className="px-4 py-1 text-xs bg-linear-to-r from-[#79D49B] to-[#25C962] text-[#005D23] rounded-full font-semibold">
                      {row.status}
                    </span>
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
