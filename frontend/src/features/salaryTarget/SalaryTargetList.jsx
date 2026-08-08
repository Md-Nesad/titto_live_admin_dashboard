import { useState } from "react";
import { LoaderCircle, SquarePen, Trash2 } from "lucide-react";
import useViewModal from "../../shared/hooks/useViewModal";
import AddSalaryTarget from "./AddSalaryTarget";
import UpdateSalaryTarget from "./UpdateSalaryTarget";

export default function SalaryTargetList() {
  const { open, selectedItem, handleViewClick, handleClose } = useViewModal();
  const [edit, setEdit] = useState(false);
  // const [selected, setSelected] = useState(null);

  const handleEditView = (salary) => {
    setEdit(true);
    // setSelected(salary);
  };

  return (
    <>
      <div className="py-4 bg-[#FFFFFF] rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] w-full overflow-x-auto mt-7 mb-10 border border-border_primary">
        <div className="flex items-center justify-between mb-4 px-3 sm:px-5">
          <h2 className="text-xl font-semibold">Salary Targets</h2>
          <button
            onClick={handleViewClick}
            className="px-5 py-1.5 text-sm sm:text-[17px] bg-secondary hover:bg-primary transition-colors duration-100 text-white rounded-md font-medium"
          >
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
                  <button onClick={handleEditView} title="Edit">
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
        {open && <AddSalaryTarget onClose={handleClose} />}

        {edit && (
          <UpdateSalaryTarget
            onClose={() => setEdit(false)}
            // selected={editSelectedItem}
          />
        )}
      </div>
    </>
  );
}
