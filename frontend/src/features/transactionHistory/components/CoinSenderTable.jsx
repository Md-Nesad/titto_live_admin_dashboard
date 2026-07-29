import { Funnel, Trash2 } from "lucide-react";
import { tableData } from "../../../data/data";

export default function CoinSenderTable() {
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
        </div>
      </div>
      {/* Card Container */}
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse shrink text-nowrap">
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                <th className="p-3 pl-5">Transaction ID</th>
                <th className="p-3">Sender Type</th>
                <th className="p-3">Sender User ID</th>
                <th className="p-3">Receiver Type</th>
                <th className="p-3">Coin Amount</th>
                <th className="p-3">Date</th>
                <th className="p-3 pl-5">Action</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">TNX012KAD</td>
                  <td className="p-3">Office</td>
                  <td className="p-3">002000</td>
                  <td className="p-3">1,000M</td>
                  <td className="p-3 text-[#00D519]">$47.50</td>
                  <td className="p-3">2024-10-28</td>
                  <td className="p-3 pl-7 flex text-primary">
                    <button title="Delete Transaction">
                      <Trash2 size={18} className="cursor-pointer" />
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
