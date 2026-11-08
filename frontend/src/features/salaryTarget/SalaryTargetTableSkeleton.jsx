export default function SalaryTargetTableSkeleton() {
  return Array.from({ length: 5 }, (_, rowIndex) => (
    <tr key={rowIndex} className="animate-pulse border-t border-[#DFDFDF]">
      {Array.from({ length: 6 }, (_, cellIndex) => (
        <td key={cellIndex} className="p-3">
          <div
            className={`h-4 rounded bg-gray-200 ${
              cellIndex === 5 ? "w-10" : cellIndex === 0 ? "w-24" : "w-20"
            }`}
          />
        </td>
      ))}
    </tr>
  ));
}