"use client";

import { useSearchParams } from "next/navigation";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { DataCard, DataCardSkeleton } from "@/components/data-card";

export const DataGrid = () => {

    const { data, isLoading } = useGetSummary();

    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;

    const dateRangeLabel = formatDateRange({ from, to });

    if(isLoading){
        return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
           <DataCardSkeleton />
           <DataCardSkeleton />
           <DataCardSkeleton />
        </div>
        )
    }
        

    return <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCard
        title="Available Balance"
        value={data?.remainingBalanceAmount}
        percentageChange={data?.remainingBalanceChange}
        icon={MdOutlineAccountBalanceWallet }
        variant="default"
        dateRange={dateRangeLabel}
        />

        <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="default"
        dateRange={dateRangeLabel}
        />

        <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="default"
        dateRange={dateRangeLabel}
        />
    </div>;
};