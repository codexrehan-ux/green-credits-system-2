"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function updateProfile(data: {
    name: string;
    phone: string;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name: data.name,
            phone: data.phone,
        },
    });

    return { success: true };
}

export async function updateBankDetails(data: {
    bankName: string;
    accountNo: string;
    ifsc: string;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.bankDetails.upsert({
        where: { userId: session.user.id },
        create: {
            userId: session.user.id,
            bankName: data.bankName,
            accountNo: data.accountNo,
            ifsc: data.ifsc,
        },
        update: {
            bankName: data.bankName,
            accountNo: data.accountNo,
            ifsc: data.ifsc,
        },
    });

    return { success: true };
}
