"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import HeaderLogo from "@/components/HeaderLogo"
import Navigation from "@/components/Navigation"
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { WelcomeMsg } from "@/components/WelcomeMsg"
import { Filters } from "@/components/filter"
import ThemeSwitch from "./theme-switcher"

export const Header = () => {
    const [scrollY, setScrollY] = useState(0);
    const pathname = usePathname();

    // Pages where welcome message and filters should be hidden
    const hideWelcomeAndFilters = ['/accounts', '/categories', '/settings'].includes(pathname);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden ${hideWelcomeAndFilters ? 'mb-4' : ''}`}>
            {/* Modern grid pattern background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* Contemporary mesh gradient with parallax */}
            <div className="absolute inset-0 opacity-20 dark:opacity-10" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob" style={{ transform: `translate(${scrollY * 0.02}px, ${scrollY * -0.01}px)` }}></div>
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000" style={{ transform: `translate(${scrollY * -0.01}px, ${scrollY * 0.02}px)` }}></div>
            </div>

            <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
                <div className="max-w-7xl mx-auto">
                    {/* Modern Navigation Bar */}
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl mb-6 md:mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 lg:gap-8">
                                <div className="transition-transform duration-300 hover:scale-105">
                                    <HeaderLogo />
                                </div>
                                <div className="md:hidden">
                                    <Navigation />
                                </div>
                                <div className="hidden md:block">
                                    <Navigation />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="group p-2 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105">
                                    <ThemeSwitch />
                                </div>
                                <ClerkLoaded>
                                    <UserButton 
                                        afterSignOutUrl="/" 
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
                                                userButtonPopoverCard: "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 shadow-2xl rounded-2xl",
                                                userButtonPopoverActions: "bg-transparent",
                                                userButtonPopoverActionButton: "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl",
                                                userButtonPopoverActionButtonText: "text-neutral-700 dark:text-neutral-300",
                                                userButtonPopoverActionButtonIcon: "text-neutral-500 dark:text-neutral-400"
                                            }
                                        }}
                                    />
                                </ClerkLoaded>
                                <ClerkLoading>
                                    <div className="p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse">
                                        <Loader2 className="w-5 h-5 animate-spin text-neutral-600 dark:text-neutral-400" />
                                    </div>
                                </ClerkLoading>
                            </div>
                        </div>
                    </div>
                    
                    {/* Content Section */}
                    {!hideWelcomeAndFilters && (
                        <div className="space-y-6">
                            <div className="animate-fade-in-up">
                                <WelcomeMsg />
                            </div>
                            <div className="animate-fade-in-up animate-delay-200">
                                <Filters />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}