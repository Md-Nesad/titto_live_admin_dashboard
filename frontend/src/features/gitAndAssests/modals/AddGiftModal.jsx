import { useState } from "react";
import { Upload } from "lucide-react";
import useGifts from "../../../hooks/useGifts";
import giftCategories from "../giftCategories";

const initialFormData = {
  giftName: "",
  giftPrice: "",
  category: "",
  giftImage: null,
};

const getErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || "Something went wrong.";

export default function AddGiftModal({ open, onClose }) {
  const [formData, setFormData] = useState(initialFormData);
  const { createMutation } = useGifts({
    includeGifts: false,
    includeStats: false,
  });

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMutation.mutate(formData, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-162.5 bg-white rounded-2xl shadow-lg p-4 sm:p-6 max-sm:h-[95vh] overflow-y-auto animatefadeIn hide_scrollbar max-sm:mx-3"
      >
        <h2 className="text-[20px] font-semibold text-gray-800 mb-1">
          Add New Gift
        </h2>
        <p className="text-gray-500 text-[14px] mb-6">
          Create a new virtual gift for users to send during livestreams
        </p>

        <div className="mb-3">
          <label
            htmlFor="giftName"
            className="text-gray-700 text-[14px] font-medium"
          >
            Gift Name
          </label>
          <input
            id="giftName"
            name="giftName"
            type="text"
            placeholder="Enter Gift name"
            value={formData.giftName}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-[14px] mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2">
          <div className="mt-1 w-full">
            <label
              htmlFor="giftCategory"
              className="text-gray-700 text-[14px] font-medium"
            >
              Category
            </label>
            <select
              id="giftCategory"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-lg border px-3 py-2 text-[14px]"
            >
              <option value="">Select Category</option>
              {giftCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <label
            htmlFor="giftPrice"
            className="text-gray-700 text-[14px] font-medium"
          >
            Price (Coins)
          </label>
          <input
            id="giftPrice"
            name="giftPrice"
            type="number"
            min="0"
            step="any"
            placeholder="Enter Price"
            value={formData.giftPrice}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-3 py-2 text-[14px] mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="mt-3">
          <label
            htmlFor="giftImage"
            className="text-gray-700 text-[14px] font-medium"
          >
            Upload Logo (SVG, PNG, Mp4)
          </label>
          <div className="relative w-full cursor-pointer mt-1">
            <input
              id="giftImage"
              name="giftImage"
              type="file"
              accept="image/*,video/mp4"
              onChange={handleChange}
              required
              className="absolute inset-0 opacity-0 cursor-pointer"
            />

            <div className="border border-gray-300 rounded-md px-3 text-sm flex items-center gap-3">
              <span className="text-[#686868A6] font-medium py-2 flex items-center gap-2">
                Upload <Upload size={15} />
              </span>
              <span className="w-px h-7 bg-gray-300"></span>
              <span className="text-[#686868A6] font-medium truncate">
                {formData.giftImage?.name ?? "No file chosen"}
              </span>
            </div>
          </div>
        </div>

        {createMutation.isError && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            Unable to create gift: {getErrorMessage(createMutation.error)}
          </p>
        )}

        <div className="flex justify-center sm:justify-end mt-8 gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={createMutation.isPending}
            className="px-10 py-1 rounded-md text-white text-sm font-medium bg-secondary hover:bg-primary transition-colors disabled:opacity-60"
          >
            {createMutation.isPending ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
