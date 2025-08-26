"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { formatDateRange } from "@/lib/utils";
import { DataCard, DataCardSkeleton } from "@/components/data-card";
import { DataGridSkeleton } from "@/components/loading-skeleton";

function DataGridContent() {
    const { data, isLoading } = useGetSummary();
    const params = useSearchParams();
    const to = params.get("to") || undefined;
    const from = params.get("from") || undefined;
    const dateRangeLabel = formatDateRange({ from, to });

    if (isLoading) {
        return <DataGridSkeleton />;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <DataCard
                title="Remaining"
                value={data?.remainingBalanceAmount}
                percentageChange={data?.remainingBalanceChange}
                icon={MdOutlineAccountBalanceWallet}
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
        </div>
    );
}

export const DataGrid = () => {
    return (
        <Suspense fallback={<DataGridSkeleton />}>
            <DataGridContent />
        </Suspense>
    );
};