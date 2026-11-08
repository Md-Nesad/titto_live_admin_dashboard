import { useState } from "react";
import { AlertCircle, RotateCw, SquarePen, Trash2 } from "lucide-react";
import useViewModal from "../../shared/hooks/useViewModal";
import useSalaries from "../../hooks/useSalaries";
import AddSalaryTarget from "./AddSalaryTarget";
import UpdateSalaryTarget from "./UpdateSalaryTarget";
import SalaryTargetTableSkeleton from "./SalaryTargetTableSkeleton";

export default function SalaryTargetList() {
  const { open, handleViewClick, handleClose } = useViewModal();
  const [selectedSalary, setSelectedSalary] = useState(null);
  const { salariesQuery, createMutation, updateMutation, deleteMutation } =
    useSalaries();

  const handleEditView = (salary) => {
    updateMutation.reset();
    setSelectedSalary(salary);
  };

  const handleDelete = (salary) => {
    if (window.confirm(`Delete the salary target ${salary.target}?`)) {
      deleteMutation.mutate(salary._id);
    }
  };

  const formatNumber = (value) => Number(value).toLocaleString();

  return (
    <>
      <div className="py-4 bg-[#FFFFFF] rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] w-full overflow-x-auto mt-7 mb-10 border border-border_primary">
        <div className="flex items-center justify-between mb-4 px-3 sm:px-5">
          <h2 className="text-xl font-semibold">Salary Targets</h2>
          <button
            onClick={() => {
              createMutation.reset();
              handleViewClick();
            }}
            className="px-5 py-1.5 text-sm sm:text-[17px] bg-secondary hover:bg-primary transition-colors duration-100 text-white rounded-md font-medium"
          >
            Add Target
          </button>
        </div>
        {deleteMutation.isError && (
          <div
            role="alert"
            className="mx-3 mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:mx-5"
          >
            <AlertCircle size={20} className="mt-0.5 shrink-0 text-red-600" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold">Unable to delete salary target</p>
              <p className="mt-1 wrap-break-words">
                {deleteMutation.error?.response?.data?.message ||
                  deleteMutation.error?.message ||
                  "Please try again."}
              </p>
            </div>
          </div>
        )}
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
            {salariesQuery.isPending && <SalaryTargetTableSkeleton />}
            {salariesQuery.isError && (
              <tr>
                <td colSpan="6" className="p-6">
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
                        Could not load salary targets
                      </p>
                      <p className="mt-1 wrap-break-words text-sm">
                        {salariesQuery.error?.response?.data?.message ||
                          salariesQuery.error?.message ||
                          "Please try again."}
                      </p>
                      <button
                        type="button"
                        onClick={() => salariesQuery.refetch()}
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
            {!salariesQuery.isPending &&
              !salariesQuery.isError &&
              (salariesQuery.data?.length ? (
              salariesQuery.data.map((salary) => (
                <tr
                  key={salary._id}
                  className="border-t border-[#DFDFDF] hover:bg-gray-50 text-md"
                >
                  <td className="p-3 font-medium pl-5">
                    {formatNumber(salary.target)}
                  </td>
                  <td className="p-3">{formatNumber(salary.diamondShare)}</td>
                  <td className="p-3">${formatNumber(salary.basicSalary)}</td>
                  <td className="p-3">${formatNumber(salary.totalSalary)}</td>
                  <td className="p-3">${formatNumber(salary.agencyShare)}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-4">
                      <button
                        onClick={() => handleEditView(salary)}
                        title="Edit"
                        aria-label="Edit salary target"
                      >
                        <SquarePen size={17} />
                      </button>

                      <button
                        onClick={() => handleDelete(salary)}
                        title="Delete"
                        aria-label="Delete salary target"
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 size={17} className="text-red-500" />
                      </button>
                    </span>
                  </td>
                </tr>
              ))
              ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500">
                  No salary targets found.
                </td>
              </tr>
              ))}
          </tbody>
        </table>
        {open && (
          <AddSalaryTarget
            onClose={handleClose}
            onSubmit={(payload) =>
              createMutation.mutate(payload, { onSuccess: handleClose })
            }
            isPending={createMutation.isPending}
            error={createMutation.error}
          />
        )}

        {selectedSalary && (
          <UpdateSalaryTarget
            salary={selectedSalary}
            onClose={() => setSelectedSalary(null)}
            onSubmit={(payload) =>
              updateMutation.mutate(
                { id: selectedSalary._id, payload },
                { onSuccess: () => setSelectedSalary(null) },
              )
            }
            isPending={updateMutation.isPending}
            error={updateMutation.error}
          />
        )}
      </div>
    </>
  );
}
