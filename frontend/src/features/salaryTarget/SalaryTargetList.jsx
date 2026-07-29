import { useState } from "react";
// import SalaryModal from "../modals/SalaryModal";
// import { BASE_URL, formatNumber } from "../utility/utility";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
// import UpdateSalaryModal from "../modals/UpdateSalaryModal";
// import useDelete from "../hooks/useDelete";
// import { toast } from "react-toastify";
// import { useGlobalConfirm } from "../context/ConfirmProvider";

export default function SalaryTargetList() {
  //   const [open, setIsOpen] = useState(false);
  //   const [edit, setEdit] = useState(false);
  //   const [salaries, setSalaries] = useState(data);
  //   const [selectedSalary, setSelectedSalary] = useState(null);
  //   const { confirm } = useGlobalConfirm();
  //   const [loading, setLoading] = useState(null);
  //   const deleteUser = useDelete(`${BASE_URL}/admin/salary-targets`);

  return (
    <>
      <div className="py-4 bg-[#FFFFFF] rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] w-full overflow-x-auto mt-7 mb-10 border border-border_primary">
        <div className="flex items-center justify-between mb-4 px-3 sm:px-5">
          <h2 className="text-xl font-semibold">Salary Targets</h2>
          <button className="px-5 py-1.5 text-sm sm:text-[17px] bg-linear-to-r from-[#6DA5FF] to-[#F576D6] text-white rounded-md font-medium">
            Add Target
          </button>
        </div>
        <table className="w-full text-left border-collapse text-nowrap">
          <thead>
            <tr className="text-[#535353] text-md font-medium">
              <th className="p-3 pl-5">Target</th>
              <th className="p-3">Diamond Share</th>
              <th className="p-3">Basic Salary</th>
              <th className="p-3">Total Salary</th>
              <th className="p-3">Agency Share</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md">
              {/* <td className="p-3 font-medium pl-5">{salary.targetCoin}</td>
              <td className="p-3">{formatNumber(salary.targetDiamond)}</td>
              <td className="p-3">${formatNumber(salary.basicSalary)}</td>
              <td className="p-3">${formatNumber(salary.totalSalary)}</td>
              <td className="p-3">${formatNumber(salary.agencyShare)}</td> */}

              <td className="p-3 font-medium pl-5">100000</td>
              <td className="p-3">20000</td>
              <td className="p-3">fadfjahjdf</td>
              <td className="p-3">fadfjahjdf</td>
              <td className="p-3">fadfjahjdf</td>
              <td className="p-3">
                <span className="flex items-center gap-4">
                  <button title="Edit">
                    <SquarePen size={17} />
                  </button>

                  <button title="Delete">
                    <Trash2 size={17} className="text-red-500" />
                  </button>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        {/* {open && (
          <SalaryModal
            onClose={() => setIsOpen(false)}
            onSuccess={() => {
              setRefresh((prev) => !prev);
              setIsOpen(false);
            }}
          />
        )}
        {edit && (
          <UpdateSalaryModal
            onClose={() => setEdit(false)}
            selected={selectedSalary}
            onSuccess={() => {
              setRefresh((prev) => !prev);
              setIsOpen(false);
            }}
          />
        )} */}
      </div>
    </>
  );
}
