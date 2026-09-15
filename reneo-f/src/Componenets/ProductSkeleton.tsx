
export function ProductSkeleton({
  limit,
}: {
  limit: number;
}) {
  return (
    <div
      className="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
        lg:grid-cols-4
      "
    >
      {Array.from({ length: limit }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-xl border border-gray-200 bg-white"
        >
          <div className="aspect-square animate-pulse bg-gray-200" />

          <div className="space-y-3 p-4">
            <div className="h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-9 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
