"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Leaf, Menu, X, LogOut, LayoutDashboard, User } from "lucide-react";
import { useState } from "react";

const publicLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/how-it-works", label: "How It Works" },
];

const authLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/profile", label: "Profile", icon: User },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [menuOpen, setMenuOpen] = useState(false);

    const isDashboard = pathname.startsWith("/dashboard") || pathname.startsWith("/actions") ||
        pathname.startsWith("/redeem") || pathname.startsWith("/profile") ||
        pathname.startsWith("/history") || pathname.startsWith("/leaderboard") ||
        pathname.startsWith("/impact");

    return (
        <nav className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.05]">
                        <Leaf className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight">
                        Green<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Credits</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-8">
                    {!isDashboard && publicLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-[1.05] ${pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {session && isDashboard && authLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-2 text-sm font-medium transition-all duration-200 hover:text-primary hover:scale-[1.05] ${pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                                }`}
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <Link href="/dashboard" className="group">
                                <Avatar className="h-9 w-9 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                                    <AvatarImage src={session.user?.image ?? ""} />
                                    <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-medium">
                                        {session.user?.name?.[0] ?? "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                            <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: "/" })} className="hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200">
                                <LogOut className="h-4 w-4 mr-2" />
                                Sign Out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-all duration-200">Log In</Button>
                            </Link>
                            <Link href="/login">
                                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu button */}
                <button className="md:hidden p-2 cursor-pointer hover:bg-muted/50 rounded-lg transition-colors" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden border-t bg-background/95 backdrop-blur-lg p-4 space-y-4 animate-fade-in-up">
                    {!isDashboard && publicLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {session && authLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="block text-sm font-medium text-muted-foreground hover:text-primary py-2 transition-colors"
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t">
                        {session ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session.user?.image ?? ""} />
                                        <AvatarFallback className="bg-gradient-to-br from-green-500 to-emerald-600 text-white font-medium">
                                            {session.user?.name?.[0] ?? "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm font-medium">{session.user?.name}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="w-full justify-start hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-600 transition-all duration-200" onClick={() => signOut({ callbackUrl: "/" })}>
                                    <LogOut className="h-4 w-4 mr-2" />Sign Out
                                </Button>
                            </div>
                        ) : (
                            <Link href="/login" onClick={() => setMenuOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300" size="sm">Log In / Sign Up</Button>
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
