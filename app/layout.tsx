import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";

import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MOX FINANCE APP",
  description: "A finance app built with Next.js and Clerk.",
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body className="antialiased">
          <Providers>
            <QueryProvider>
              <Suspense fallback={<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950" />}>
                <SheetProvider />
                <Toaster />
                {children}
              </Suspense>
            </QueryProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
