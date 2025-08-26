"use client";

import { memo, useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import HeaderLogo from "@/components/HeaderLogo"
import Navigation from "@/components/Navigation"
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2, Menu, X } from "lucide-react"

const WelcomeMsg = dynamic(() => import("@/components/WelcomeMsg").then(mod => ({ default: mod.WelcomeMsg })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-2xl h-20" />
});

const Filters = dynamic(() => import("@/components/filter").then(mod => ({ default: mod.Filters })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-neutral-100 dark:bg-neutral-800 rounded-2xl h-16" />
});

const ThemeSwitch = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => <div className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
});

export const Header = memo(() => {
    const pathname = usePathname();
    const hideWelcomeAndFilters = ['/accounts', '/categories', '/settings'].includes(pathname);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

    return (
        <header className={`relative bg-neutral-50 dark:bg-neutral-950 overflow-hidden ${hideWelcomeAndFilters ? 'mb-4' : ''}`}>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="absolute inset-0 opacity-20 dark:opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob"></div>
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-6 border border-neutral-200 dark:border-neutral-800 shadow-xl mb-6 md:mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 sm:gap-4">
                                <div className="transition-transform duration-300 hover:scale-105">
                                    <HeaderLogo />
                                </div>
                                {/* Show navigation on desktop, mobile menu for smaller screens */}
                                <div className="hidden md:block">
                                    <Navigation />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3">
                                {/* Modern Mobile Menu Button */}
                                <button 
                                    className="md:hidden relative group p-3 rounded-xl bg-white/60 dark:bg-neutral-800/60 backdrop-blur-xl border border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    aria-label="Toggle mobile menu"
                                >
                                    <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                                        <div className={`w-full h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-blue-500 dark:bg-blue-400' : ''}`}></div>
                                        <div className={`w-full h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                                        <div className={`w-full h-0.5 bg-neutral-600 dark:bg-neutral-300 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-blue-500 dark:bg-blue-400' : ''}`}></div>
                                    </div>
                                </button>
                                <div className="group p-2 rounded-xl sm:rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-300 hover:scale-105">
                                    <ThemeSwitch />
                                </div>
                                <ClerkLoaded>
                                    <UserButton 
                                        afterSignOutUrl="/" 
                                        appearance={{
                                            elements: {
                                                avatarBox: "w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-white/20 dark:ring-neutral-700/50",
                                                userButtonPopoverCard: "backdrop-blur-xl shadow-2xl rounded-2xl min-w-[280px]",
                                                userButtonPopoverActions: "p-2",
                                                userButtonPopoverActionButton: "rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg p-3 mb-1 font-medium",
                                                userButtonPopoverActionButtonText: "font-medium",
                                                userButtonPopoverActionButtonIcon: "w-5 h-5",
                                                userButtonPopoverFooter: "hidden",
                                                userButtonPopoverMain: "p-4",
                                                userPreviewMainIdentifier: "font-black text-lg tracking-tight",
                                                userPreviewSecondaryIdentifier: "text-sm",
                                                userButtonPopoverRootBox: "",
                                                card: "border-none shadow-none",
                                                userPreview: "backdrop-blur-sm rounded-xl p-3 mb-3",
                                                userPreviewAvatarBox: "w-12 h-12 rounded-xl shadow-lg ring-2",
                                                userButtonPopoverActionButtonIconBox: "mr-3"
                                            }
                                        }}
                                    />
                                </ClerkLoaded>
                                <ClerkLoading>
                                    <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-neutral-100 dark:bg-neutral-800 animate-pulse">
                                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-neutral-600 dark:text-neutral-400" />
                                    </div>
                                </ClerkLoading>
                            </div>
                        </div>

                        {/* Modern Mobile Menu Dropdown */}
                        {isMobileMenuOpen && (
                            <div ref={menuRef} className="md:hidden absolute top-full left-0 right-0 mt-2 mx-3 sm:mx-4 z-50">
                                <div className="bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-2xl overflow-hidden animate-fade-in-up">
                                    {/* Menu Header */}
                                    <div className="px-6 py-4 border-b border-neutral-200/50 dark:border-neutral-700/50">
                                        <h3 className="font-black text-lg text-neutral-900 dark:text-white tracking-tight">
                                            Navigation
                                        </h3>
                                        <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                                            Explore your financial dashboard
                                        </p>
                                    </div>
                                    
                                    {/* Navigation Items */}
                                    <div className="p-4 space-y-2">
                                        <Navigation />
                                    </div>
                                    
                                    {/* Menu Footer */}
                                    <div className="px-6 py-4 bg-neutral-50/50 dark:bg-neutral-800/50 border-t border-neutral-200/50 dark:border-neutral-700/50">
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs text-neutral-500 dark:text-neutral-400">
                                                MOX Finance
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                                                    Connected
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
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
});