import { Upload } from "lucide-react";

export default function UpdateGiftModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <form className="w-full max-w-162.5 bg-white rounded-2xl shadow-lg p-4 sm:p-6 max-sm:h-[95vh] overflow-y-auto animatefadeIn hide_scrollbar max-sm:mx-3">
        {/* Title */}
        <h2 className="text-[20px] font-semibold text-gray-800 mb-1">
          Update Gift
        </h2>
        <p className="text-gray-500 text-[14px] mb-6">
          Update the details of an existing virtual gift
        </p>

        {/* Gift Name */}
        <div className="mb-3">
          <label className="text-gray-700 text-[14px] font-medium">
            Gift Name
          </label>
          <input
            type="text"
            placeholder="Enter Gift name"
            className="w-full border rounded-lg px-3 py-2 text-[14px] mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Category */}
        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="mt-1 w-full">
            <label className="text-gray-700 text-[14px] font-medium">
              Category
            </label>
            <div className="relative">
              <select className="border border-[#626060] py-2">
                <option value="">Select Category</option>

                <option>Category 1</option>
                <option>Category 1</option>
                <option>Category 1</option>
                <option>Category 1</option>
              </select>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-3">
          <label className="text-gray-700 text-[14px] font-medium">
            Price (Coins)
          </label>
          <input
            type="number"
            placeholder="Enter Price"
            className="w-full border rounded-lg px-3 py-2 text-[14px] mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Upload Logo */}
        <div className="mt-3">
          <label className="text-gray-700 text-[14px] font-medium">
            Upload Logo (SVG, PNG, Mp4)
          </label>
          <div className="relative w-full cursor-pointer mt-1">
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <div className="border border-gray-300 rounded-md px-3 text-sm flex items-center gap-3">
              <span className="text-[#686868A6] font-medium py-2 flex items-center gap-2">
                Upload <Upload size={15} />
              </span>
              <span className="w-px h-7 bg-gray-300"></span>
              <span className="text-[#686868A6] font-medium truncate">
                No file choosen
              </span>
            </div>
          </div>
        </div>

        {/* Upload Sound */}

        {/* Buttons */}
        <div className="flex justify-center sm:justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={() => onClose()}
            className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
