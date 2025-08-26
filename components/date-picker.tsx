import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    disabled?: boolean;
};

export const DatePicker = ({ value, onChange, disabled }: Props) => {
    const [open, setOpen] = React.useState(false);

    const handleDateSelect = (date: Date | undefined) => {
        onChange?.(date);
        setOpen(false); // Auto-close the popover after date selection
    };

    return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
            disabled={disabled}
            variant="outline"
            className={cn("w-full justify-start text-left font-normal h-10 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white transition-all duration-200", !value && "text-neutral-500 dark:text-neutral-400")}
            >
            <CalendarIcon className="mr-2 size-4" />
            {value ? format(value, "PPP") : <span>Pick a date</span>}
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl">
            <Calendar 
                mode="single" 
                selected={value} 
                onSelect={handleDateSelect}
                disabled={false} 
                initialFocus 
                className="rounded-2xl border-0"
                classNames={{
                    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center text-neutral-900 dark:text-white",
                    caption_label: "text-sm font-semibold text-neutral-900 dark:text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button: "h-7 w-7 bg-transparent p-0 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-colors duration-200",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-neutral-500 dark:text-neutral-400 rounded-md w-9 font-medium text-[0.75rem] uppercase tracking-wider",
                    row: "flex w-full mt-2",
                    cell: "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
                    day: "h-9 w-9 p-0 font-normal text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white rounded-lg transition-all duration-200 hover:scale-105",
                    day_selected: "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 rounded-lg font-semibold shadow-lg border-2 border-blue-400 dark:border-blue-500",
                    day_today: "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold rounded-lg",
                    day_outside: "text-neutral-400 dark:text-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900",
                    day_disabled: "text-neutral-300 dark:text-neutral-700 opacity-50 cursor-not-allowed",
                    day_hidden: "invisible",
                }}
             />
        </PopoverContent>
    </Popover>
    );
};
