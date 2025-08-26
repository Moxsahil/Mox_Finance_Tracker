"use client";

import { useUser } from "@clerk/nextjs";
import { Sparkles, TrendingUp } from "lucide-react";

export const WelcomeMsg = () => {
    const { user, isLoaded } = useUser();

    return (
        <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl mb-6">
            <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl lg:text-3xl font-black text-neutral-900 dark:text-white tracking-tight mb-2">
                        Welcome Back{isLoaded ? "," : " "} {user?.firstName || 'User'}
                    </h2>
                    <p className="text-sm lg:text-base font-medium text-neutral-500 dark:text-neutral-400 mb-4">
                        Take control of your finances with intelligent insights and tracking
                    </p>
                    <div className="flex items-center space-x-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                        <TrendingUp className="w-4 h-4" />
                        <span>Your financial dashboard is ready</span>
                    </div>
                </div>
            </div>
        </div>
    );
};