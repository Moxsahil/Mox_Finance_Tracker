"use client";

import { Header } from "@/components/header";

type Props = {
    children: React.ReactNode;
}

const DashboardLayout = ( { children } : Props) => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Header />
      <main className="relative bg-neutral-50 dark:bg-neutral-950">
        {/* Seamless grid pattern background for content area */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Contemporary mesh gradient for content */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob"></div>
          <div className="absolute top-1/3 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout