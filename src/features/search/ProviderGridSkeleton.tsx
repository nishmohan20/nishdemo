import { Skeleton } from "@/components/ui/skeleton";

const ProviderCardSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl bg-card border border-border shadow-sm">
    <Skeleton className="aspect-[4/3] w-full rounded-none" />
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20 rounded-md" />
        <Skeleton className="h-5 w-20 rounded-md" />
      </div>
      <Skeleton className="h-8 w-full" />
      <div className="flex gap-1.5 mt-auto">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
    </div>
  </div>
);

interface ProviderGridSkeletonProps {
  count?: number;
}

const ProviderGridSkeleton = ({ count = 6 }: ProviderGridSkeletonProps) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <ProviderCardSkeleton key={i} />
    ))}
  </div>
);

export { ProviderCardSkeleton, ProviderGridSkeleton };
