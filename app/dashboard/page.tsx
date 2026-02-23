"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Leaf,
    Recycle,
    Train,
    TreePine,
    Droplets,
    Zap,
    Award,
    TrendingUp,
    Wind,
    ArrowRight,
} from "lucide-react";
import { DashboardTabs } from "./dashboard-tabs";

interface DashboardData {
    user: {
        name: string;
        totalCredits: number;
        onboarded: boolean;
    };
    stats: {
        co2Saved: string;
        greenScore: string;
        recycleStats: number;
        transportStats: number;
        plantationStats: number;
        savingsStats: number;
    };
    actionLogs: any[];
    transactions: any[];
    redeemTransactions: any[];
}

export default function DashboardPage() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await fetch("/api/dashboard");
            if (!response.ok) {
                if (response.status === 401) {
                    window.location.href = "/login";
                    return;
                }
                throw new Error("Failed to fetch dashboard data");
            }
            const dashboardData = await response.json();
            setData(dashboardData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-muted rounded w-1/3" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-muted rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-destructive">Error loading dashboard: {error}</p>
                    <Button onClick={fetchDashboardData} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    const quickActions = [
        { href: "/actions/recycle", icon: Recycle, label: "Recycle", color: "text-green-600" },
        { href: "/actions/transport", icon: Train, label: "Transport", color: "text-blue-600" },
        { href: "/actions/plantation", icon: TreePine, label: "Plant Trees", color: "text-emerald-600" },
        { href: "/actions/savings", icon: Droplets, label: "Savings", color: "text-cyan-600" },
        { href: "/actions/reduction", icon: Zap, label: "Reduce", color: "text-amber-600" },
    ];

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in-up">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                            Welcome back, {data.user.name?.split(" ")[0] ?? "Hero"} 🌱
                        </h1>
                        <p className="text-muted-foreground mt-1">Track your eco-friendly impact and manage your green credits</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm text-muted-foreground">Active</span>
                    </div>
                </div>
            </div>

            {/* Hero Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in-up">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                    <CardContent className="relative p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">Total Green Credits</p>
                                <p className="text-4xl font-bold text-blue-600 mt-2">{data.user.totalCredits.toFixed(0)}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <div className="h-1 w-12 bg-blue-200 rounded-full" />
                                    <span className="text-xs text-blue-600">+12% this month</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                                <Leaf className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in-up animation-delay-200">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl" />
                    <CardContent className="relative p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">Green Score</p>
                                <p className="text-4xl font-bold text-indigo-600 mt-2">{data.stats.greenScore}</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <div className="h-1 w-12 bg-indigo-200 rounded-full" />
                                    <span className="text-xs text-indigo-600">Top 15%</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <TrendingUp className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-fade-in-up animation-delay-400">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" />
                    <CardContent className="relative p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground font-medium">CO₂ Saved</p>
                                <p className="text-4xl font-bold text-cyan-600 mt-2">{data.stats.co2Saved} kg</p>
                                <div className="flex items-center gap-1 mt-2">
                                    <div className="h-1 w-12 bg-cyan-200 rounded-full" />
                                    <span className="text-xs text-cyan-600">{((parseFloat(data.stats.co2Saved) / 1000) * 100).toFixed(1)}% ton</span>
                                </div>
                            </div>
                            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <Wind className="h-7 w-7 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { icon: Recycle, label: "Recycled", value: `${data.stats.recycleStats.toFixed(1)} kg`, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800" },
                    { icon: Train, label: "Transport", value: `${data.stats.transportStats.toFixed(1)} km`, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800" },
                    { icon: TreePine, label: "Trees Planted", value: `${data.stats.plantationStats.toFixed(0)}`, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800" },
                    { icon: Droplets, label: "Resources Saved", value: `${data.stats.savingsStats.toFixed(1)}`, color: "text-cyan-600", bg: "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800" },
                ].map((stat, index) => (
                    <Card key={stat.label} className={`border ${stat.bg} hover:shadow-md transition-all duration-300 hover:scale-[1.02] animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className={`h-12 w-12 rounded-xl ${stat.bg} flex items-center justify-center border`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground font-medium">{stat.label}</p>
                                <p className="text-lg font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Quick Actions</h2>
                    <Badge variant="outline" className="text-xs">5 available</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {quickActions.map((action, index) => (
                        <Link key={action.href} href={action.href}>
                            <Card className="group border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.05] cursor-pointer bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                                <CardContent className="p-6 flex flex-col items-center gap-3 text-center">
                                    <div className={`h-12 w-12 rounded-xl ${action.color.replace('text-', 'bg-')} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <action.icon className={`h-6 w-6 ${action.color}`} />
                                    </div>
                                    <span className="text-sm font-medium">{action.label}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
                <div className="mt-6">
                    <Link href="/redeem">
                        <Button variant="outline" className="w-full sm:w-auto bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-950/30 transition-all duration-300 hover:scale-[1.02]">
                            <Award className="h-4 w-4 mr-2 text-amber-600" /> 
                            <span className="text-amber-700 dark:text-amber-400">Redeem Credits</span> 
                            <ArrowRight className="h-4 w-4 ml-2 text-amber-600" />
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Tabs Section */}
            <DashboardTabs
                actionLogs={data.actionLogs}
                transactions={data.transactions}
                redeemTransactions={data.redeemTransactions}
            />
        </div>
    );
}
