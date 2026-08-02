"use client";

import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { useLogout } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LogOut, User, ShieldCheck, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  loginLabel: string;
  registerLabel: string;
}

export function NavAuth({ loginLabel, registerLabel }: Props) {
  const { user, isLoading } = useAuth();
  const logout = useLogout();
  const router = useRouter();
  const t = useTranslations("navbar");

  if (isLoading) return <div className="w-20 h-8 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />;

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="lg" asChild>
          <Link href="/login" className="text-lg font-medium px-6">
            {loginLabel}
          </Link>
        </Button>
        <Button variant="default" size="lg" asChild>
          <Link href="/register" className="text-lg font-medium px-6">
            {registerLabel}
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none">
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200 max-w-[120px] truncate">
            {user.fullName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg z-[100]" align="end">
        <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.fullName}</p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>
        {(user.role === "admin" || user.role === "super_admin") && (
          <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-primary-50 focus:text-primary-600 dark:focus:bg-gray-800 dark:focus:text-primary-400">
            <Link href="/admin" className="w-full flex items-center gap-2 px-2 py-1 text-sm">
              <ShieldCheck className="w-4 h-4" />
              {t("dashboard")}
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-gray-50 focus:text-gray-900 dark:focus:bg-gray-800">
          <Link href="/profile" className="w-full flex items-center gap-2 px-2 py-1 text-sm text-gray-700 dark:text-gray-200">
            <Settings className="w-4 h-4" />
            {t("profile")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            logout.mutate(undefined, { onSuccess: () => router.push("/") });
          }}
          className="cursor-pointer rounded-lg focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950/20 dark:focus:text-red-400"
        >
          <div className="flex items-center gap-2 px-2 py-1 text-sm text-red-600 dark:text-red-400">
            <LogOut className="w-4 h-4" />
            {t("signOut")}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
