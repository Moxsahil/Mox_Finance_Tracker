import { z } from "zod";
import { Trash, Target, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { insertCategorySchema } from "@/db/schema";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const formSchema = insertCategorySchema.pick({
    name: true,
}).refine((data) => data.name.trim().length > 0, {
    message: "Category name cannot be blank",
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

export const CategoryForm = ({
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
                    <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold text-neutral-900 dark:text-white tracking-tight">
                        {id ? "Edit Category" : "Create New Category"}
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
                                    Category Name
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                                        <Input 
                                            disabled={disabled}
                                            placeholder="e.g. Food, Travel, Entertainment, etc."
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
                            {id ? "Save Changes" : "Create Category"}
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
                                Delete Category
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    )
};