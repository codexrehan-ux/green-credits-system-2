import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
    const topUsers = await prisma.user.findMany({
        orderBy: { greenScore: "desc" },
        take: 10,
        select: {
            id: true,
            name: true,
            greenScore: true,
            totalCredits: true,
        },
    });

    const rankIcons = [
        <Trophy key="1" className="h-5 w-5 text-yellow-500" />,
        <Medal key="2" className="h-5 w-5 text-gray-400" />,
        <Award key="3" className="h-5 w-5 text-amber-600" />,
    ];

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold">🏆 Leaderboard</h1>
                <p className="text-muted-foreground mt-1">Top eco-warriors ranked by Green Score</p>
            </div>

            {/* Top 3 Cards */}
            {topUsers.length >= 3 && (
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[1, 0, 2].map((idx) => {
                        const user = topUsers[idx];
                        if (!user) return null;
                        return (
                            <Card key={user.id} className={`text-center ${idx === 0 ? "ring-2 ring-yellow-400 shadow-lg scale-105" : ""}`}>
                                <CardContent className="p-4">
                                    <div className="flex justify-center mb-2">{rankIcons[idx]}</div>
                                    <Avatar className="h-12 w-12 mx-auto mb-2">
                                        <AvatarFallback className="text-sm font-semibold">
                                            {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) ?? "?"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold text-sm truncate">{user.name?.split(" ")[0] ?? "User"}</p>
                                    <Badge variant="secondary" className="mt-1">{user.greenScore.toFixed(0)} pts</Badge>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            {/* Full Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-16">Rank</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Green Score</TableHead>
                            <TableHead className="text-right">Credits</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {topUsers.map((user, i) => (
                            <TableRow key={user.id}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-1">
                                        {i < 3 ? rankIcons[i] : <span className="text-muted-foreground w-5 text-center">{i + 1}</span>}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback className="text-xs">
                                                {user.name?.split(" ").map((n) => n[0]).join("").slice(0, 2) ?? "?"}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">{user.name?.split(" ")[0] ?? "Anonymous"}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-semibold text-primary">{user.greenScore.toFixed(0)}</TableCell>
                                <TableCell className="text-right text-muted-foreground">{user.totalCredits.toFixed(0)}</TableCell>
                            </TableRow>
                        ))}
                        {topUsers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                                    No users yet. Be the first to earn green credits!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
