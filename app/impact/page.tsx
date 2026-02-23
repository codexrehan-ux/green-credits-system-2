import { prisma } from "@/lib/prisma";
import { CO2_PER_CREDIT } from "@/lib/constants";
import { Card, CardContent } from "@/components/ui/card";
import { TreePine, Wind, Users, Recycle, Droplets, Zap } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
    const [userCount, totalCredits, actionStats] = await Promise.all([
        prisma.user.count(),
        prisma.user.aggregate({ _sum: { totalCredits: true } }),
        prisma.actionLog.groupBy({
            by: ["type"],
            _sum: { quantity: true, credits: true },
            _count: true,
        }),
    ]);

    const credits = totalCredits._sum.totalCredits ?? 0;
    const co2Saved = credits * CO2_PER_CREDIT;
    const treesEquivalent = Math.floor(co2Saved / 21); // average tree absorbs ~21 kg CO2/year

    const getStatByType = (type: string) => actionStats.find((s) => s.type === type);

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-12 text-center">
                <h1 className="text-3xl font-bold sm:text-4xl">🌍 Community Impact</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Together, we are making a difference. Here is our collective environmental impact.
                </p>
            </div>

            {/* Big Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <CardContent className="relative p-8 text-center">
                        <Wind className="h-10 w-10 text-primary mx-auto mb-3" />
                        <p className="text-4xl font-bold text-primary">{(co2Saved / 1000).toFixed(1)}T</p>
                        <p className="text-sm text-muted-foreground mt-1">CO₂ Saved (tonnes)</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-chart-3/10 to-transparent" />
                    <CardContent className="relative p-8 text-center">
                        <TreePine className="h-10 w-10 text-chart-3 mx-auto mb-3" />
                        <p className="text-4xl font-bold text-chart-3">{treesEquivalent.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Trees Equivalent</p>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-chart-2/10 to-transparent" />
                    <CardContent className="relative p-8 text-center">
                        <Users className="h-10 w-10 text-chart-2 mx-auto mb-3" />
                        <p className="text-4xl font-bold text-chart-2">{userCount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">Active Users</p>
                    </CardContent>
                </Card>
            </div>

            {/* Breakdown */}
            <h2 className="text-2xl font-bold mb-6 text-center">Impact by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                    {
                        icon: Recycle,
                        label: "Recycling",
                        stat: getStatByType("RECYCLE"),
                        unit: "kg recycled",
                        color: "text-green-600",
                    },
                    {
                        icon: Zap,
                        label: "Public Transport",
                        stat: getStatByType("TRANSPORT"),
                        unit: "km traveled",
                        color: "text-blue-600",
                    },
                    {
                        icon: TreePine,
                        label: "Plantation",
                        stat: getStatByType("PLANTATION"),
                        unit: "trees planted",
                        color: "text-emerald-600",
                    },
                    {
                        icon: Droplets,
                        label: "Resource Savings",
                        stat: getStatByType("SAVINGS"),
                        unit: "units saved",
                        color: "text-cyan-600",
                    },
                    {
                        icon: Wind,
                        label: "Emission Reduction",
                        stat: getStatByType("REDUCTION"),
                        unit: "trips avoided",
                        color: "text-amber-600",
                    },
                ].map((item) => (
                    <Card key={item.label}>
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                                <h3 className="font-semibold">{item.label}</h3>
                            </div>
                            <p className="text-2xl font-bold">
                                {(item.stat?._sum.quantity ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                            </p>
                            <p className="text-sm text-muted-foreground">{item.unit}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                                {item.stat?._count ?? 0} actions • {(item.stat?._sum.credits ?? 0).toFixed(0)} credits earned
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
