import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddAgencyForm() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-10 border-border_primary">
      <div className="w-full bg-white rounded-xl py-5 sm:py-8 px-3 sm:px-7 border border-border_primary">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Agency Type */}
          <div>
            <label>Agency Type</label>
            <div className="relative mt-1">
              <select>
                <option value="">Select</option>
                <option value="host">Host</option>
                <option value="coin">Coin</option>
                <option value="master">Master</option>
                <option value="admin">Admin</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
            {/* {errors.agencyType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.agencyType.message}
              </p>
            )} */}
          </div>

          {/* Agency Name */}
          <div>
            <label>Agency Name</label>
            <input
              type="text"
              placeholder="StreamDoing Agency"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
            />
            {/* {errors.agencyName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.agencyName.message}
              </p>
            )} */}
          </div>

          {/* User ID */}
          <div>
            <label>Reference ID</label>
            <input
              type="text"
              //   {...register("phoneNumber")}
              placeholder="000100"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* Email */}
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="jon.doe@example.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* Country */}
          <div>
            <label>Country</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-md appearance-none">
                <option value="">Select</option>
              </select>

              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* WhatsApp Number */}
          <div>
            <label>WhatsApp Number</label>
            <input
              type="text"
              placeholder="+1 (737)-123-3265"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
            />
          </div>

          {/* Document Type */}
          <div>
            <label>Document Type</label>
            <div className="relative">
              <select>
                <option value="">Select</option>
                <option value="NID">NID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
                <option value="Other">Other</option>
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Passwords */}
          <div>
            <label>Passwords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
              />
            </div>
          </div>

          {/* NID Front */}
          <div>
            <label>NID Front</label>
            <div className="relative w-full cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="border border-gray-300 rounded-md px-3 text-sm flex items-center gap-3">
                <span className="text-[#686868A6] font-medium py-2">
                  Choose File
                </span>
                <span className="w-px h-7 bg-gray-300"></span>
                <span className="text-[#686868A6] font-medium truncate">
                  No file choosen
                </span>
              </div>
            </div>
          </div>

          {/* NID Back */}
          <div>
            <label>NID Back</label>
            <div className="relative w-full cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="border border-gray-300 rounded-md px-3 text-sm flex items-center gap-3">
                <span className="text-[#686868A6] font-medium py-2">
                  Choose File
                </span>
                <span className="w-px h-7 bg-gray-300"></span>
                <span className="text-[#686868A6] font-medium">
                  No file choosen
                </span>
              </div>
            </div>
          </div>

          {/* Profile Pic */}
          <div>
            <label>Profile Pic</label>
            <div className="relative w-full cursor-pointer">
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />

              <div className="border border-gray-300 rounded-md px-3 text-sm flex items-center gap-3">
                <span className="text-[#686868A6] font-medium py-2">
                  Choose File
                </span>
                <span className="w-px h-7 bg-gray-300"></span>
                <span className="text-[#686868A6] font-medium">
                  No file choosen
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Buttons */}
        <div className="flex justify-center sm:justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
