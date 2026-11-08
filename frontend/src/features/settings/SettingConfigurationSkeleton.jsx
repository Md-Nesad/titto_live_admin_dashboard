import Skeleton from "../../shared/components/loading/Skeleton";

export default function SettingConfigurationSkeleton() {
  return (
    <div className="w-full min-h-screen mb-10" aria-label="Loading settings">
      <section className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] rounded-xl px-5 py-4 space-y-6">
        <Skeleton className="h-6 w-52" />

        <div className="grid sm:grid-cols-2 gap-5 sm:gap-20">
          {[0, 1].map((field) => (
            <div key={field} className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#AAAAAA] mb-5">
          <Skeleton className="h-5 w-28" />
          <div className="mt-4 flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>
      </section>

      <section className="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)] border-2 border-[#E5E7EB] rounded-xl p-6 space-y-6 mt-6">
        <Skeleton className="h-6 w-44" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full sm:w-40" />
          <Skeleton className="h-4 w-10" />
        </div>

        <div className="pt-4 space-y-6">
          <Skeleton className="h-6 w-32" />
          {[0, 1, 2, 3].map((field) => (
            <div key={field} className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-52" />
              </div>
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          ))}
          <div className="flex justify-end">
            <Skeleton className="h-9 w-40 rounded-md" />
          </div>
        </div>
      </section>
    </div>
  );
}
