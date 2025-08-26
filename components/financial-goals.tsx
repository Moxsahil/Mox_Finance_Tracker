"use client";

import { useState } from "react";
import { Target, Plus, MoreHorizontal, TrendingUp, Edit, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetGoals } from "@/features/goals/api/use-get-goals";
import { useContributeGoal } from "@/features/goals/api/use-contribute-goal";
import { useDeleteGoal } from "@/features/goals/api/use-delete-goal";
import { useNewGoal } from "@/features/goals/hooks/use-new-goal";
import { NewGoalSheet } from "@/features/goals/components/new-goal-sheet";
import { ContributeDialog } from "@/features/goals/components/contribute-dialog";
import { formatCurrency } from "@/lib/utils";
import { useConfirm } from "@/hooks/use-confirm";

const getIconByName = (iconName: string) => {
    const iconMap = {
        Target,
        TrendingUp,
        Plus,
    };
    return iconMap[iconName as keyof typeof iconMap] || Target;
};

const getColorClasses = (color: string) => {
    const colorMap = {
        blue: {
            bg: "from-blue-500 to-indigo-600",
            progress: "from-blue-500 to-indigo-600",
        },
        emerald: {
            bg: "from-emerald-500 to-teal-600",
            progress: "from-emerald-500 to-teal-600",
        },
        purple: {
            bg: "from-purple-500 to-pink-600",
            progress: "from-purple-500 to-pink-600",
        },
        orange: {
            bg: "from-orange-500 to-amber-600",
            progress: "from-orange-500 to-amber-600",
        },
        pink: {
            bg: "from-pink-500 to-rose-600",
            progress: "from-pink-500 to-rose-600",
        },
        indigo: {
            bg: "from-indigo-500 to-purple-600",
            progress: "from-indigo-500 to-purple-600",
        },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
};

export const FinancialGoals = () => {
    const [contributeDialog, setContributeDialog] = useState<{
        open: boolean;
        goalId: string;
        goalName: string;
    }>({
        open: false,
        goalId: "",
        goalName: "",
    });

    const { data: goals, isLoading } = useGetGoals();
    const { onOpen } = useNewGoal();
    const contributeMutation = useContributeGoal(contributeDialog.goalId);
    const deleteMutation = useDeleteGoal();
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "This will permanently delete this goal and all associated contributions."
    );

    const handleContribute = (goalId: string, goalName: string) => {
        setContributeDialog({
            open: true,
            goalId,
            goalName,
        });
    };

    const handleContributeSubmit = (values: { amount: number; note?: string }) => {
        contributeMutation.mutate(values, {
            onSuccess: () => {
                setContributeDialog({
                    open: false,
                    goalId: "",
                    goalName: "",
                });
            },
        });
    };

    const handleDelete = async (goalId: string) => {
        const ok = await confirm();
        if (ok) {
            deleteMutation.mutate(goalId);
        }
    };

    if (isLoading) {
        return (
            <Card className="border-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-gray-900/50 dark:to-pink-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            Financial Goals
                        </CardTitle>
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />
                                <Skeleton className="h-5 w-24 mx-auto mb-2" />
                                <Skeleton className="h-4 w-32 mx-auto mb-3" />
                                <Skeleton className="h-2 w-full rounded-full" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card className="border-0 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-900/20 dark:via-gray-900/50 dark:to-pink-900/20 backdrop-blur-sm shadow-xl">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <Target className="h-4 w-4 text-white" />
                            </div>
                            Financial Goals
                        </CardTitle>
                        <Button onClick={onOpen} size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Goal
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {!goals?.length ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                <Target className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="font-semibold mb-2">No goals yet</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                                Set your first financial goal to start tracking your progress.
                            </p>
                            <Button onClick={onOpen} className="gap-2">
                                <Plus className="h-4 w-4" />
                                Create Your First Goal
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {goals.map((goal) => {
                                const IconComponent = getIconByName(goal.icon);
                                const colors = getColorClasses(goal.color);
                                const progress = goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
                                const progressClamped = Math.min(progress, 100);

                                return (
                                    <div key={goal.id} className="group text-center p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-200 relative">
                                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => handleContribute(goal.id, goal.name)}
                                                    >
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Add Contribution
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => handleDelete(goal.id)}
                                                        className="text-red-600"
                                                    >
                                                        <Trash className="h-4 w-4 mr-2" />
                                                        Delete Goal
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${colors.bg} flex items-center justify-center`}>
                                            <span className="text-white font-bold text-lg">
                                                {Math.round(progressClamped)}%
                                            </span>
                                        </div>
                                        
                                        <h3 className="font-semibold mb-2 truncate">{goal.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">
                                            {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
                                        </p>
                                        
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                                            <div
                                                className={`bg-gradient-to-r ${colors.progress} h-2 rounded-full transition-all duration-500`}
                                                style={{ width: `${progressClamped}%` }}
                                            />
                                        </div>

                                        {goal.description && (
                                            <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                                {goal.description}
                                            </p>
                                        )}

                                        <Button
                                            onClick={() => handleContribute(goal.id, goal.name)}
                                            size="sm"
                                            className="gap-2 w-full"
                                            variant="outline"
                                        >
                                            <Plus className="h-3 w-3" />
                                            Contribute
                                        </Button>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            <NewGoalSheet />
            <ContributeDialog
                open={contributeDialog.open}
                onOpenChange={(open) => setContributeDialog(prev => ({ ...prev, open }))}
                onSubmit={handleContributeSubmit}
                goalName={contributeDialog.goalName}
                disabled={contributeMutation.isPending}
            />
            <ConfirmDialog />
        </>
    );
};