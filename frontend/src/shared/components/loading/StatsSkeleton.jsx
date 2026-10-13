import Skeleton from "./Skeleton";

function StatsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] p-5"
        >
          {/* Card title */}
          <Skeleton className="h-5 w-32 mb-4" />

          {/* Inner box */}
          <div className="border-2 border-[#E5E7EB] rounded-lg py-4 px-3">
            <div className="flex items-start flex-col gap-3">
              {/* Icon */}
              <Skeleton className="w-9 h-9 rounded-lg" />

              {/* Value */}
              <Skeleton className="h-5 w-24" />

              {/* Change */}
              <Skeleton className="h-3 w-16" />
            </div>

            {/* Progress bar */}
            {index === 0 && (
              <div className="flex items-center gap-4 mt-4">
                <Skeleton className="h-2 w-[60%] rounded-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCardsSkeleton;
