import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
      </div>
      <div className="flex items-center gap-4 rounded-md border p-4">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-20" />
        </div>
      </div>
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-background relative rounded-md border px-4 py-4"
          >
            <Skeleton className="mb-4 h-6 w-32" />
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 3 }).map((_, fieldIndex) => (
                <Skeleton key={fieldIndex} className="h-10 w-48" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
