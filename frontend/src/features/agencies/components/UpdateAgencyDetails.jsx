import { ChevronDown } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import TitleSubTitle from "../../../shared/components/TitleSubTitle";
import { useState } from "react";

export default function UpdateAgencyDetails() {
  const { agencyId } = useParams();
  const navigate = useNavigate();
  const [isTempOn, setIsTempOn] = useState(false);
  const [isPerOn, setIsPerOn] = useState(false);
  const [reason, setReason] = useState("");
  const [until, setUntil] = useState("");

  return (
    <>
      <TitleSubTitle
        title="Update Agency Details"
        subtitle="Modify the details of the selected agency"
      />
      <div className="w-full flex justify-center shadow-[0_2px_10px_rgba(0,0,0,0.06)] mb-10">
        <div className="w-full bg-white rounded-xl py-5 sm:py-8 px-3 sm:px-8 border border-gray-100">
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
            </div>

            {/* Agency Name */}
            <div>
              <label>Agency Name</label>
              <input
                type="text"
                placeholder="StreamDoing Agency"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
              />
            </div>

            {/* User ID */}
            <div>
              <label>Phone</label>
              <input
                type="text"
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
                <select className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm appearance-none">
                  <option value="">Select</option>
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </select>

                <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
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

            <div>
              <label>Reference Id</label>
              <input
                type="text"
                placeholder="000100"
                className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
              />
            </div>

            {/* Email */}
            <div>
              <label>Password</label>
              <input
                type="text"
                placeholder="*************"
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

            <div>
              <label>Status</label>
              <div className="relative">
                <select>
                  <option value="">Select</option>
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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
                  <span className="text-[#686868A6] font-medium"></span>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between max-sm:justify-center gap-4 w-full">
              <div className="flex items-center gap-8 border border-gray-300 rounded-md px-3 py-2 w-[48%]">
                <span className="text-sm">Temporary Ban</span>
                <div
                  onClick={() => {
                    setIsTempOn(!isTempOn);
                    setIsPerOn(false);
                  }}
                  className={`w-10 h-3 rounded-full cursor-pointer flex items-center transition-all duration-300 ${
                    isTempOn ? "bg-pink-400" : "bg-pink-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-xl transition-all duration-300 bg-linear-to-br from-pink-600 to-pink-400 relative ${
                      isTempOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-8 border border-gray-300 rounded-md px-3 py-2 w-[48%]">
                <span className="text-sm">Permanent Ban</span>
                <div
                  onClick={() => {
                    setIsPerOn(!isPerOn);
                    setIsTempOn(false);
                  }}
                  className={`w-10 h-3 rounded-full cursor-pointer flex items-center transition-all duration-300 ${
                    isPerOn ? "bg-pink-400" : "bg-pink-200"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full shadow-xl transition-all duration-300 bg-linear-to-br from-pink-600 to-pink-400 relative ${
                      isPerOn ? "translate-x-5" : "translate-x-0"
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            {isTempOn && (
              <>
                <div>
                  <label>Ban Reason</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason (optional)"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
                  />
                </div>

                <div>
                  <label>Until</label>
                  <input
                    type="date"
                    value={until}
                    onChange={(e) => setUntil(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1 text-sm"
                  />
                </div>
              </>
            )}

            {isPerOn && (
              <>
                <div>
                  <label>Reason</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Enter reason (optional)"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
                  />
                </div>
              </>
            )}
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
            bg-secondary hover:bg-primary transition-all duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
