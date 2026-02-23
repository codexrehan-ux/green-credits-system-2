"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ActionLogItem {
    id: string;
    type: string;
    details: string;
    quantity: number;
    unit: string;
    credits: number;
    createdAt: string;
}

interface TransactionItem {
    id: string;
    type: string;
    amount: number;
    place: string | null;
    note: string | null;
    createdAt: string;
}

export function DashboardTabs({
    actionLogs,
    transactions,
    redeemTransactions,
}: {
    actionLogs: ActionLogItem[];
    transactions: TransactionItem[];
    redeemTransactions: TransactionItem[];
}) {
    return (
        <Tabs defaultValue="recent">
            <TabsList className="mb-4">
                <TabsTrigger value="recent">Recent Actions</TabsTrigger>
                <TabsTrigger value="credits">Credit History</TabsTrigger>
                <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
            </TabsList>

            <TabsContent value="recent">
                {actionLogs.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-8 text-center">
                        No actions logged yet. Start by logging your first green action!
                    </p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead className="text-right">Credits</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {actionLogs.map((log) => (
                                    <TableRow key={log.id}>
                                        <TableCell className="text-sm">{new Date(log.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="capitalize text-xs">{log.type.toLowerCase()}</Badge>
                                        </TableCell>
                                        <TableCell className="text-sm">{log.details}</TableCell>
                                        <TableCell className="text-sm">{log.quantity} {log.unit}</TableCell>
                                        <TableCell className="text-right font-medium text-primary">+{log.credits}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </TabsContent>

            <TabsContent value="credits">
                {transactions.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-8 text-center">No credit transactions yet.</p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Place/Note</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="text-sm">{new Date(t.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <Badge variant={t.type === "EARN" ? "default" : "destructive"} className="text-xs">
                                                {t.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className={`font-medium ${t.type === "EARN" ? "text-primary" : "text-destructive"}`}>
                                            {t.type === "EARN" ? "+" : "-"}{t.amount}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{t.place ?? t.note ?? "—"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </TabsContent>

            <TabsContent value="redemptions">
                {redeemTransactions.length === 0 ? (
                    <p className="text-muted-foreground text-sm py-8 text-center">No redemptions yet. Visit the Redemption Center to use your credits!</p>
                ) : (
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Place</TableHead>
                                    <TableHead>Credits Used</TableHead>
                                    <TableHead>Note</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {redeemTransactions.map((t) => (
                                    <TableRow key={t.id}>
                                        <TableCell className="text-sm">{new Date(t.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-sm font-medium">{t.place ?? "—"}</TableCell>
                                        <TableCell className="text-destructive font-medium">-{t.amount}</TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{t.note ?? "—"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}
