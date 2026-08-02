import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-900 px-4 py-12">
      <div className="w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
