export default function SkeletonCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-lagoon/10 bg-surface shadow-sm">
      <div className="h-48 w-full animate-pulse bg-lagoon-light" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded bg-lagoon-light" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-lagoon-light" />
        <div className="h-3 w-full animate-pulse rounded bg-lagoon-light" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-lagoon-light" />
        <div className="mt-auto flex items-center justify-between border-t border-lagoon/10 pt-4">
          <div className="h-5 w-16 animate-pulse rounded bg-lagoon-light" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-lagoon-light" />
        </div>
      </div>
    </div>
  );
}
