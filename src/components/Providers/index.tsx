"use client";

import { UserContextProvider } from "@/context/UserContext";
import { ThemeProvider } from "next-themes";
import type { FC, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

interface ProvidersProps {
  children: ReactNode;
}
const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>{children}</UserContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
