import React from "react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import NavMobile from "./NavMobile";
import AppButton from "../buttons/AppButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "@/i18n/navigation";
import { ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "../common/LanguageSwitcher";

export default async function NavBar() {
  const t = await getTranslations("navbar");

  return (
    <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
        {/* LEFT SIDE: Logo + Links */}
        <div className="flex items-center gap-12">
          <div className="font-extrabold text-3xl tracking-tight ">
            <Link href="/" className="hover:opacity-90 transition-opacity">تمكين</Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/campaigns" 
              className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {t("campaigns")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/blogs" 
              className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {t("blogs")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/stories" 
              className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {t("stories")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link 
              href="/contact" 
              className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative group"
            >
              {t("contact")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors outline-none group">
                {t("more")}
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-indigo-600 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg" align="end">
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-indigo-50 focus:text-indigo-600 dark:focus:bg-gray-800 dark:focus:text-indigo-400 p-0 mb-1">
                  <Link href="/privacy" className="w-full px-4 py-2 text-base block">{t("privacy")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-indigo-50 focus:text-indigo-600 dark:focus:bg-gray-800 dark:focus:text-indigo-400 p-0 mb-1">
                  <Link href="/terms" className="w-full px-4 py-2 text-base block">{t("terms")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-indigo-50 focus:text-indigo-600 dark:focus:bg-gray-800 dark:focus:text-indigo-400 p-0">
                  <Link href="/about" className="w-full px-4 py-2 text-base block">{t("about")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          <div className="lg:hidden">
            <NavMobile
              t={{
                campaigns: t("campaigns"),
                blogs: t("blogs"),
                stories: t("stories"),
                contact: t("contact"),
                privacy: t("privacy"),
                terms: t("terms"),
                about: t("about"),
                login: t("login"),
                register: t("register"),
              }}
            />
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
            <AppButton variant="ghost" className="text-lg font-medium px-6 hover:bg-gray-100 dark:hover:bg-gray-800">
              {t("login")}
            </AppButton>
            <AppButton variant="default" className="text-lg font-medium px-6">
              {t("register")}
            </AppButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
