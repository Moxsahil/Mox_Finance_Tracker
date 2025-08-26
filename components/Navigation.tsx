"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useMedia } from "react-use";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/NavButton";
import { 
    Sheet,
    SheetContent,
    SheetTrigger
  } from "@/components/ui/sheet";

const routes = [
    {
        href: "/",
        label: "Home",
    },
    {
        href: "/transactions",
        label: "Transactions",
    },
    {
        href: "/accounts",
        label: "Accounts",
    },
    {
        href: "/categories",
        label: "Categories",
    },
    {
        href: "/settings",
        label: "Settings",
    },
];

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isMobile = useMedia("(max-width: 1024px)", false);
    
    const onClick = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    if(isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                    variant="outline"
                    size="sm"
                    className="font-normal bg-neutral-100/10 dark:bg-white/10 hover:bg-neutral-100/20 dark:hover:bg-white/20 hover:text-neutral-900 dark:hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-neutral-900 dark:text-white focus:bg-neutral-100/30 dark:focus:bg-white/30 transition"
                    >
                        <Menu className="size-4"/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                           <Button
                           key={route.href}
                           variant={route.href === pathname ? "secondary" : "ghost"}
                           onClick={() => onClick(route.href)}
                           className="w-full justify-start"
                           >
                            {route.label}
                           </Button> 
                        ))}
                    </nav>
                    {/* {routes.map((route) => (
                        <NavButton
                        key={route.href}
                        href={route.href}
                        label={route.label}
                        isActive={pathname === route.href}
                        onClick={() => onClick(route.href)}
                        />
                    ))} */}
                </SheetContent>
            </Sheet>
        );
    };

  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
        {routes.map((route) => (
            <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
            />
        ))}
    </nav>
  )
}

export default Navigation