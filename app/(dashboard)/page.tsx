"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@/components/optimized-data-grid";
import { Plus, Target, Wallet, Settings } from "lucide-react";
import Link from "next/link";
import { DataCharts, SmartInsights, RecentActivity, FinancialGoals } from "@/components/dynamic-imports";

export default function DashboardPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-8">
        {/* Enhanced Data Grid */}
        <div className="mb-8 md:mb-12" style={{ transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)`, opacity: Math.min(1, 0.5 + scrollY * 0.001) }}>
          <DataGrid />
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              Quick Actions
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
            <Link href="/transactions">
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 dark:from-blue-400/10 dark:to-indigo-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="font-medium text-sm text-center text-neutral-900 dark:text-white">
                    Add Transaction
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/accounts">
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <p className="font-medium text-sm text-center text-neutral-900 dark:text-white">
                    Manage Accounts
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/categories">
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-1 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <p className="font-medium text-sm text-center text-neutral-900 dark:text-white">
                    Categories
                  </p>
                </div>
              </div>
            </Link>

            <Link href="/settings">
              <div className="group relative bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 dark:from-orange-400/10 dark:to-amber-400/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex flex-col items-center justify-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Settings className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <p className="font-medium text-sm text-center text-neutral-900 dark:text-white">
                    Settings
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="mb-8 md:mb-12" style={{ transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)` }}>
          <div className="mb-6">
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
              Financial Overview
            </h2>
          </div>
          <div className="relative">
            <DataCharts />
          </div>
        </div>

        {/* Insights & Tips Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-12">
          <div className="animate-fade-in-up">
            <SmartInsights />
          </div>
          <div className="animate-fade-in-up animate-delay-200">
            <RecentActivity />
          </div>
        </div>

        {/* Goals Section */}
        <div className="animate-fade-in-up animate-delay-300">
          <FinancialGoals />
        </div>
      </div>
    </div>
  );
}
