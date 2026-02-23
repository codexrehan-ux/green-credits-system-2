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
import { Recycle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const schema = z.object({
    wasteType: z.string().min(1, "Select a waste type"),
    quantity: z.number({ error: "Enter a valid number" }).positive("Must be greater than 0"),
});

type FormData = z.infer<typeof schema>;

const wasteTypes = Object.keys(CREDIT_RATES.recycle);

export default function RecyclePage() {
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { wasteType: "plastic", quantity: 0 },
    });

    const wasteType = watch("wasteType");
    const quantity = watch("quantity");
    const estimatedCredits = (CREDIT_RATES.recycle[wasteType] ?? 5) * (quantity || 0);

    const onSubmit = async (data: FormData) => {
        try {
            const result = await logAction({
                type: "RECYCLE",
                details: `${data.wasteType} recycled`,
                quantity: data.quantity,
                unit: "kg",
                subType: data.wasteType,
            });
            toast.success(`Earned ${result.credits} green credits for recycling!`);
            router.push("/dashboard");
        } catch {
            toast.error("Failed to log action. Try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/20 dark:via-emerald-950/20 dark:to-teal-950/20">
            <div className="mx-auto max-w-lg px-4 py-8">
                <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-all duration-200 hover:translate-x-1">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Link>
                
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 animate-fade-in-up">
                    <CardHeader className="text-center space-y-4 pb-8">
                        <div className="mx-auto relative">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                                <Recycle className="h-8 w-8" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                Log Recycling Activity
                            </CardTitle>
                            <CardDescription className="text-base">
                                Record your recycling efforts to earn green credits and track your environmental impact
                            </CardDescription>
                        </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6 pt-0">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="wasteType" className="text-sm font-medium">Waste Type</Label>
                                <Select 
                                    id="wasteType" 
                                    {...register("wasteType")}
                                    className="w-full h-11 bg-background border-border hover:border-primary/50 transition-colors"
                                >
                                    {wasteTypes.map((type) => (
                                        <option key={type} value={type} className="capitalize">
                                            {type.charAt(0).toUpperCase() + type.slice(1)} ({CREDIT_RATES.recycle[type]} credits/kg)
                                        </option>
                                    ))}
                                </Select>
                                {errors.wasteType && (
                                    <p className="text-destructive text-xs mt-1 animate-fade-in-up">
                                        {errors.wasteType.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-medium">Quantity (kg)</Label>
                                <Input 
                                    id="quantity" 
                                    type="number" 
                                    step="0.1" 
                                    {...register("quantity", { valueAsNumber: true })}
                                    className="h-11 bg-background border-border hover:border-primary/50 transition-colors"
                                    placeholder="Enter weight in kilograms"
                                />
                                {errors.quantity && (
                                    <p className="text-destructive text-xs mt-1 animate-fade-in-up">
                                        {errors.quantity.message}
                                    </p>
                                )}
                            </div>

                            <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 p-6 border border-green-200 dark:border-green-800">
                                <div className="text-center space-y-2">
                                    <p className="text-sm text-muted-foreground font-medium">Estimated Green Credits</p>
                                    <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        {estimatedCredits.toFixed(0)}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {quantity > 0 && `That's equivalent to saving ${(quantity * 2.5).toFixed(1)} kg CO₂!`}
                                    </p>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border-0" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Logging Action...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Recycle className="h-4 w-4" />
                                        Log Recycling Action
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
