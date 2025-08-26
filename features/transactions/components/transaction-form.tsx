import { z } from "zod";
import { Trash, Receipt, Calendar, Wallet, Target, User, DollarSign, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/amount-input";
import { DatePicker } from "@/components/date-picker";
import { insertTransactionSchema } from "@/db/schema";
import { Select } from "@/components/select";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { convertAmountToMiliunits } from "@/lib/utils";

const formSchema = z.object ({
    date: z.coerce.date(),
    accountId: z.string(),
    categoryId: z.string().nullable().optional(),
    payee: z.string().min(1, "Payee name is required").refine((val) => val.trim().length > 0, {
        message: "Payee name cannot be blank",
    }),
    amount: z.string(),
    notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({
    id: true,
})

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: ApiFormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
    accountOptions: { label: string; value: string }[];
    categoryOptions: { label: string; value: string }[];
    onCreateAccount: (name: string) => void;
    onCreateCategory: (name: string) => void;
};

export const TransactionForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
    accountOptions,
    categoryOptions,
    onCreateAccount,
    onCreateCategory,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ...defaultValues, 
            payee: defaultValues?.payee ?? "",  // Ensuring  payee is always a string otherwise it will be intially shown as undefined
            date: defaultValues?.date ?? new Date(),
        },
    });
    

    const handleSubmit = (values: FormValues) => {
        const amount = parseFloat(values.amount);
        const amountInMiliunits = convertAmountToMiliunits(amount);
        onSubmit({
            ...values,
            amount: amountInMiliunits,
        });
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            {/* Form Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                        <Receipt className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white tracking-tight">
                        {id ? "Edit Transaction" : "Create New Transaction"}
                    </h3>
                </div>
            </div>

            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="p-6 space-y-6"
                >
                <FormField 
                    name="date"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Transaction Date
                            </FormLabel>
                            <FormControl>
                                <DatePicker 
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="accountId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <Wallet className="w-4 h-4" />
                                Account
                            </FormLabel>
                            <FormControl>
                                <Select 
                                    options={accountOptions}
                                    placeholder="Select an account"
                                    onCreate={onCreateAccount}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="categoryId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Category
                            </FormLabel>
                            <FormControl>
                                <Select 
                                    options={categoryOptions}
                                    placeholder="Select a category"
                                    onCreate={onCreateCategory}
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={disabled}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField 
                    name="payee"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Payee Name
                            </FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                    <Input 
                                        disabled={disabled}
                                        placeholder="Add Payee name"
                                        className="h-12 pl-12 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 focus:border-black dark:focus:border-white transition-all duration-200 bg-neutral-50 dark:bg-neutral-800"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="amount"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                Amount (INR)
                            </FormLabel>
                            <FormControl>
                                <AmountInput 
                                    {...field}
                                    disabled={disabled}
                                    placeholder="e.g. ₹100"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField 
                    name="notes"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                Notes (Optional)
                            </FormLabel>
                            <FormControl>
                                <Textarea 
                                    {...field}
                                    value={field.value ?? ""}
                                    disabled={disabled}
                                    placeholder="Add any additional notes..."
                                    className="min-h-[100px] rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 focus:border-black dark:focus:border-white transition-all duration-200 bg-neutral-50 dark:bg-neutral-800 resize-none"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                    <div className="space-y-3 pt-4">
                        <Button 
                            className="w-full h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
                            disabled={disabled}
                        >
                            {id ? "Save Changes" : "Create Transaction"}
                        </Button>
                        
                        {!!id && (
                            <Button
                                type="button"
                                disabled={disabled}
                                onClick={handleDelete}
                                className="w-full h-12 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 border-2 border-rose-200 dark:border-rose-800"
                                variant="outline"
                            >
                                <Trash className="w-4 h-4 mr-2" />
                                Delete Transaction
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
};