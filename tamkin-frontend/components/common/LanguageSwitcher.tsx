"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales } from "@/i18n/routing";

const languageNames: Record<string, string> = {
  en: "English",
  ar: "العربية",
  tr: "Türkçe",
  ur: "اردو",
};

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    // Ensure we don't have a double locale prefix
    const segments = pathname.split("/");
    const firstSegment = segments[1];
    const isLocale = locales.includes(firstSegment as any);
    const cleanPathname = isLocale ? "/" + segments.slice(2).join("/") : pathname;

    router.replace(cleanPathname, { locale: newLocale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors outline-none group">
        <Languages className="w-5 h-5 text-gray-500 group-hover:text-indigo-600" />
        <span className="text-sm font-medium uppercase">{currentLocale}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            className={`cursor-pointer rounded-lg mb-1 last:mb-0 ${
              currentLocale === locale
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                : ""
            }`}
          >
            <span className="w-full flex justify-between items-center">
              {languageNames[locale]}
              {currentLocale === locale && <span className="w-2 h-2 rounded-full bg-indigo-600" />}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const LanguageButtons = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLocaleChange = (newLocale: string) => {
    // Ensure we don't have a double locale prefix
    const segments = pathname.split("/");
    const firstSegment = segments[1];
    const isLocale = locales.includes(firstSegment as any);
    const cleanPathname = isLocale ? "/" + segments.slice(2).join("/") : pathname;

    router.replace(cleanPathname, { locale: newLocale });
  };

  return (
    <div className="flex flex-wrap gap-2 p-4">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`flex-1 min-w-[60px] px-3 py-2 rounded-lg text-xs font-bold transition-all border ${
            currentLocale === locale
              ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none"
              : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-300"
          }`}
        >
          {languageNames[locale]}
        </button>
      ))}
    </div>
  );
};
