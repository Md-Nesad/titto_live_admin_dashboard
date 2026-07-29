import { Funnel, Pen, Trash2 } from "lucide-react";
import { tableData } from "../../../data/data";

export default function BanUserList() {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-4">
        {/* Search Input */}
        <input
          type="text"
          className="border border-[#BBBBBB] outline-[#BBBBBB] w-full sm:max-w-[75%] px-4 py-1.5 rounded-md"
          placeholder="Search by ID or name"
        />

        {/* Buttons */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="px-3 sm:px-4 py-1.5 rounded-md bg-white border border-[#CCCCCC] font-medium flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto">
            <Funnel size={18} /> Filter
          </button>
          <button className="px-3 sm:px-6 py-1.5 text-sm sm:text-base bg-linear-to-r from-[#6DA5FF] to-[#F576D6] text-white rounded-md font-medium w-full sm:w-auto text-nowrap">
            Add Agency
          </button>
        </div>
      </div>

      {/* table area */}
      <div className="py-4 bg-[#FFFFFF] rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] w-full overflow-x-auto mt-7 mb-10 border border-border_primary">
        <table className="w-full text-left border-collapse text-nowrap">
          <thead>
            <tr className="text-[#535353] text-md font-medium">
              <th className="p-3 pl-5">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Email</th>
              <th className="p-3">Ban Reason</th>
              <th className="p-3">Ban Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {tableData?.length > 0 ? (
              tableData?.map((user, index) => (
                <tr
                  key={index}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">
                    {user.userId || 87976}
                  </td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1 text-xs bg-linear-to-r from-[#2FB6FF] to-[#447FFF] text-[#FFFFFF] rounded-full font-normal opacity-60`}
                    >
                      Host
                    </span>
                  </td>
                  <td className="p-3">alice@example.com</td>
                  <td className="p-3">Violation of community guidelines</td>
                  <td className="p-3">
                    <span
                      className={`px-4 py-1 text-xs ${
                        user.status === "active"
                          ? "bg-[#FF929296] text-[#D21B20]"
                          : "bg-[#FFE4B2] text-[#D21B20]"
                      } text-[#005D23] rounded-full font-semibold`}
                    >
                      Permanent Ban
                    </span>
                  </td>
                  <td className="p-3 mt-1.5 text-[#181717] text-sm font-medium cursor-pointer flex gap-5 items-center">
                    <span className="flex items-center gap-3">
                      <button title="Edit">
                        <Pen size={19} />
                      </button>
                      <Trash2 size={18} className="text-[#FF0037]" />
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md">
                <td colSpan={9} className="p-3 text-center">
                  No banned users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* {isOpen && (
          <UserDetailsModal open={isOpen} onClose={() => setIsOpen(false)} />
        )} */}
      </div>
    </>
  );
}
