import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { NavAuth } from "./NavAuth";
import NavMobile from "./NavMobile";
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
    <nav className="w-full min-h-[100px] flex items-center bg-white dark:bg-gray-950 backdrop-blur-md sticky top-0 z-[60] border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between h-20 px-6 lg:px-8">
        {/* LEFT SIDE: Logo + Links */}
          <div className="flex items-center gap-12">
            <Link href="/" className="hover:opacity-90 transition-opacity">
              <Image
                src="/favicon.ico"
                alt="Tamkin"
                width={36}
                height={36}
                className="object-contain"
              />
            </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/campaigns"
              className="text-2xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
            >
              {t("campaigns")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link
              href="/stories"
              className="text-2xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors relative group"
            >
              {t("stories")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all group-hover:w-full"></span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-2xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors outline-none group">
                {t("more")}
                <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 p-2 rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg z-[100]"
                align="end"
              >
                <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-primary-50 focus:text-primary-600 dark:focus:bg-gray-800 dark:focus:text-primary-400 p-0">
                  <Link
                    href="/about"
                    className="w-full px-4 py-2 text-base block"
                  >
                    {t("about")}
                  </Link>
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
                stories: t("stories"),
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
            <NavAuth loginLabel={t("login")} registerLabel={t("register")} />
          </div>
        </div>
      </div>
    </nav>
  );
}
