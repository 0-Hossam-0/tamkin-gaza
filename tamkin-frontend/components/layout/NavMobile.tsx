"use client";

import { useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/components/AuthProvider";
import { useLogout } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";
import { LogOut, ShieldCheck, User, Menu } from "lucide-react";

type Props = {
  t: {
    campaigns: string;
    stories: string;
    privacy: string;
    terms: string;
    about: string;
    login: string;
    register: string;
  };
};

export default function NavMobile({ t }: Props) {
  const { user } = useAuth();
  const logout = useLogout();
  const router = useRouter();
  const navT = useTranslations("navbar");
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72">
        <div className="flex flex-col p-4 gap-4 mt-6">
          {user && (
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <User className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.fullName}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          <Link href="/campaigns" onClick={close} className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors">{t.campaigns}</Link>
          <Link href="/stories" onClick={close} className="text-base font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors">{t.stories}</Link>

          <div className="border-t pt-4 flex flex-col gap-2">
            <Link href="/about" onClick={close} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t.about}</Link>
            <Link href="/privacy" onClick={close} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t.privacy}</Link>
            <Link href="/terms" onClick={close} className="text-sm text-gray-500 hover:text-primary-600 transition-colors">{t.terms}</Link>
          </div>

          <div className="border-t pt-4 flex flex-col gap-2">
            {user ? (
              <>
                {(user.role === "admin" || user.role === "super_admin") && (
                  <Link href="/admin" onClick={close} className="flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400">
                    <ShieldCheck className="w-4 h-4" />
                    {navT("dashboard")}
                  </Link>
                )}
                <Link href="/profile" onClick={close} className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <User className="w-4 h-4" />
                  {navT("profile")}
                </Link>
                <button
                  onClick={() => {
                    close();
                    logout.mutate(undefined, { onSuccess: () => router.push("/") });
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  {navT("signOut")}
                </button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/login" onClick={close}>{t.login}</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register" onClick={close}>{t.register}</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
