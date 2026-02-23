import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CO2_PER_CREDIT } from "@/lib/constants";

export async function GET(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch stats
        const [actionLogs, transactions, recycleStats, transportStats, plantationStats, savingsStats] = await Promise.all([
            prisma.actionLog.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
                take: 10,
            }),
            prisma.transaction.findMany({
                where: { userId: user.id },
                orderBy: { createdAt: "desc" },
                take: 10,
            }),
            prisma.actionLog.aggregate({
                where: { userId: user.id, type: "RECYCLE" },
                _sum: { quantity: true },
            }),
            prisma.actionLog.aggregate({
                where: { userId: user.id, type: "TRANSPORT" },
                _sum: { quantity: true },
            }),
            prisma.actionLog.aggregate({
                where: { userId: user.id, type: "PLANTATION" },
                _sum: { quantity: true },
            }),
            prisma.actionLog.aggregate({
                where: { userId: user.id, type: "SAVINGS" },
                _sum: { quantity: true },
            }),
        ]);

        const co2Saved = (user.totalCredits * CO2_PER_CREDIT).toFixed(1);
        const greenScore = (user.totalCredits * 1.2).toFixed(0);
        const redeemTransactions = transactions.filter((t) => t.type === "REDEEM");

        return NextResponse.json({
            user: {
                name: user.name,
                totalCredits: user.totalCredits,
                onboarded: user.onboarded,
            },
            stats: {
                co2Saved,
                greenScore,
                recycleStats: recycleStats._sum.quantity ?? 0,
                transportStats: transportStats._sum.quantity ?? 0,
                plantationStats: plantationStats._sum.quantity ?? 0,
                savingsStats: savingsStats._sum.quantity ?? 0,
            },
            actionLogs: actionLogs.map((a) => ({
                ...a,
                createdAt: a.createdAt.toISOString(),
            })),
            transactions: transactions.map((t) => ({
                ...t,
                createdAt: t.createdAt.toISOString(),
            })),
            redeemTransactions: redeemTransactions.map((t) => ({
                ...t,
                createdAt: t.createdAt.toISOString(),
            })),
        });
    } catch (error) {
        console.error("Dashboard API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
