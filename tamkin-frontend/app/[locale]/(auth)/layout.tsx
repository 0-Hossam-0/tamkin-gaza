import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-zinc-900 dark:to-zinc-800 px-4 py-12">
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
