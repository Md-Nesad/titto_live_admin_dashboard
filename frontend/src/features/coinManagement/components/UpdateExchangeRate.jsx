export default function UpdateExchangeRate() {
  return (
    <div className="bg-white p-6 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">
        Update Exchange Rates
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Modify coin exchange rates for different tiers
      </p>

      {/* Form */}
      <div className="mt-6 space-y-3">
        <div>
          <label className="text-sm font-medium text-gray-700">
            Master Rate
          </label>
          <input
            type="number"
            className="w-full mt-1 rounded-md px-3 py-1.5 focus:outline-none border border-[#626060]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Agency Rate
          </label>
          <input
            type="number"
            className="w-full mt-1 rounded-md px-3 py-1.5 focus:outline-none border border-[#626060]"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">User Rate</label>
          <input
            type="number"
            className="w-full mt-1 rounded-md px-3 py-1.5 focus:outline-none border border-[#626060]"
          />
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-center sm:justify-end mt-8 gap-4">
        {/* <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-8 py-1 border border-gray-300 rounded-md text-[#181717]"
        >
          Cancel
        </button> */}

        <button
          type="submit"
          className="px-10 py-1 rounded-md text-white text-sm font-medium 
            bg-secondary hover:bg-primary transition-colors"
        >
          Update Rates
        </button>
      </div>
    </div>
  );
}
