import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { HistoryClient } from "./history-client";

export const dynamic = "force-dynamic";

export default async function HistoryPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const [actionLogs, transactions] = await Promise.all([
        prisma.actionLog.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        }),
        prisma.transaction.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        }),
    ]);

    return (
        <HistoryClient
            actionLogs={actionLogs.map((a) => ({ ...a, createdAt: a.createdAt.toISOString() }))}
            transactions={transactions.map((t) => ({ ...t, createdAt: t.createdAt.toISOString() }))}
        />
    );
}
