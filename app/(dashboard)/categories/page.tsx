"use client";

import { useState, useEffect, useMemo } from "react";
import { Loader2, Plus, Target, Sparkles, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTable } from "@/components/data-table";
import { 
    Card, 
    CardContent, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { useBulkDeleteCategories } from "@/features/categories/api/use-bulk-delete-category";

import { columns } from "./columns";

const CategoriesPage = () => {
    const [scrollY, setScrollY] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const newCategory = useNewCategory();
    const deleteCategories = useBulkDeleteCategories();
    const categoriesQuery = useGetCategories()
    const categories = categoriesQuery.data || [];

    // Filter categories based on search term
    const filteredCategories = useMemo(() => {
        if (!searchTerm.trim()) return categories;
        
        const term = searchTerm.toLowerCase();
        return categories.filter((category) => 
            category.name?.toLowerCase().includes(term)
        );
    }, [categories, searchTerm]);

    const isDisabled = 
        categoriesQuery.isLoading ||
        deleteCategories.isPending;

    if(categoriesQuery.isLoading){
        return (
            <div className="relative">
                <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-2 pb-6 md:pb-8">
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                        <div className="px-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <Skeleton className="w-12 h-12 rounded-2xl" />
                                    <div className="space-y-2">
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <Skeleton className="h-12 w-32 rounded-2xl" />
                            </div>
                        </div>
                        
                        <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                            <div className="relative mb-8">
                                <div className="w-12 h-12 border-2 border-neutral-200 dark:border-neutral-700 border-t-black dark:border-t-white rounded-full animate-spin"></div>
                            </div>
                            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                                Loading categories
                            </h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-center">
                                Please wait while we fetch your category data
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-2 pb-6 md:pb-8">
                {/* Modern Categories Table */}
                <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300" style={{ transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)` }}>
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                        <Target className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Categories</h2>
                                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                            Organize your transactions
                                        </p>
                                    </div>
                                </div>
                                
                                <Button
                                    onClick={newCategory.onOpen}
                                    className="group h-12 px-6 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20"
                                >
                                    <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                                    Add Category
                                </Button>
                            </div>
                            
                            {/* Modern Search */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                    <Input
                                        placeholder="Search categories..."
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
                        {categories.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 px-8">
                                <div className="w-20 h-20 rounded-3xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-6">
                                    <Target className="w-10 h-10 text-neutral-400" />
                                </div>
                                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 tracking-tight">
                                    No categories found
                                </h3>
                                <p className="text-neutral-500 dark:text-neutral-400 text-center max-w-md mb-8">
                                    Create your first category to organize your transactions and track spending patterns.
                                </p>
                                <Button
                                    onClick={newCategory.onOpen}
                                    className="group h-12 px-6 bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-white/20"
                                >
                                    <Plus className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-90" />
                                    Create Category
                                </Button>
                            </div>
                        ) : (
                            <div className="p-1">
                                <DataTable 
                                    filterKey=""
                                    columns={columns} 
                                    data={filteredCategories}
                                    onDelete={(row) => {
                                        const ids = row.map((r) => r.original.id);
                                        deleteCategories.mutate({ ids });
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
                            onClick={newCategory.onOpen}
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

export default CategoriesPage;