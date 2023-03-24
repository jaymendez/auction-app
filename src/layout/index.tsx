import Providers from "@/components/Providers";
import { Toaster } from "@/components/Toast";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import * as React from "react";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <main
      className={cn("bg-white text-slate-900 antialiased", inter.className)}
    >
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">
        <Providers>
          <Header />
          <Toaster position="bottom-right" />

          <div>{children}</div>
        </Providers>
        {/* Allow more height for mobile menu on mobile */}
        <div className="h-40 md:hidden" />
      </div>
    </main>
  );
}
