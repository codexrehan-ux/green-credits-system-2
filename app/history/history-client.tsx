"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";

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

export function HistoryClient({
    actionLogs,
    transactions,
}: {
    actionLogs: ActionLogItem[];
    transactions: TransactionItem[];
}) {
    const [filter, setFilter] = useState("all");
    const filteredLogs = filter === "all" ? actionLogs : actionLogs.filter((l) => l.type === filter);

    return (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">History</h1>
                <p className="text-muted-foreground mt-1">View all your credit transactions and action logs</p>
            </div>

            <Tabs defaultValue="transactions">
                <TabsList className="mb-4">
                    <TabsTrigger value="transactions">Credit Transactions</TabsTrigger>
                    <TabsTrigger value="actions">Action Logs</TabsTrigger>
                </TabsList>

                <TabsContent value="transactions">
                    {transactions.length === 0 ? (
                        <p className="text-muted-foreground text-sm py-8 text-center">No transactions yet.</p>
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

                <TabsContent value="actions">
                    <div className="mb-4">
                        <Select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-48">
                            <option value="all">All Actions</option>
                            <option value="RECYCLE">Recycling</option>
                            <option value="TRANSPORT">Transport</option>
                            <option value="PLANTATION">Plantation</option>
                            <option value="SAVINGS">Savings</option>
                            <option value="REDUCTION">Reduction</option>
                        </Select>
                    </div>
                    {filteredLogs.length === 0 ? (
                        <p className="text-muted-foreground text-sm py-8 text-center">No actions found.</p>
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
                                    {filteredLogs.map((log) => (
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
            </Tabs>
        </div>
    );
}
