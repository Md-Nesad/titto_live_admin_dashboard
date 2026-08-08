import { useState } from "react";

export default function RecentGiftActivity() {
  return (
    <div className="w-fullmx-auto bg-white rounded-lg p-3 sm:p-5 shadow mb-10 border border-[#E5E7EB]">
      <h2 className="text-lg font-semibold mb-4">Recent Gift Activity</h2>

      <div className="space-y-3">
        <div className="flex items-center justify-between border border-[#ABABAB54] rounded-lg px-3 sm:px-4 py-3">
          {/* Left */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div>
              <img
                src="https://res.cloudinary.com/dtpazbyeq/image/upload/v1785255630/titto_live/cuuxjelqvibp0ujcsoip.png"
                alt="Gift Image"
                className="w-15 h-10 object-cover rounded-md"
              />
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">
                User sent Gift
              </p>
              <p className="text-xs text-gray-500 font-medium">1 hour ago</p>
            </div>
          </div>

          {/* Right */}
          <div className="text-sm sm:text-md font-semibold text-gray-900">
            10 coins
          </div>
        </div>
      </div>
    </div>
  );
}
