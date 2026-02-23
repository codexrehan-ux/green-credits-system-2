"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { logAction } from "../log-action";
import { CREDIT_RATES } from "@/lib/constants";
import { Zap, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
    trips: z.number({ error: "Enter a valid number" }).int().positive("Must be at least 1"),
});

type FormData = z.infer<typeof schema>;

export default function ReductionPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { trips: 0 },
    });

    const trips = watch("trips");
    const estimatedCredits = CREDIT_RATES.reduction * (trips || 0);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await logAction({
                type: "REDUCTION",
                details: `${data.trips} car trip(s) avoided`,
                quantity: data.trips,
                unit: "trips",
            });
            toast.success(`Earned ${result.credits} green credits for reducing emissions!`);
            router.push("/dashboard");
        } catch {
            toast.error("Failed to log action. Try again.");
        }
    };

    return (
        <div className="mx-auto max-w-lg px-4 py-8">
            <Link href="/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Link>
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 mb-2">
                        <Zap className="h-6 w-6" />
                    </div>
                    <CardTitle>Log Emission Reduction</CardTitle>
                    <CardDescription>Record car trips you avoided or carpooled to earn green credits</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="trips">Car Trips Avoided</Label>
                            <Input id="trips" type="number" {...register("trips", { valueAsNumber: true })} />
                            {errors.trips && <p className="text-destructive text-xs mt-1">{errors.trips.message}</p>}
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                            <p className="text-sm text-muted-foreground">Estimated Credits</p>
                            <p className="text-3xl font-bold text-primary">{estimatedCredits.toFixed(0)}</p>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging..." : "Log Reduction Action"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
