import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RedeemClient } from "./redeem-client";

export const dynamic = "force-dynamic";

export default async function RedeemPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { totalCredits: true },
    });

    return <RedeemClient balance={user?.totalCredits ?? 0} />;
}
