"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function completeOnboarding(formData: {
    name: string;
    phone: string;
    bankName?: string;
    accountNo?: string;
    ifsc?: string;
}) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    await prisma.user.update({
        where: { id: session.user.id },
        data: {
            name: formData.name,
            phone: formData.phone,
            onboarded: true,
        },
    });

    if (formData.bankName && formData.accountNo && formData.ifsc) {
        await prisma.bankDetails.upsert({
            where: { userId: session.user.id },
            create: {
                userId: session.user.id,
                bankName: formData.bankName,
                accountNo: formData.accountNo,
                ifsc: formData.ifsc,
            },
            update: {
                bankName: formData.bankName,
                accountNo: formData.accountNo,
                ifsc: formData.ifsc,
            },
        });
    }

    redirect("/dashboard");
}
