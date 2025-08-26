"use client";

import { CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { formatCurrency } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";
import { useSearchParams } from "next/navigation";

export const RecentActivity = () => {
    const params = useSearchParams();
    const { data: transactions, isLoading } = useGetTransactions();

    if (isLoading) {
        return (
            <Card className="border-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-gray-900/50 dark:to-teal-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-xl">
                            <Skeleton className="w-2 h-2 rounded-full" />
                            <div className="flex-1">
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-16" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        );
    }

    // Get the 5 most recent transactions
    const recentTransactions = transactions?.slice(0, 5) || [];

    if (recentTransactions.length === 0) {
        return (
            <Card className="border-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-gray-900/50 dark:to-teal-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-center">
                        <p className="text-sm text-muted-foreground">
                            No recent transactions. Add your first transaction to see activity here.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getTransactionColor = (amount: number) => {
        if (amount > 0) {
            return {
                dot: "bg-emerald-500",
                text: "text-emerald-600",
                sign: "+"
            };
        } else {
            return {
                dot: "bg-orange-500",
                text: "text-orange-600",
                sign: ""
            };
        }
    };

    return (
        <Card className="border-0 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-900/20 dark:via-gray-900/50 dark:to-teal-900/20 backdrop-blur-sm shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                        <CreditCard className="h-4 w-4 text-white" />
                    </div>
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {recentTransactions.map((transaction) => {
                    const colors = getTransactionColor(transaction.amount);
                    const timeAgo = formatDistanceToNow(new Date(transaction.date), { addSuffix: true });

                    return (
                        <div
                            key={transaction.id}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors cursor-pointer"
                        >
                            <div className={`w-2 h-2 ${colors.dot} rounded-full flex-shrink-0`}></div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">
                                    {transaction.payee}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {timeAgo}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-semibold ${colors.text}`}>
                                    {colors.sign}{formatCurrency(transaction.amount)}
                                </p>
                                {transaction.category && (
                                    <p className="text-xs text-muted-foreground">
                                        {transaction.category}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
};