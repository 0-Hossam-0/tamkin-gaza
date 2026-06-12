import { Skeleton } from "@/components/ui/skeleton";

export function CampaignCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-2 w-full" />
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CampaignTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-16 w-full" />
      ))}
    </div>
  );
}

export function CampaignDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-12 w-full" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    </div>
  );
}
