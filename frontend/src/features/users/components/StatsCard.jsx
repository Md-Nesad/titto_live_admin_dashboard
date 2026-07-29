export default function StatsCards({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {data.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] p-5"
        >
          {/* Title */}
          <h4 className="text-md font-medium text-gray-700 mb-4">
            {item.title}
          </h4>

          {/* Inner box */}
          <div className="border-2 border-[#E5E7EB] rounded-lg py-4 px-3">
            <div className="flex items-start flex-col gap-2">
              <div className="w-9 h-9 flex items-center justify-center">
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-[#1C1D1D] mb-3 font-semibold">
                  {item.value}
                </p>
                {item.change && (
                  <p className="text-xs text-orange-500">{item.change}</p>
                )}
              </div>
            </div>

            {/* Progress bar only for first card */}
            {item.bar && (
              <div className="flex place-items-center gap-4">
                <div className="h-2 w-[60%] bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-[55%] bg-orange-500 rounded-full" />
                </div>
                <p className="text-xs text-orange-500 text-right">
                  {item.footer}{" "}
                  <span className="text-[#1C1D1D80] font-medium">
                    {item.agency}
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
