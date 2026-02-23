import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfileClient } from "./profile-client";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { bankDetails: true },
    });

    if (!user) redirect("/login");

    return (
        <ProfileClient
            user={{
                name: user.name ?? "",
                email: user.email ?? "",
                phone: user.phone ?? "",
                image: user.image ?? "",
            }}
            bankDetails={
                user.bankDetails
                    ? {
                        bankName: user.bankDetails.bankName,
                        accountNo: user.bankDetails.accountNo,
                        ifsc: user.bankDetails.ifsc,
                    }
                    : null
            }
        />
    );
}
