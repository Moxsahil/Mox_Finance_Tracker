import { AccountFilters } from "@/components/account-filters"
import { DateFilters } from "@/components/date-filters"
import { Filter } from "lucide-react"

export const Filters = () => {
    return (
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Filters</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="flex-1">
                    <AccountFilters />
                </div>
                <div className="flex-1">
                    <DateFilters />
                </div>
            </div>
        </div>
    )
}