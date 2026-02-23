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
import { Droplets, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
    resourceType: z.string().min(1, "Select a resource type"),
    quantity: z.number({ error: "Enter a valid number" }).positive("Must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

export default function SavingsPage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { resourceType: "water", quantity: 0 },
    });

    const resourceType = watch("resourceType");
    const quantity = watch("quantity");
    const rate = resourceType === "electricity" ? CREDIT_RATES.savings.electricity : CREDIT_RATES.savings.water;
    const unit = resourceType === "electricity" ? "kWh" : "liters";
    const estimatedCredits = rate * (quantity || 0);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await logAction({
                type: "SAVINGS",
                details: `${data.resourceType} saved`,
                quantity: data.quantity,
                unit: data.resourceType === "electricity" ? "kWh" : "liters",
                subType: data.resourceType,
            });
            toast.success(`Earned ${result.credits} green credits for saving resources!`);
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
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 mb-2">
                        <Droplets className="h-6 w-6" />
                    </div>
                    <CardTitle>Log Resource Savings</CardTitle>
                    <CardDescription>Record water or electricity savings to earn green credits</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="resourceType">Resource Type</Label>
                            <Select id="resourceType" {...register("resourceType")}>
                                <option value="water">Water ({CREDIT_RATES.savings.water} credit/liter)</option>
                                <option value="electricity">Electricity ({CREDIT_RATES.savings.electricity} credits/kWh)</option>
                            </Select>
                            {errors.resourceType && <p className="text-destructive text-xs mt-1">{errors.resourceType.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="quantity">Quantity ({unit})</Label>
                            <Input id="quantity" type="number" step="0.1" {...register("quantity", { valueAsNumber: true })} />
                            {errors.quantity && <p className="text-destructive text-xs mt-1">{errors.quantity.message}</p>}
                        </div>

                        <div className="rounded-lg bg-muted/50 p-4 text-center">
                            <p className="text-sm text-muted-foreground">Estimated Credits</p>
                            <p className="text-3xl font-bold text-primary">{estimatedCredits.toFixed(0)}</p>
                        </div>

                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? "Logging..." : "Log Savings Action"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
