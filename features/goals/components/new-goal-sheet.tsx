"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { GoalForm } from "./goal-form";
import { useNewGoal } from "../hooks/use-new-goal";
import { useCreateGoal } from "../api/use-create-goal";
import { convertAmountToMiliunits } from "@/lib/utils";
import { z } from "zod";

const formSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    targetAmount: z.string(),
    targetDate: z.string().optional(),
    color: z.string(),
    icon: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export const NewGoalSheet = () => {
    const { isOpen, onClose } = useNewGoal();
    const mutation = useCreateGoal();

    const onSubmit = (values: FormValues) => {
        const targetAmount = convertAmountToMiliunits(parseFloat(values.targetAmount));
        const targetDate = values.targetDate ? new Date(values.targetDate) : undefined;

        mutation.mutate({
            name: values.name,
            description: values.description,
            targetAmount,
            targetDate,
            color: values.color,
            icon: values.icon,
        }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Financial Goal</SheetTitle>
                    <SheetDescription>
                        Set a new financial goal to track your progress and stay motivated.
                    </SheetDescription>
                </SheetHeader>
                <GoalForm
                    onSubmit={onSubmit}
                    disabled={mutation.isPending}
                />
            </SheetContent>
        </Sheet>
    );
};