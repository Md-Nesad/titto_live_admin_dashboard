import StatsCardsSkeleton from "./StatsSkeleton";
import DashboardTableSkeleton from "./TableSkeleton";
import TitleSubTitleSkeleton from "./TitleSubTitleSkeleton";

export default function DashboardSkeleton() {
  return (
    <div className="mt-17 ml-80">
      {/* <TitleSubTitleSkeleton /> */}

      <StatsCardsSkeleton />

      <DashboardTableSkeleton />
    </div>
  );
}
