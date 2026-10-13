import Skeleton from "./Skeleton";

function DashboardTableSkeleton() {
  const columns = [
    "Agency ID",
    "Name",
    "Type",
    "Level",
    "Beans",
    "Coin Buy",
    "Location",
    "Status",
    "Action",
  ];

  return (
    <div className="w-full mb-10">
      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-6 sm:gap-10 gap-3">
        <Skeleton className="h-10 w-full rounded-md" />

        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-md shadow-[0_2px_10px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-nowrap">
            {/* Header */}
            <thead>
              <tr className="text-[#535353] font-medium text-md">
                {columns.map((column) => (
                  <th key={column} className="p-3">
                    <Skeleton className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>

            {/* Rows */}
            <tbody>
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <tr key={rowIndex} className="border-t border-[#DFDFDF]">
                  {/* Agency ID */}
                  <td className="p-3 pl-5">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Name */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-28" />
                  </td>

                  {/* Type */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-14" />
                  </td>

                  {/* Level */}
                  <td className="p-3">
                    <Skeleton className="h-7 w-14 rounded-lg" />
                  </td>

                  {/* Beans */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-16" />
                  </td>

                  {/* Coin Buy */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-16" />
                  </td>

                  {/* Location */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  {/* Status */}
                  <td className="p-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>

                  {/* Action */}
                  <td className="p-3">
                    <Skeleton className="h-4 w-12" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardTableSkeleton;
