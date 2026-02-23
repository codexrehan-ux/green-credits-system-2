"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CREDIT_RATES } from "@/lib/constants";
import { ActionType } from "@prisma/client";

interface ActionInput {
    type: ActionType;
    details: string;
    quantity: number;
    unit: string;
    subType?: string;
}

function calculateCredits(input: ActionInput): number {
    switch (input.type) {
        case "RECYCLE":
            return (CREDIT_RATES.recycle[input.subType ?? "plastic"] ?? 5) * input.quantity;
        case "TRANSPORT":
            return CREDIT_RATES.transport * input.quantity;
        case "PLANTATION":
            return CREDIT_RATES.plantation * input.quantity;
        case "SAVINGS":
            if (input.subType === "electricity") return CREDIT_RATES.savings.electricity * input.quantity;
            return CREDIT_RATES.savings.water * input.quantity;
        case "REDUCTION":
            return CREDIT_RATES.reduction * input.quantity;
        default:
            return 0;
    }
}

export async function logAction(input: ActionInput) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const credits = calculateCredits(input);

    const [actionLog] = await prisma.$transaction([
        prisma.actionLog.create({
            data: {
                userId: session.user.id,
                type: input.type,
                details: input.details,
                quantity: input.quantity,
                unit: input.unit,
                credits,
            },
        }),
        prisma.transaction.create({
            data: {
                userId: session.user.id,
                type: "EARN",
                amount: credits,
                note: `${input.type}: ${input.details}`,
            },
        }),
        prisma.user.update({
            where: { id: session.user.id },
            data: {
                totalCredits: { increment: credits },
                greenScore: { increment: credits * 1.2 },
            },
        }),
    ]);

    return { credits, actionLog };
}
