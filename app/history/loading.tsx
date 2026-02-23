import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-5xl px-4 py-8 space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-80" />
            <Skeleton className="h-10 w-64 mt-6" />
            <Skeleton className="h-96 rounded-xl mt-4" />
        </div>
    );
}
