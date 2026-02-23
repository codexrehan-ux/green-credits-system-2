import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
            <div>
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-80 mt-1" />
            </div>
            <Skeleton className="h-72 rounded-xl" />
            <Skeleton className="h-64 rounded-xl" />
        </div>
    );
}
