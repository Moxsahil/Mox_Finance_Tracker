"use client";

import HeaderLogo from "@/components/HeaderLogo"
import Navigation from "@/components/Navigation"
import { UserButton, ClerkLoaded, ClerkLoading } from "@clerk/nextjs"
import { Loader2 } from "lucide-react"
import { WelcomeMsg } from "@/components/WelcomeMsg"
import { Filters } from "@/components/filter"
import ThemeSwitch from "./theme-switcher"

export const Header = () => {
    return (
        <header className="bg-gradient-to-b from-orange-600 to-blue-600 px-4 py-8 lg:px-14 pb-36">
            <div className="max-w-screen-2xl mx-auto">
                <div className="w-full flex items-center justify-between mb-14">
                    <div className="flex items-center lg:gap-x-16">
                        <HeaderLogo />
                        <Navigation />
                    </div>
                    <div className="flex items-center gap-x-6">
                    <ThemeSwitch />
                    <ClerkLoaded>
                    <UserButton afterSignOutUrl="/" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="size-8 animate-spin text-slate-400" />
                    </ClerkLoading>
                    </div>
                </div>
                <WelcomeMsg />
                <Filters />
            </div>
        </header>
    )
}