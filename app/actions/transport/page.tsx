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
import { Select } from "@/components/ui/select";
import { logAction } from "../log-action";
import { CREDIT_RATES } from "@/lib/constants";
import { Train, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
    mode: z.string().min(1, "Select a transport mode"),
    distance: z.number({ error: "Enter a valid number" }).positive("Must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

export default function TransportPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { mode: "bus", distance: 0 },
    });

    const distance = watch("distance");
    const estimatedCredits = CREDIT_RATES.transport * (distance || 0);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await logAction({
                type: "TRANSPORT",
                details: `${data.mode} travel`,
                quantity: data.distance,
                unit: "km",
            });
            toast.success(`Earned ${result.credits} green credits for public transport!`);
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
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 mb-2">
                        <Train className="h-6 w-6" />
                    </div>
                    <CardTitle>Log Public Transport</CardTitle>
                    <CardDescription>Record your public transport usage to earn green credits</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="mode">Transport Mode</Label>
                            <Select id="mode" {...register("mode")}>
                                <option value="bus">Bus</option>
                                <option value="metro">Metro</option>
                                <option value="train">Train</option>
                            </Select>
                            {errors.mode && <p className="text-destructive text-xs mt-1">{errors.mode.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="distance">Distance (km)</Label>
                            <Input id="distance" type="number" step="0.1" {...register("distance", { valueAsNumber: true })} />
                            {errors.distance && <p className="text-destructive text-xs mt-1">{errors.distance.message}</p>}
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                            <p className="text-sm text-muted-foreground">Estimated Credits</p>
                            <p className="text-3xl font-bold text-primary">{estimatedCredits.toFixed(0)}</p>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging..." : "Log Transport Action"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
