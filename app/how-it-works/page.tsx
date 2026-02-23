import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    UserPlus,
    ClipboardList,
    Award,
    ShoppingBag,
    Recycle,
    Train,
    TreePine,
    Droplets,
    Zap,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

export default function HowItWorksPage() {
    const steps = [
        {
            step: 1,
            icon: UserPlus,
            title: "Sign Up & Complete Onboarding",
            description: "Create your account with Google, fill in your profile, and optionally add bank details for future redemptions.",
        },
        {
            step: 2,
            icon: ClipboardList,
            title: "Log Your Green Actions",
            description: "Record eco-friendly activities like recycling, using public transport, planting trees, saving water or electricity, and reducing emissions.",
        },
        {
            step: 3,
            icon: Award,
            title: "Earn Green Credits",
            description: "Each action is converted to green credits based on our transparent calculation system. Watch your credits grow with every positive action.",
        },
        {
            step: 4,
            icon: ShoppingBag,
            title: "Redeem at Authorized Places",
            description: "Use your earned credits at government hospitals, medical shops, metro/bus recharges, bill payments, and more.",
        },
    ];

    const actions = [
        { icon: Recycle, title: "Recycling", rates: ["Plastic: 5/kg", "Paper: 3/kg", "Glass: 4/kg", "Metal: 6/kg", "E-waste: 10/kg"] },
        { icon: Train, title: "Public Transport", rates: ["Bus/Metro/Train: 2 credits per km"] },
        { icon: TreePine, title: "Plantation", rates: ["10 credits per tree planted"] },
        { icon: Droplets, title: "Resource Savings", rates: ["Water: 1 credit/liter", "Electricity: 2 credits/kWh"] },
        { icon: Zap, title: "Emission Reduction", rates: ["4 credits per avoided car trip"] },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold sm:text-5xl mb-4">How It Works</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    A simple 4-step process to start earning rewards for your eco-friendly actions
                </p>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                {steps.map((s) => (
                    <Card key={s.step} className="relative overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-chart-1" />
                        <CardContent className="p-6">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                                <s.icon className="h-6 w-6" />
                            </div>
                            <div className="text-xs font-bold text-primary mb-1">STEP {s.step}</div>
                            <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                            <p className="text-sm text-muted-foreground">{s.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Credit System */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-center mb-10">Credit Calculation System</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {actions.map((action) => (
                        <Card key={action.title} className="hover:shadow-md transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <action.icon className="h-8 w-8 text-primary" />
                                    <h3 className="font-semibold text-lg">{action.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {action.rates.map((r) => (
                                        <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="text-center py-12 rounded-2xl bg-gradient-to-br from-primary/5 to-chart-1/5 border">
                <h2 className="text-2xl font-bold mb-3">Start Your Green Journey Today</h2>
                <p className="text-muted-foreground mb-6">
                    Sign up and begin logging your eco-friendly actions to earn credits
                </p>
                <Link href="/login">
                    <Button size="lg" className="px-8 py-6 rounded-xl text-base">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
