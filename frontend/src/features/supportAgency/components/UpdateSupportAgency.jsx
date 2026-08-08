import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TitleSubTitle from "../../../shared/components/TitleSubTitle";

export default function UpdateSupportAgencyForm() {
  const { supportId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <TitleSubTitle
        title="Update Support Agency"
        subtitle="Update Support Agency details and information"
      />
      <div className="w-full flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-10">
        <div className="w-full bg-white rounded-xl py-5 sm:py-8 px-3 sm:px-8 border border-gray-100">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Agency Name */}
            <div>
              <label>Agency Name</label>
              <input
                type="text"
                placeholder="StreamDoing Agency"
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

            {/* phone */}
            <div>
              <label>Phone</label>
              <input
                type="text"
                placeholder="+1 (737)-123-3265"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <label>Gender</label>
              <div className="relative mt-1">
                <select>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            {/* password */}
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

            {/* Locaton */}
            <div>
              <label>Location</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm appearance-none">
                  <option value="">Select</option>
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Rajshahi">Rajshahi</option>
                </select>

                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* NID Number */}
            <div>
              <label>NID Number</label>
              <input
                type="text"
                placeholder="NID12345678"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
              />
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
              onClick={() => navigate("/dashboard/support-agency")}
              className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors duration-100"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
