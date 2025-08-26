import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";

import { 
    Tooltip, 
    TooltipContent,
    TooltipProvider, 
    TooltipTrigger 
} from "@/components/ui/tooltip";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
};

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {

    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverseValue = () => {
        if(!value) return;
        const newValue = parseFloat(value) * -1;
        onChange(newValue.toString());
    }

    return (
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button 
                            type="button" 
                            onClick={onReverseValue}
                            className={cn(
                                "bg-neutral-400 dark:bg-neutral-600 hover:bg-neutral-500 dark:hover:bg-neutral-500 absolute top-2 left-2 rounded-xl p-2 flex items-center justify-center transition-all duration-200 hover:scale-105",
                                isIncome && "bg-emerald-500 dark:bg-emerald-600 hover:bg-emerald-600 dark:hover:bg-emerald-500",
                                isExpense && "bg-rose-500 dark:bg-rose-600 hover:bg-rose-600 dark:hover:bg-rose-500"
                            )}
                        >
                            { !parsedValue && <Info className="size-3 text-white"/>}
                            { isIncome && <PlusCircle className="size-3 text-white"/>}
                            { isExpense && <MinusCircle className="size-3 text-white"/>}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white shadow-xl rounded-xl">
                        Use [+] for income and [-] for expense
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput 
                prefix="₹"
                className="pl-12 h-12 w-full rounded-2xl border-2 border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-4 py-3 text-sm font-medium text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none focus:border-black dark:focus:border-white focus:bg-neutral-100 dark:focus:bg-neutral-700 transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={value}
                decimalsLimit={2}
                decimalScale={2}
                onValueChange={onChange}
                disabled={disabled}
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2 font-medium">
                {isIncome && "This will count as an income"}
                {isExpense && "This will count as an expense"}
            </p>
        </div>
    )
}