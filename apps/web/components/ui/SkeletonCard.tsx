export function SkeletonCard() {
  return (
    <div className="card-wl overflow-hidden rounded-2xl">
      <div className="aspect-[2/3] w-full animate-pulse bg-surface" />
      <div className="space-y-2 p-3">
        <div className="h-3 w-4/5 animate-pulse rounded" style={{ backgroundColor: "rgba(42,37,53,0.9)" }} />
        <div className="h-3 w-3/5 animate-pulse rounded" style={{ backgroundColor: "rgba(42,37,53,0.7)" }} />
        <div className="mt-1 h-5 w-16 animate-pulse rounded-full" style={{ backgroundColor: "rgba(42,37,53,0.6)" }} />
      </div>
    </div>
  );
}
