export function BookCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[2/3] rounded-xl bg-secondary-stroke mb-3" />
      <div className="h-4 bg-secondary-stroke rounded w-3/4 mb-2" />
      <div className="h-3 bg-secondary-stroke rounded w-1/2 mb-3" />
      <div className="flex items-center gap-2 mb-2">
        <div className="h-4 w-20 bg-secondary-stroke rounded" />
        <div className="h-3 w-8 bg-secondary-stroke rounded" />
      </div>
      <div className="h-3 w-24 bg-secondary-stroke rounded" />
    </div>
  );
}
