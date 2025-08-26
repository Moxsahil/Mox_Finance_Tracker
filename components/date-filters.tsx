"use client";

import { useState } from "react";
import qs from "query-string";
import { format, subDays } from "date-fns";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { Label } from "@/components/ui/label";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const DateFilters = () => {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 365);

  const [fromDate, setFromDate] = useState<Date | undefined>(
    from ? new Date(from) : defaultFrom
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    to ? new Date(to) : defaultTo
  );

  const pushToUrl = () => {
    const query = {
      from: fromDate ? format(fromDate, "yyyy-MM-dd") : undefined,
      to: toDate ? format(toDate, "yyyy-MM-dd") : undefined,
      accountId,
    };

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const onReset = () => {
    setFromDate(defaultFrom);
    setToDate(defaultTo);
  };

  const formatDateRange = () => {
    if (!fromDate && !toDate) return "Select date range";
    if (!fromDate) return `Until ${format(toDate!, "MMM dd, yyyy")}`;
    if (!toDate) return `From ${format(fromDate, "MMM dd, yyyy")}`;
    return `${format(fromDate, "MMM dd")} - ${format(toDate, "MMM dd, yyyy")}`;
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={false}
          size="sm"
          variant="outline"
          className="h-12 rounded-2xl px-4 w-full font-medium bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700 focus:ring-offset-0 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 text-neutral-900 dark:text-white transition-all duration-200"
        >
          <span>{formatDateRange()}</span>
          <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full p-4 lg:w-auto bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 shadow-xl rounded-2xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900 dark:text-white">
                From Date
              </Label>
              <DatePicker value={fromDate} onChange={setFromDate} />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-neutral-900 dark:text-white">
                To Date
              </Label>
              <DatePicker value={toDate} onChange={setToDate} />
            </div>
          </div>

          <div className="flex items-center gap-x-2 pt-2">
            <PopoverClose asChild>
              <Button
                onClick={onReset}
                className="w-full h-10 rounded-xl font-medium bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border-2 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white transition-all duration-200 hover:scale-[1.02]"
                variant="outline"
              >
                Reset
              </Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                onClick={pushToUrl}
                className="w-full h-10 rounded-xl font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.02]"
              >
                Apply
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
