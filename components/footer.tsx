import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, Github, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t bg-gradient-to-b from-background to-muted/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 group">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.05]">
                                <Leaf className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold">
                                Green<span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Credits</span>
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Motivating eco-friendly habits through green credits. Earn, track, and redeem your way to a greener planet.
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-all duration-200 hover:scale-[1.1]">
                                <Github className="h-4 w-4" />
                            </a>
                            <a href="#" className="h-8 w-8 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-all duration-200 hover:scale-[1.1]">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-base mb-4">Platform</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">About Us</Link></li>
                            <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">How It Works</Link></li>
                            <li><Link href="/login" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">Get Started</Link></li>
                            <li><Link href="/leaderboard" className="text-muted-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 inline-block">Leaderboard</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-base mb-4">Eco Actions</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-green-500 rounded-full" />
                                Recycling
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-blue-500 rounded-full" />
                                Public Transport
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-emerald-500 rounded-full" />
                                Tree Plantation
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-cyan-500 rounded-full" />
                                Energy Savings
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-base mb-4">Redeem Partners</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-purple-500 rounded-full" />
                                Government Hospitals
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-orange-500 rounded-full" />
                                Medical Shops
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-indigo-500 rounded-full" />
                                Metro/Bus Recharge
                            </li>
                            <li className="flex items-center gap-2 text-muted-foreground">
                                <div className="h-2 w-2 bg-pink-500 rounded-full" />
                                Electricity Bills
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {new Date().getFullYear()} GreenCredits. All rights reserved. Built for a sustainable future. 🌱
                        </p>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>support@greencredits.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>1-800-GREEN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
