import { useState } from "react";

const UpdateSalaryTarget = ({ onClose }) => {
  const [target, setTarget] = useState({
    targetCoin: "",
    targetDiamond: "",
    basicSalary: "",
    totalSalary: "",
    agencyShare: "",
    durationDays: "",
    dailyLiveHour: "",
  });

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 max-sm:px-3 ">
      <div className="bg-white rounded-xl p-4 sm:p-6 w-[600px] shadow-lg animate animatefadeIn">
        <h2 className="text-lg font-semibold mb-6">Update Salary Target</h2>

        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {/* Target Coin */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Target Coin :
            </label>
            <input
              type="number"
              placeholder="1000"
              value={target.targetCoin}
              onChange={(e) =>
                setTarget({ ...target, targetCoin: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Diamond */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Diamond :
            </label>
            <input
              type="number"
              placeholder="5000"
              value={target.targetDiamond}
              onChange={(e) =>
                setTarget({ ...target, targetDiamond: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Salary */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Salary :
            </label>
            <input
              type="number"
              placeholder="5000"
              value={target.basicSalary}
              onChange={(e) =>
                setTarget({ ...target, basicSalary: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Total Salary */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Total Salary :
            </label>
            <input
              type="number"
              placeholder="5000"
              value={target.totalSalary}
              onChange={(e) =>
                setTarget({ ...target, totalSalary: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Agency Share */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Agancy Share:
            </label>
            <input
              type="number"
              placeholder="5000"
              value={target.agencyShare}
              onChange={(e) =>
                setTarget({ ...target, agencyShare: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Day */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Day :</label>
            <input
              type="number"
              placeholder="30 days"
              value={target.durationDays}
              onChange={(e) =>
                setTarget({ ...target, durationDays: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>

          {/* Time */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">Time :</label>
            <input
              type="number"
              placeholder="12 hour"
              value={target.dailyLiveHour}
              onChange={(e) =>
                setTarget({ ...target, dailyLiveHour: e.target.value })
              }
              className="border rounded-md px-3 py-2 w-32 text-sm"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex justify-center sm:justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
          >
            Cancel
          </button>

          <button
            className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalaryTarget;
