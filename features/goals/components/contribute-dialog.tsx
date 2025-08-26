"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMiliunits } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
    amount: z.string().min(1, "Amount is required"),
    note: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: { amount: number; note?: string }) => void;
    goalName: string;
    disabled?: boolean;
};

export const ContributeDialog = ({
    open,
    onOpenChange,
    onSubmit,
    goalName,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            amount: "",
            note: "",
        },
    });

    const handleSubmit = (values: FormValues) => {
        const amount = convertAmountToMiliunits(parseFloat(values.amount));
        onSubmit({
            amount,
            note: values.note,
        });
        form.reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contribute to {goalName}</DialogTitle>
                    <DialogDescription>
                        Add money to your goal to track your progress.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            name="amount"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={disabled}
                                            placeholder="100.00"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="note"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Note (Optional)</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={disabled}
                                            placeholder="e.g. Bonus money, savings from budget"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={disabled}>
                                Add Contribution
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};