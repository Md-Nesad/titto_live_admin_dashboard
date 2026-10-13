import StatsCardsSkeleton from "./StatsSkeleton";
import DashboardTableSkeleton from "./TableSkeleton";
import TitleSubTitleSkeleton from "./TitleSubTitleSkeleton";

export default function DashboardSkeleton() {
  return (
    <div>
      <TitleSubTitleSkeleton />

      <StatsCardsSkeleton />

      <DashboardTableSkeleton />
    </div>
  );
}
