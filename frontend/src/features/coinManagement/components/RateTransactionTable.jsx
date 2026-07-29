import { CircleCheckBig, CircleX, Eye, Funnel, RotateCw } from "lucide-react";
import { coinAgenciesTable } from "../../../data/data";

export default function RateTransactionTable() {
  return (
    <div className="w-full mb-10 mt-1">
      {/* Card Container */}
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        {/* Table Wrapper for Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-nowrap">
            <thead>
              <tr className="text-[#535353] text-md font-medium">
                <th className="p-3 pl-5">MP ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Coin</th>
                <th className="p-3">Value</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 sm:pl-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {coinAgenciesTable.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">{item.portalId}</td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">Master agenccy</td>
                  <td className="p-3">{item.coin}</td>
                  <td className="p-3 text-[#00D519]">{item.value}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1 text-xs ${
                        item.status === "Completed"
                          ? "bg-linear-to-r from-[#79D49B] to-[#25C962]"
                          : "bg-[#FF929296] text-[#D21B20] px-6"
                      } text-[#005D23] rounded-full font-semibold`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3 mt-1.5 text-[#181717] text-sm font-medium cursor-pointer flex gap-5 items-center">
                    {item.status === "Completed" ? (
                      <span className="flex items-center gap-3">
                        <Eye size={19} />
                        <RotateCw size={17} className="text-[#F5AD7C]" />
                      </span>
                    ) : (
                      <span className="flex items-center gap-3">
                        <Eye size={19} />
                        <CircleCheckBig size={17} className="text-[#11B324]" />
                        <CircleX size={18} className="text-[#FF0037]" />
                      </span>
                    )}
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
