import Skeleton from "./Skeleton";

function TitleSubTitleSkeleton() {
  return (
    <div className="mb-5">
      <Skeleton className="h-9 w-56 mb-2" />
      <Skeleton className="h-6 w-80" />
    </div>
  );
}

export default TitleSubTitleSkeleton;
