// Match the agency table columns while data is loading.
export default function SupportAgencyTableSkeleton() {
  return Array.from({ length: 5 }, (_, rowIndex) => (
    <tr key={rowIndex} className="animate-pulse border-t border-[#DFDFDF]">
      {Array.from({ length: 8 }, (_, cellIndex) => (
        <td key={cellIndex} className="p-3">
          <div
            className={`h-4 rounded bg-gray-200 ${
              cellIndex === 7 ? "w-12" : "w-20"
            }`}
          />
        </td>
      ))}
    </tr>
  ));
}
