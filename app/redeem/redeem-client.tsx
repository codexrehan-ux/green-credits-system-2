"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { REDEMPTION_PLACES } from "@/lib/constants";
import { redeemCredits } from "./actions";
import { Award, CheckCircle2, QrCode } from "lucide-react";

const schema = z.object({
    credits: z.number({ error: "Enter a valid number" }).positive("Credits must be greater than 0"),
    note: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function RedeemClient({ balance }: { balance: number }) {
    const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmCode, setConfirmCode] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        if (!selectedPlace) {
            toast.error("Please select a redemption place");
            return;
        }
        if (data.credits > balance) {
            toast.error("Insufficient credits");
            return;
        }
        try {
            const result = await redeemCredits({
                place: selectedPlace,
                credits: data.credits,
                note: data.note,
            });
            setConfirmCode(result.confirmationCode);
            setShowConfirmation(true);
            reset();
            toast.success("Credits redeemed successfully!");
        } catch (err: unknown) {
            toast.error(err instanceof Error ? err.message : "Redemption failed");
        }
    };

    const selectedPlaceData = REDEMPTION_PLACES.find((p) => p.id === selectedPlace);

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/20 dark:via-orange-950/20 dark:to-yellow-950/20">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8 animate-fade-in-up">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Redemption Center</h1>
                    <p className="text-muted-foreground mt-2">
                        Use your green credits at authorized places • Balance:{" "}
                        <span className="font-semibold text-amber-600">{balance.toFixed(0)} credits</span>
                    </p>
                </div>

            {/* Places Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {REDEMPTION_PLACES.map((place, index) => (
                    <Card
                        key={place.id}
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 animate-fade-in-up ${
                            selectedPlace === place.id ? "ring-2 ring-amber-500 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20" : ""
                            }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => setSelectedPlace(place.id)}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="text-3xl">{place.icon}</div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-base mb-1">{place.name}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{place.description}</p>
                                    {selectedPlace === place.id && (
                                        <div className="mt-2 flex items-center gap-1 text-xs text-amber-600 font-medium">
                                            <CheckCircle2 className="h-3 w-3" />
                                            Selected
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Redemption Form */}
            {selectedPlace && (
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-lg dark:bg-gray-900/80 max-w-lg mx-auto animate-fade-in-up">
                    <CardHeader className="text-center space-y-4">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg">
                            <Award className="h-7 w-7" />
                        </div>
                        <div className="space-y-2">
                            <CardTitle className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                Redeem at {selectedPlaceData?.name}
                            </CardTitle>
                            <CardDescription className="text-base">
                                Enter the amount of credits to redeem from your available balance
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="credits" className="text-sm font-medium">Credits to Redeem</Label>
                                <Input 
                                    id="credits" 
                                    type="number" 
                                    {...register("credits", { valueAsNumber: true })}
                                    className="h-11 bg-background border-border hover:border-amber-500/50 transition-colors"
                                    placeholder={`Max: ${balance.toFixed(0)}`}
                                />
                                {errors.credits && (
                                    <p className="text-destructive text-xs mt-1 animate-fade-in-up">
                                        {errors.credits.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="note" className="text-sm font-medium">Note (optional)</Label>
                                <Textarea 
                                    id="note" 
                                    {...register("note")} 
                                    placeholder="Any additional notes or special requirements..."
                                    className="bg-background border-border hover:border-amber-500/50 transition-colors resize-none"
                                    rows={3}
                                />
                            </div>
                            <Button 
                                type="submit" 
                                className="w-full h-12 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border-0" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Processing...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Award className="h-4 w-4" />
                                        Redeem Credits
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="text-center border-0 shadow-2xl bg-white/95 backdrop-blur-lg dark:bg-gray-900/95 max-w-md animate-fade-in-up">
                    <DialogClose onClose={() => setShowConfirmation(false)} />
                    <DialogHeader className="space-y-4">
                        <div className="mx-auto relative">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <DialogTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            Redemption Successful!
                        </DialogTitle>
                        <DialogDescription className="text-base">
                            Your credits have been redeemed at {selectedPlaceData?.name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-2 border-dashed border-amber-300 dark:border-amber-700 shadow-inner">
                            <QrCode className="h-24 w-24 text-amber-600" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-muted-foreground font-medium">Confirmation Code</p>
                            <p className="text-2xl font-bold font-mono bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                {confirmCode}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Show this code or QR at the redemption center
                            </p>
                        </div>
                    </div>
                    <Button 
                        onClick={() => setShowConfirmation(false)} 
                        className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl border-0"
                    >
                        Done
                    </Button>
                </DialogContent>
            </Dialog>
            </div>
        </div>
    );
}
