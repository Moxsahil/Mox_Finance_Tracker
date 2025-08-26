"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useUser, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Settings, Moon, Sun, LogOut, User, Shield, Palette } from "lucide-react";

const SettingsPage = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const { signOut } = useClerk();
    const { user } = useUser();
    const [scrollY, setScrollY] = useState(0);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative">
            <div className="relative max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-2 pb-6 md:pb-8">
                {/* Settings Header */}
                <div className="mb-8" style={{ transform: `translateY(${Math.max(0, 50 - scrollY * 0.1)}px)` }}>
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-neutral-200 dark:border-neutral-800 shadow-xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                <Settings className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight">Settings</h1>
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                                    Manage your preferences and account
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Settings Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ transform: `translateY(${Math.max(0, 100 - scrollY * 0.2)}px)` }}>
                    {/* User Profile Card */}
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Profile</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Email</p>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                    {user?.primaryEmailAddress?.emailAddress || 'No email'}
                                </p>
                            </div>
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                                <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-1">Full Name</p>
                                <p className="font-medium text-neutral-900 dark:text-white">
                                    {user?.fullName || 'Not provided'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Theme Settings Card */}
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Palette className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Appearance</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center">
                                        {mounted && resolvedTheme === 'dark' ? 
                                            <Moon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" /> :
                                            <Sun className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                                        }
                                    </div>
                                    <div>
                                        <p className="font-medium text-neutral-900 dark:text-white">Theme</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                            {mounted && resolvedTheme === 'dark' ? 'Dark mode' : 'Light mode'}
                                        </p>
                                    </div>
                                </div>
                                {mounted && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                        className="rounded-2xl border-2 hover:scale-105 transition-transform duration-200"
                                    >
                                        Switch to {resolvedTheme === 'dark' ? 'Light' : 'Dark'}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Security Card */}
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Security</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-neutral-900 dark:text-white mb-1">Account Status</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">Your account is secure</p>
                                    </div>
                                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Account Management Card */}
                    <div className="bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                                <LogOut className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                            </div>
                            <h2 className="text-lg font-bold text-neutral-900 dark:text-white tracking-tight">Account</h2>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-neutral-900 dark:text-white mb-1">Sign Out</p>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400">End your current session</p>
                                    </div>
                                    <Button
                                        onClick={() => signOut()}
                                        className="group bg-rose-500 hover:bg-rose-600 text-white rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        <LogOut className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
                                        Logout
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;