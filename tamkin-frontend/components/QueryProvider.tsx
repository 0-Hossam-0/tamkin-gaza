"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode, useEffect } from "react";
import { useLocale } from "next-intl";
import { setAxiosLocale } from "@/lib/api/axiosInstance";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const locale = useLocale();

  useEffect(() => {
    setAxiosLocale(locale);
  }, [locale]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
