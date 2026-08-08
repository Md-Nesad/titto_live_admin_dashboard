import { Funnel } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterByStatusDropdown from "../../../shared/components/FilterByStatus";

export default function FilterAndAddAgency() {
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  return (
    <div className="flex items-center sm:gap-3 gap-2">
      <div className="relative">
        <button
          onClick={() => setOpenFilter((prev) => !prev)}
          className="px-3 sm:px-4 py-1.5 rounded-md bg-white border border-[#CCCCCC] font-medium flex items-center gap-2"
        >
          <Funnel size={18} /> Filter
        </button>

        {/* Filter Dropdown */}
        {openFilter && (
          <div className="absolute left-1 top-full mt-2 z-50">
            <FilterByStatusDropdown
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              onClose={() => setOpenFilter(false)}
            />
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/dashboard/agencies/add-agency")}
        className="sm:px-5 px-2 py-2 w-30 rounded-md bg-[#FF9080] text-white font-medium text-sm sm:text-md max-sm:w-full"
      >
        Add Agency
      </button>
    </div>
  );
}
