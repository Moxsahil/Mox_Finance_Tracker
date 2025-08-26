import { z } from "zod";
import { Trash, Wallet, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertAccountSchema } from "@/db/schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = insertAccountSchema.pick({
    name: true,
}).refine((data) => data.name.trim().length > 0, {
    message: "Account name cannot be blank",
    path: ["name"],
});

type FormValues = z.input<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

export const AccountForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues,
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    }

    const handleDelete = () => {
        onDelete?.();
    }

    return (
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
            {/* Form Header */}
            <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Wallet className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white tracking-tight">
                        {id ? "Edit Account" : "Create New Account"}
                    </h3>
                </div>
            </div>

            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="p-6 space-y-6"
                >
                    <FormField 
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm font-medium text-neutral-900 dark:text-white">
                                    Account Name
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <Input 
                                            disabled={disabled}
                                            placeholder="e.g. Cash, Bank, Credit Card"
                                            className="h-12 pl-12 rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 focus:border-black dark:focus:border-white transition-all duration-200 bg-neutral-50 dark:bg-neutral-800"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="space-y-3 pt-2">
                        <Button 
                            className="w-full h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl"
                            disabled={disabled}
                        >
                            {id ? "Save Changes" : "Create Account"}
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
                                Delete Account
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
};