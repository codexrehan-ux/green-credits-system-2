"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function redeemCredits(input: {
    place: string;
    credits: number;
    note?: string;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) throw new Error("User not found");
    if (user.totalCredits < input.credits) throw new Error("Insufficient credits");
    if (input.credits <= 0) throw new Error("Invalid credit amount");

    await prisma.$transaction([
        prisma.transaction.create({
            data: {
                userId: session.user.id,
                type: "REDEEM",
                amount: input.credits,
                place: input.place,
                note: input.note ?? null,
            },
        }),
        prisma.user.update({
            where: { id: session.user.id },
            data: {
                totalCredits: { decrement: input.credits },
            },
        }),
    ]);

    return {
        success: true,
        confirmationCode: `GC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    };
}
