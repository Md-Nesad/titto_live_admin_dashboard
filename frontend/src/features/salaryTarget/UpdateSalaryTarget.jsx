import { useState } from "react";

const fields = [
  { name: "target", label: "Target" },
  { name: "diamondShare", label: "Diamond Share" },
  { name: "basicSalary", label: "Basic Salary" },
  { name: "totalSalary", label: "Total Salary" },
  { name: "agencyShare", label: "Agency Share" },
];

const UpdateSalaryTarget = ({
  salary,
  onClose,
  onSubmit,
  isPending,
  error,
}) => {
  const [target, setTarget] = useState({
    target: salary.target,
    diamondShare: salary.diamondShare,
    basicSalary: salary.basicSalary,
    totalSalary: salary.totalSalary,
    agencyShare: salary.agencyShare,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(
      Object.fromEntries(
        Object.entries(target).map(([field, value]) => [field, Number(value)]),
      ),
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 max-sm:px-3 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-4 sm:p-6 w-150 shadow-lg animate animatefadeIn"
      >
        <h2 className="text-lg font-semibold mb-6">Update Salary Target</h2>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {fields.map(({ name, label }) => (
            <div key={name} className="flex items-center justify-between">
              <label
                htmlFor={`salary-${name}`}
                className="text-sm font-medium text-gray-700"
              >
                {label} :
              </label>
              <input
                id={`salary-${name}`}
                type="number"
                min="10"
                step="any"
                required
                placeholder="5000"
                value={target[name]}
                onChange={(event) =>
                  setTarget({ ...target, [name]: event.target.value })
                }
                className="border rounded-md px-3 py-2 w-32 text-sm"
              />
            </div>
          ))}
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error.response?.data?.message || error.message}
          </p>
        )}

        <div className="mt-10 flex justify-center sm:justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateSalaryTarget;
