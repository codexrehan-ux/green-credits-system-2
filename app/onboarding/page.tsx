"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { completeOnboarding } from "./actions";
import { toast } from "sonner";
import { Leaf, User, CreditCard, BookOpen, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
    const { data: session } = useSession();
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: session?.user?.name ?? "",
        phone: "",
        bankName: "",
        accountNo: "",
        ifsc: "",
    });

    const updateForm = (key: string, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await completeOnboarding(form);
            toast.success("Onboarding complete! Welcome to GreenCredits.");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const steps = [
        {
            icon: User,
            title: "Welcome! Let's set up your profile",
            description: "Tell us a bit about yourself",
            content: (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            id="name"
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </div>
            ),
        },
        {
            icon: CreditCard,
            title: "Bank Details (Optional)",
            description: "Add bank details for future credit redemptions",
            content: (
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="bankName">Bank Name</Label>
                        <Input
                            id="bankName"
                            value={form.bankName}
                            onChange={(e) => updateForm("bankName", e.target.value)}
                            placeholder="e.g. State Bank of India"
                        />
                    </div>
                    <div>
                        <Label htmlFor="accountNo">Account Number</Label>
                        <Input
                            id="accountNo"
                            value={form.accountNo}
                            onChange={(e) => updateForm("accountNo", e.target.value)}
                            placeholder="Your account number"
                        />
                    </div>
                    <div>
                        <Label htmlFor="ifsc">IFSC Code</Label>
                        <Input
                            id="ifsc"
                            value={form.ifsc}
                            onChange={(e) => updateForm("ifsc", e.target.value.toUpperCase())}
                            placeholder="e.g. SBIN0001234"
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        You can skip this step and add bank details later from your profile.
                    </p>
                </div>
            ),
        },
        {
            icon: BookOpen,
            title: "Quick Tutorial",
            description: "Here's how to get started",
            content: (
                <div className="grid gap-4">
                    {[
                        { title: "Log Actions", desc: "Record recycling, transport, plantation, savings, or emission reductions from the dashboard." },
                        { title: "Earn Credits", desc: "Each action earns you green credits based on quantity and type. Watch your balance grow!" },
                        { title: "Redeem Credits", desc: "Use your credits at government hospitals, medical shops, metro recharges, and more." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                            <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                            <div>
                                <h4 className="font-medium text-sm">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ),
        },
    ];

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-8">
            <Card className="w-full max-w-lg shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
                        {(() => {
                            const StepIcon = steps[step].icon;
                            return <StepIcon className="h-6 w-6" />;
                        })()}
                    </div>
                    <CardTitle className="text-xl">{steps[step].title}</CardTitle>
                    <CardDescription>{steps[step].description}</CardDescription>
                    {/* Progress indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                        {steps.map((_, i) => (
                            <div
                                key={i}
                                className={`h-2 w-8 rounded-full transition-all ${i <= step ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {steps[step].content}
                    <div className="flex justify-between">
                        {step > 0 ? (
                            <Button variant="outline" onClick={() => setStep(step - 1)}>
                                <ArrowLeft className="h-4 w-4 mr-1" /> Back
                            </Button>
                        ) : (
                            <div />
                        )}
                        {step < steps.length - 1 ? (
                            <Button onClick={() => setStep(step + 1)}>
                                Next <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        ) : (
                            <Button onClick={handleSubmit} disabled={loading}>
                                {loading ? "Finishing..." : (
                                    <>
                                        <Leaf className="h-4 w-4 mr-1" /> Start My Green Journey
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
