"use client";

import { Loader2, Plus, Search, Filter, TrendingUp, TrendingDown, Zap, Sparkles, Eye, Download, Upload, RefreshCw } from "lucide-react";

import { transactions as transactionSchema } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { Input } from "@/components/ui/input";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useSelectAccount } from "@/features/accounts/hooks/use-select-account";
import { useBulkCreateTransactions } from "@/features/transactions/api/use-bulk-create-transactions";

import { columns } from "./columns";
import { useState, useMemo, useEffect } from "react";
import { UploadButton } from "./upload-button";
import { set } from "date-fns";
import { ImportCard } from "./import-card";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";


enum VARIANTS {
  LIST= "LIST",
  IMPORT = "IMPORT"
}

const  INTIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: []
};

  

const TransactionsPage = () => {

    const [AccountDialog, confirm] = useSelectAccount();
    const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
    const [importResults, setImportResults] = useState(INTIAL_IMPORT_RESULTS);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const onUpload = (results: typeof INTIAL_IMPORT_RESULTS) => {
      setVariant(VARIANTS.IMPORT);
      setImportResults(results);
    }

    const onCancelImport = () => {
      setImportResults(INTIAL_IMPORT_RESULTS);
      setVariant(VARIANTS.LIST);
    }

    const newTransaction = useNewTransaction();
    const createTransactions = useBulkCreateTransactions();
    const deleteTransactions = useBulkDeleteTransactions();
    const transactionsQuery = useGetTransactions()
    const transactions = transactionsQuery.data || [];

    // Filter transactions based on search term
    const filteredTransactions = useMemo(() => {
        if (!searchTerm.trim()) return transactions;
        
        const term = searchTerm.toLowerCase();
        return transactions.filter((transaction) => 
            transaction.payee?.toLowerCase().includes(term) ||
            transaction.account?.toLowerCase().includes(term) ||
            transaction.category?.toLowerCase().includes(term) ||
            transaction.notes?.toLowerCase().includes(term)
        );
    }, [transactions, searchTerm]);

    const isDisabled = 
    transactionsQuery.isLoading ||
    deleteTransactions.isPending;

    // Calculate statistics with animations (use filtered data - keep in miliunits for formatCurrency)
    const stats = useMemo(() => {
      const totalIncome = filteredTransactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
      const totalExpenses = filteredTransactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
      const totalTransactions = filteredTransactions.length;
      const avgTransaction = totalTransactions > 0 ? (totalIncome - totalExpenses) / totalTransactions : 0;

      return {
        totalIncome,
        totalExpenses,
        totalTransactions,
        avgTransaction,
        netAmount: totalIncome - totalExpenses
      };
    }, [filteredTransactions]);

    const handleRefresh = async () => {
      setIsRefreshing(true);
      await transactionsQuery.refetch();
      setTimeout(() => setIsRefreshing(false), 1000);
    };

    // Parallax scroll effect
    useEffect(() => {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const onSubmitImport = async (
      values: typeof transactionSchema.$inferInsert[],
    ) => {
      const accountId = await confirm();

      if(!accountId){
        return toast.error("Please select an account to continue");
      }

      const data = values.map((value) => ({
        ...value,
        accountId: accountId as string,
      }))

      createTransactions.mutate(data, {
        onSuccess: () => {
          onCancelImport();
        }
      })


    }

    if(transactionsQuery.isLoading){
      return (
        <div className="relative">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Loading stats grid */}
            <div className="grid grid-cols-12 gap-4 mb-8">
              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800">
                      <div className="flex items-center justify-between mb-4">
                        <Skeleton className="w-10 h-10 rounded-2xl" />
                        <Skeleton className="w-12 h-6 rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 h-full">
                  <Skeleton className="h-6 w-32 mb-6" />
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-2xl" />
                    <Skeleton className="h-12 w-full rounded-2xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Loading table */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              <div className="px-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-72 rounded-2xl" />
                </div>
              </div>
              
              <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="relative mb-8">
                  <div className="w-12 h-12 border-2 border-neutral-200 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                  Loading your transactions
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-center">
                  Please wait while we fetch your financial data
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if(variant === VARIANTS.IMPORT) {
      return (
       <>
       <AccountDialog />
       <ImportCard 
       data = {importResults.data}
       onCancel={onCancelImport}
       onSubmit={onSubmitImport}
       />
       </>
      );
    }

  return (
    <div className="relative">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Modern Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-3 md:gap-4 mb-6 md:mb-8" style={{ transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)`, opacity: Math.min(1, 0.5 + scrollY * 0.001) }}>
          {/* Hero Stats - Takes up more space */}
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Income Card */}
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                      +{stats.totalTransactions > 0 ? ((stats.totalIncome / (stats.totalIncome + stats.totalExpenses)) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white mb-1 tracking-tight">
                      {formatCurrency(stats.totalIncome)}
                    </p>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Income</p>
                  </div>
                </div>
              </div>

              {/* Expenses Card */}
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-rose-300 dark:hover:border-rose-700 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 dark:from-rose-400/10 dark:to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingDown className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    </div>
                    <div className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-lg">
                      -{stats.totalTransactions > 0 ? ((stats.totalExpenses / (stats.totalIncome + stats.totalExpenses)) * 100).toFixed(0) : 0}%
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white mb-1 tracking-tight">
                      {formatCurrency(stats.totalExpenses)}
                    </p>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Expenses</p>
                  </div>
                </div>
              </div>

              {/* Net Amount Card */}
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-2xl ${stats.netAmount >= 0 ? 'bg-emerald-100 dark:bg-emerald-900/30' : 'bg-rose-100 dark:bg-rose-900/30'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Eye className={`w-5 h-5 ${stats.netAmount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`} />
                    </div>
                    <div className={`text-xs font-medium px-2 py-1 rounded-lg ${stats.netAmount >= 0 
                      ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' 
                      : 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20'}`}>
                      {stats.netAmount >= 0 ? 'Profit' : 'Loss'}
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white mb-1 tracking-tight">
                      {formatCurrency(Math.abs(stats.netAmount))}
                    </p>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Net Balance</p>
                  </div>
                </div>
              </div>

              {/* Transaction Count Card */}
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/10 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 dark:from-violet-400/10 dark:to-purple-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div className="text-xs font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-2 py-1 rounded-lg">
                      Total
                    </div>
                  </div>
                  <div>
                    <p className="text-2xl font-black text-neutral-900 dark:text-white mb-1 tracking-tight">
                      {stats.totalTransactions}
                    </p>
                    <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Transactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 h-full hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  onClick={newTransaction.onOpen}
                  className="group w-full h-12 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20"
                >
                  <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                  Add Transaction
                </Button>
                <Button
                  onClick={handleRefresh}
                  variant="outline"
                  disabled={isRefreshing}
                  className="group w-full h-12 border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 transition-transform duration-500 ${isRefreshing ? 'animate-spin' : 'group-hover:rotate-180'}`} />
                  Refresh Data
                </Button>
                <UploadButton onUpload={onUpload} />
              </div>
            </div>
          </div>
        </div>

        {/* Modern Transactions Table */}
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300" style={{ transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)` }}>
          {/* Header */}
          <div className="px-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Transactions</h2>
                  <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                    Manage your financial records
                  </p>
                </div>
              </div>
              
              {/* Modern Search */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 w-full sm:w-64 md:w-72 lg:w-80 border-2 border-neutral-200 dark:border-neutral-700 focus:border-black dark:focus:border-white rounded-2xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl transition-all duration-200 focus:shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Table Content */}
          <div className="relative">
            {transactions.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 px-8">
                <div className="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
                  <Sparkles className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                  No transactions found
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md mb-8">
                  Create your first transaction to start tracking your financial activity and gain insights into your spending patterns.
                </p>
                <Button
                  onClick={newTransaction.onOpen}
                  className="group h-12 px-6 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20"
                >
                  <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                  Create Transaction
                </Button>
              </div>
            ) : (
              <div className="p-1">
                <DataTable 
                  filterKey=""
                  columns={columns} 
                  data={filteredTransactions}
                  onDelete={(row) => {
                    const ids = row.map((r) => r.original.id);
                    deleteTransactions.mutate({ ids });
                  }}
                  disabled={isDisabled}
                />
              </div>
            )}
          </div>
        </div>
        
        {/* Modern Floating Action Button */}
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <div className="relative">
            <div className="absolute inset-0 bg-black dark:bg-white rounded-2xl blur-lg opacity-30 scale-110 animate-pulse-modern"></div>
            <Button
              onClick={newTransaction.onOpen}
              className="relative w-16 h-16 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <Plus className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage;