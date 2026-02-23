import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <div className="text-center mb-12">
                <Skeleton className="h-8 w-64 mx-auto" />
                <Skeleton className="h-5 w-96 mx-auto mt-2" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-40 rounded-xl" />
                ))}
            </div>
            <Skeleton className="h-6 w-48 mx-auto mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-32 rounded-xl" />
                ))}
            </div>
        </div>
    );
}
