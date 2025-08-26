"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Target, Wallet, Car, Home, Plane, GraduationCap, Heart, Sparkles, DollarSign, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
    name: z.string().min(1, "Name is required").refine((val) => val.trim().length > 0, {
        message: "Goal name cannot be blank",
    }),
    description: z.string().optional(),
    targetAmount: z.string().min(1, "Target amount is required"),
    targetDate: z.string().optional(),
    color: z.string().min(1, "Color is required"),
    icon: z.string().min(1, "Icon is required"),
});

type FormValues = z.infer<typeof formSchema>;

type Props = {
    id?: string;
    defaultValues?: FormValues;
    onSubmit: (values: FormValues) => void;
    onDelete?: () => void;
    disabled?: boolean;
};

const colorOptions = [
    { value: "blue", label: "Blue", class: "bg-blue-500", style: { backgroundColor: "#3b82f6" } },
    { value: "emerald", label: "Green", class: "bg-emerald-500", style: { backgroundColor: "#10b981" } },
    { value: "purple", label: "Purple", class: "bg-purple-500", style: { backgroundColor: "#8b5cf6" } },
    { value: "orange", label: "Orange", class: "bg-orange-500", style: { backgroundColor: "#f97316" } },
    { value: "pink", label: "Pink", class: "bg-pink-500", style: { backgroundColor: "#ec4899" } },
    { value: "indigo", label: "Indigo", class: "bg-indigo-500", style: { backgroundColor: "#6366f1" } },
];

const iconOptions = [
    { value: "Target", label: "Target", icon: Target },
    { value: "Wallet", label: "Emergency Fund", icon: Wallet },
    { value: "Car", label: "Vehicle", icon: Car },
    { value: "Home", label: "House", icon: Home },
    { value: "Plane", label: "Travel", icon: Plane },
    { value: "GraduationCap", label: "Education", icon: GraduationCap },
    { value: "Heart", label: "Health", icon: Heart },
];

export const GoalForm = ({
    id,
    defaultValues,
    onSubmit,
    onDelete,
    disabled,
}: Props) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues || {
            name: "",
            description: "",
            targetAmount: "",
            targetDate: "",
            color: "blue",
            icon: "Target",
        },
    });

    const handleSubmit = (values: FormValues) => {
        onSubmit(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 pt-4"
            >
                <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Goal Name</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={disabled}
                                    placeholder="e.g. Emergency Fund"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description (Optional)</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={disabled}
                                    placeholder="e.g. Save for 6 months of expenses"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        name="targetAmount"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Amount</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disabled}
                                        placeholder="10000"
                                        type="number"
                                        step="0.01"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="targetDate"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Date (Optional)</FormLabel>
                                <FormControl>
                                    <Input
                                        disabled={disabled}
                                        type="date"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-4">
                    <FormField
                        name="icon"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Icon</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select an icon" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {iconOptions.map((option) => {
                                            const IconComponent = option.icon;
                                            return (
                                                <SelectItem key={option.value} value={option.value}>
                                                    <div className="flex items-center gap-2">
                                                        <IconComponent className="h-4 w-4" />
                                                        {option.label}
                                                    </div>
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        name="color"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Color</FormLabel>
                                <div className="grid grid-cols-3 gap-3">
                                    {colorOptions.map((color) => (
                                        <Card 
                                            key={color.value}
                                            className={`cursor-pointer transition-all ${
                                                field.value === color.value 
                                                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                                                    : 'hover:scale-105'
                                            }`}
                                            onClick={() => field.onChange(color.value)}
                                        >
                                            <CardContent className="flex items-center justify-center p-4">
                                                <div 
                                                    className={`w-8 h-8 rounded-full ${color.class}`}
                                                    style={color.style}
                                                ></div>
                                                <span className="ml-2 text-sm">{color.label}</span>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-2">
                    <Button className="flex-1" disabled={disabled}>
                        {id ? "Save Changes" : "Create Goal"}
                    </Button>
                    {!!id && (
                        <Button
                            type="button"
                            disabled={disabled}
                            onClick={onDelete}
                            variant="destructive"
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};