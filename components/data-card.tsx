import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { Skeleton } from "./ui/skeleton";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { CountUp } from "@/components/count-up";

import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";


const boxVariant = cva(
    "shrink-0 rounded-md p-3",
    {
        variants: {
            variant: {
                default: "bg-blue-500/20",
                success: "bg-emerald-500/20",
                danger: "bg-rose-500/20",
                warning: "bg-rose-500/20",

            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

const iconVariant = cva(
    "size-6",
    {
        variants: {
            variant: {
                default: "fill-blue-500",
                success: "fill-emerald-500",
                danger: "fill-rose-500",
                warning: "fill-rose-500",

            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

type BoxVariants = VariantProps<typeof boxVariant>;
type iconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, iconVariants {
    icon: IconType;
    title: string;
    value?: number;
    percentageChange?: number;
    dateRange: string;
}

export const DataCard = ({
    icon: Icon,
    title,
    value = 0,
    variant,
    dateRange,
    percentageChange = 0,
}: DataCardProps) => {
    return (
        <Card className="group relative border-0 bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-800/60 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 dark:from-blue-900/10 dark:via-transparent dark:to-purple-900/10 group-hover:opacity-100 opacity-50 transition-opacity duration-300"></div>
            
           <CardHeader className="relative flex flex-row items-center justify-between gap-x-4 pb-3">
           <div className="space-y-2">
           <CardTitle className="text-xl font-bold line-clamp-1 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                {title}
            </CardTitle>
            <CardDescription className="line-clamp-1 text-xs font-medium">
                {dateRange}
            </CardDescription>
           </div>
           <div className={cn(
               boxVariant({ variant }),
               "group-hover:scale-110 transition-transform duration-300 shadow-lg"
           )}>
           <Icon className={cn(iconVariant({ variant }))} />
           </div>
           </CardHeader>
           <CardContent className="relative pt-0">
            <h1 className="font-bold text-3xl mb-3 line-clamp-1 break-all bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                <CountUp 
                    preserveValue
                    start={0}
                    end={value}
                    decimals={2}
                    decimalPlaces={2}
                    formattingFn={formatCurrency}
                />
            </h1>
            <div className="flex items-center space-x-2">
                <div className={cn(
                    "w-2 h-2 rounded-full",
                    percentageChange > 0 ? "bg-emerald-500" : "bg-rose-500"
                )}></div>
                <p className={cn(
                    "text-sm font-semibold line-clamp-1 flex items-center gap-1",
                    percentageChange > 0 ? "text-emerald-600" : "text-rose-600"
                )}>
                    {formatPercentage(percentageChange, { addPrefix: true })} from last period
                </p>
            </div>
           </CardContent>
        </Card>
    );
};

export const DataCardSkeleton = () => {
    return (
        <Card className="border-none drop-shadow-sm">
           <CardHeader className="flex flex-row items-center justify-between gap-x-4">
           <div className="space-y-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-48" />
           </div>
                <Skeleton className="size-12" />
           </CardHeader>
           <CardContent>
                <Skeleton className="shrink-0 h-10 w-24 mb-2" />
                <Skeleton className="shrink-0 h-4 w-40" />
           </CardContent>
        </Card>
    );
};