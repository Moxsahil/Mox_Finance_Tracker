"use client";

import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useGetSummary } from "@/features/summary/api/use-get-summary";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


export const AccountFilters = () => {

    const router = useRouter();
    const pathname = usePathname();

    const params = useSearchParams();
    const accountId = params.get("accountId") || "all";
    const from = params.get("from") || "";
    const to = params.get("to") || "";

    const {
        isLoading: isLoadingSummary,
    } = useGetSummary();

    const { 
        data: accounts, 
        isLoading: isLoadingAccounts 
    } = useGetAccounts();

    const onChange = (newValue: string) => {
        const query ={
            accountId: newValue,
            from,
            to,
        };

        if(newValue === "all"){
            query.accountId = "";
        }

        const url = qs.stringifyUrl({
            url: pathname,
            query,
        }, {skipNull: true, skipEmptyString: true});
        router.push(url);  
    }

    return (
        <Select
            value={accountId}
            onValueChange={onChange}
            disabled={isLoadingAccounts || isLoadingSummary}
        >
            <SelectTrigger className="h-12 rounded-2xl px-4 w-full font-medium bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700 focus:ring-offset-0 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-neutral-900 dark:text-white transition-all duration-200">
                <SelectValue placeholder="Select an account" />
            </SelectTrigger>
            <SelectContent className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl">
                <SelectItem value="all" className="hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 text-neutral-900 dark:text-white">
                    All accounts
                </SelectItem>
                {accounts?.map((account) => (
                    <SelectItem key={account.id} value={account.id} className="hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:bg-neutral-100 dark:focus:bg-neutral-800 text-neutral-900 dark:text-white">
                        {account.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}