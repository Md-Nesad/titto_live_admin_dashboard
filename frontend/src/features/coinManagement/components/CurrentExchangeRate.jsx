export default function CurrentExchangeRate() {
  const tiers = [
    {
      title: "Master Tier",
      min: "100,000",
      price: "$fgdfgdfg",
    },
    {
      title: "Agency Tier",
      min: "10,000",
      price: "$fgdfgdfg",
    },
    {
      title: "User Tier",
      min: "100",
      price: "$fgdfgdfg",
    },
  ];

  return (
    <div className="bg-white p-5 rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] mt-1">
      {/* Title */}
      <h2 className="text-xl font-bold text-[#1a1a1a] opacity-85 mb-5">
        Current Exchange Rate
      </h2>

      {/* Tiers */}
      <div className="flex flex-col gap-4">
        {tiers?.map((t, i) => (
          <div
            key={i}
            className="flex flex-col max-sm:gap-3 justify-start sm:flex-row sm:items-center sm:justify-between w-full border border-gray-200 rounded-lg sm:px-6 px-3 py-2 bg-white"
          >
            {/* Left */}
            <div>
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                {t.title}
              </h3>
              <p className="text-sm text-[#535353] font-medium">
                Min Purchase: {t.min} coins
              </p>
            </div>

            {/* Right */}
            <div className="sm:text-right text-left">
              <p className="text-xl font-bold text-[#1a1a1a]">{t.price}</p>
              <p className="text-sm text-[#535353] font-medium">per coin</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
