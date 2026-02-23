"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { updateProfile, updateBankDetails } from "./actions";
import { User, CreditCard } from "lucide-react";

const profileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().optional(),
});

const bankSchema = z.object({
    bankName: z.string().min(1, "Bank name is required"),
    accountNo: z.string().min(1, "Account number is required"),
    ifsc: z.string().min(1, "IFSC code is required").regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC format"),
});

interface Props {
    user: { name: string; email: string; phone: string; image: string };
    bankDetails: { bankName: string; accountNo: string; ifsc: string } | null;
}

export function ProfileClient({ user, bankDetails }: Props) {
    const profileForm = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: user.name, phone: user.phone },
    });

    const bankForm = useForm<z.infer<typeof bankSchema>>({
        resolver: zodResolver(bankSchema),
        defaultValues: bankDetails ?? { bankName: "", accountNo: "", ifsc: "" },
    });

    const onProfileSubmit = async (data: z.infer<typeof profileSchema>) => {
        try {
            await updateProfile({ name: data.name, phone: data.phone ?? "" });
            toast.success("Profile updated successfully!");
        } catch {
            toast.error("Failed to update profile");
        }
    };

    const onBankSubmit = async (data: z.infer<typeof bankSchema>) => {
        try {
            await updateBankDetails(data);
            toast.success("Bank details updated successfully!");
        } catch {
            toast.error("Failed to update bank details");
        }
    };

    return (
        <div className="mx-auto max-w-2xl px-4 py-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your account details and bank information</p>
            </div>

            {/* User Info */}
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={user.image} />
                            <AvatarFallback className="text-lg">{user.name?.[0] ?? "U"}</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" /> Profile Information
                            </CardTitle>
                            <CardDescription>{user.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" {...profileForm.register("name")} />
                            {profileForm.formState.errors.name && (
                                <p className="text-destructive text-xs mt-1">{profileForm.formState.errors.name.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" value={user.email} disabled className="opacity-60" />
                            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed (linked to Google)</p>
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" {...profileForm.register("phone")} placeholder="+91 98765 43210" />
                        </div>
                        <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                            {profileForm.formState.isSubmitting ? "Saving..." : "Save Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Bank Details */}
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" /> Bank Details
                    </CardTitle>
                    <CardDescription>Add or update bank details for credit redemption</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={bankForm.handleSubmit(onBankSubmit)} className="space-y-4">
                        <div>
                            <Label htmlFor="bankName">Bank Name</Label>
                            <Input id="bankName" {...bankForm.register("bankName")} placeholder="e.g. State Bank of India" />
                            {bankForm.formState.errors.bankName && (
                                <p className="text-destructive text-xs mt-1">{bankForm.formState.errors.bankName.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="accountNo">Account Number</Label>
                            <Input id="accountNo" {...bankForm.register("accountNo")} />
                            {bankForm.formState.errors.accountNo && (
                                <p className="text-destructive text-xs mt-1">{bankForm.formState.errors.accountNo.message}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="ifsc">IFSC Code</Label>
                            <Input id="ifsc" {...bankForm.register("ifsc")} placeholder="e.g. SBIN0001234"
                                onChange={(e) => bankForm.setValue("ifsc", e.target.value.toUpperCase())} />
                            {bankForm.formState.errors.ifsc && (
                                <p className="text-destructive text-xs mt-1">{bankForm.formState.errors.ifsc.message}</p>
                            )}
                        </div>
                        <Button type="submit" disabled={bankForm.formState.isSubmitting}>
                            {bankForm.formState.isSubmitting ? "Saving..." : "Save Bank Details"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
