"use client";

import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetInsights } from "@/features/insights/api/use-get-insights";

export const SmartInsights = () => {
    const { data: insights, isLoading } = useGetInsights();

    if (isLoading) {
        return (
            <Card className="border-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/20 dark:via-gray-900/50 dark:to-cyan-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        Smart Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (!insights?.insights?.length) {
        return (
            <Card className="border-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/20 dark:via-gray-900/50 dark:to-cyan-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center">
                            <TrendingUp className="h-4 w-4 text-white" />
                        </div>
                        Smart Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-center">
                        <p className="text-sm text-muted-foreground">
                            Add some transactions to get personalized insights about your spending patterns.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const getInsightColor = (type: string) => {
        switch (type) {
            case 'success':
                return 'text-emerald-600';
            case 'warning':
                return 'text-orange-600';
            case 'info':
                return 'text-blue-600';
            default:
                return 'text-blue-600';
        }
    };

    const getInsightIcon = (type: string) => {
        switch (type) {
            case 'success':
                return '✨';
            case 'warning':
                return '⚠️';
            case 'info':
                return '📊';
            default:
                return '💡';
        }
    };

    return (
        <Card className="border-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-indigo-900/20 dark:via-gray-900/50 dark:to-cyan-900/20 backdrop-blur-sm shadow-xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-600 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    Smart Insights
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {insights.insights.map((insight, index) => (
                    <div key={index} className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors">
                        <p className={`text-sm font-medium mb-1 ${getInsightColor(insight.type)}`}>
                            {getInsightIcon(insight.type)} {insight.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {insight.message}
                        </p>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};