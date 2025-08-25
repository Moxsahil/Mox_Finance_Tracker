import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "MOX FINANCE APP",
  description: "A finance app built with Next.js and Clerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Providers>
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
