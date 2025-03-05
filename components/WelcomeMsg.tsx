"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {

    const { user, isLoaded } = useUser();

    return (
        <div className="space-y-2 mb-4">
            <h2 className="text-2xl lg:text-3xl text-white font-medium">
                Welcome Back{isLoaded ? "," : " "} {user?.firstName} 👋🏻
            </h2>
            <p className="text-sm lg:text-base text-[#27ff44f5]">
                A complete solution to track all your expenses and incomes
            </p>
        </div>
    );
};