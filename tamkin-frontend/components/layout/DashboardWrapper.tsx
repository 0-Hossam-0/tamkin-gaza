"use client";

import { ReactNode, useState, useMemo, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LayoutDashboard,
  Settings,
  Contact,
  CreditCard,
  TrendingUp,
  Package,
  Megaphone,
  Search,
  Bell,
  LogOut,
  Puzzle,
  FileCode,
  Users2,
  Briefcase,
  Zap,
  Webhook,
  BotIcon,
  Code,
  Key,
  FileText,
  CalendarDays,
  Brain,
  Wand2,
  BarChart3,
  Video,
} from "lucide-react";

import Link from "next/link";
import { LanguageButtons } from "../common/LanguageSwitcher";
import useLanguage from "@/hooks/useLanguage";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useParams } from "next/navigation";
import { locales } from "@/i18n/routing";

interface SidebarItem {
  label: string;
  href?: string;
  children?: SidebarItem[];
  icon?: React.ComponentType<{ className?: string }>;
}

interface DashboardWrapperProps {
  children: ReactNode;
  title?: string;
  userName?: string;
  userEmail?: string;
}

export default function DashboardWrapper({
  children,
  title,
  userName = "John Doe",
  userEmail = "john@example.com",
}: DashboardWrapperProps) {
  const t = useTranslations("dashboard");
  const { isArabic, locale } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const path = `admin`;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const changeLocale = useCallback(
    (newLocale: (typeof locales)[number]) => {
      if (newLocale !== locale) {
        // Strip any existing locale prefix from the pathname
        const segments = pathname.split("/");
        const firstSegment = segments[1];
        const isLocale = locales.includes(firstSegment as any);
        const cleanPathname = isLocale ? "/" + segments.slice(2).join("/") : pathname;
        
        router.push(cleanPathname, { locale: newLocale });
      }
    },
    [locale, pathname, router],
  );

  const sidebarItems: SidebarItem[] = useMemo(
    () => [
      {
        label: t("overview"),
        href: `/${path}`,
        icon: LayoutDashboard,
      },
      {
        label: t("campaigns"),
        href: `/${path}/campaigns`,
        icon: Megaphone,
      },
      {
        label: t("reals"),
        href: `/${path}/reals`,
        icon: Video,
      },
      {
        label: t("users"),
        href: `/${path}/users`,
        icon: Users2,
      },
      {
        label: t("team"),
        href: `/${path}/team`,
        icon: User,
      },
      {
        label: t("analytics"),
        href: `/${path}/analytics`,
        icon: TrendingUp,
        children: [],
      },

      {
        label: t("payments"),
        href: `/${path}/payments`,
        icon: CreditCard,
      },
    ],
    [t, path],
  );

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [label]: !prev[label] }));
  }, []);

  const initials = useMemo(
    () =>
      userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    [userName],
  );

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="flex h-screen bg-pri dark:bg-[#141414] w-full overflow-hidden"
    >
      {/* ── SIDEBAR ── */}
      <aside
        className={`
  fixed top-0 ${isArabic ? "right-0" : "left-0"} h-full z-30
  flex flex-col
  border-${isArabic ? "l" : "r"} border-neutral-100 dark:border-neutral-800
  transform transition-all duration-300 ease-in-out

  ${isCollapsed ? "w-20" : "w-64"}

  ${sidebarOpen ? "translate-x-0" : isArabic ? "translate-x-full" : "-translate-x-full"}
  lg:translate-x-0 lg:static lg:h-screen lg:flex
`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b bg-main border-neutral-100 dark:border-neutral-800 shrink-0 gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-indigo-500 flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 rounded-sm bg-white/90" />
          </div>
          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 tracking-tight">
            {t("dashboard")}
          </span>
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="ml-auto w-7 h-7 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center justify-center"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isCollapsed ? "-rotate-90" : "rotate-90"
              }`}
            />
          </button>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 bg-main min-h-0 px-3 py-4">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 mb-3">
            {t("menu") ?? "Menu"}
          </p>
          <nav className="flex flex-col gap-0.5">
            {sidebarItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => toggleDropdown(item.label)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-sm font-medium
                      text-neutral-600 dark:text-neutral-400
                      hover:bg-neutral-50 dark:hover:bg-neutral-800
                      hover:text-neutral-900 dark:hover:text-neutral-100
                      transition-all duration-150 group
                      ${isArabic ? "flex-row-reverse" : "flex-row"}
                      ${item.children.some((child) => pathname === child.href) ? "bg-neutral-50/50 dark:bg-neutral-800/40" : ""}
                    `}
                  >
                    {item.icon && (
                      <span className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors duration-150">
                        <item.icon className="w-4 h-4 text-neutral-500 group-hover:text-indigo-500 transition-colors duration-150" />
                      </span>
                    )}
                    {!isCollapsed && (
                      <span
                        className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}
                      >
                        {item.label}
                      </span>
                    )}
                    {!isCollapsed && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${
                          openDropdowns[item.label] ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {openDropdowns[item.label] && (
                    <div
                      className={`flex flex-col ${isArabic ? "pr-11" : "pl-11"} gap-0.5 mt-0.5`}
                    >
                      {item.children.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href!}
                            className={`
                              relative flex items-center gap-2 px-3 py-2 rounded-xl text-sm
                              transition-all duration-150
                              ${isArabic ? "flex-row-reverse text-right" : "flex-row text-left"}
                              ${
                                isChildActive
                                  ? "bg-indigo-10 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                                  : "text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                              }
                            `}
                          >
                            {child.icon && (
                              <child.icon className="w-3.5 h-3.5 shrink-0" />
                            )}
                            {!isCollapsed && <span>{child.label}</span>}
                            {isChildActive && (
                              <div
                                className={`absolute w-1 h-4 bg-indigo-500 rounded-full top-1/2 -translate-y-1/2 ${isArabic ? "left-2" : "right-2"}`}
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`
                    relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                    text-sm font-medium transition-all duration-150 group
                    ${isArabic ? "flex-row-reverse" : "flex-row"}
                    ${
                      pathname === item.href
                        ? "bg-indigo-10 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                        : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100"
                    }
                  `}
                >
                  {item.icon && (
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors duration-150 
                      ${
                        pathname === item.href
                          ? "bg-white dark:bg-neutral-800 shadow-sm"
                          : "bg-neutral-100 dark:bg-neutral-800"
                      }
                      `}
                    >
                      <item.icon
                        className={`w-4 h-4 transition-colors duration-150 
                        ${
                          pathname === item.href
                            ? "text-indigo-600"
                            : "text-neutral-500 group-hover:text-indigo-500"
                        }`}
                      />
                    </span>
                  )}
                  {!isCollapsed && (
                    <span
                      className={`flex-1 ${isArabic ? "text-right" : "text-left"}`}
                    >
                      {item.label}
                    </span>
                  )}
                  {pathname === item.href && (
                    <div
                      className={`absolute w-1 h-5 bg-indigo-500 rounded-full top-1/2 -translate-y-1/2 ${isArabic ? "left-2" : "right-2"}`}
                    />
                  )}
                </Link>
              ),
            )}
          </nav>
        </ScrollArea>

        {/* Language Switcher */}
        {!isCollapsed && (
          <div className="px-3 mb-2">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 mb-2">
              {isArabic ? "اللغة" : "Language"}
            </p>
            <LanguageButtons />
          </div>
        )}

        {/* User card */}
        <div className="p-3 border-t border-neutral-100 dark:border-neutral-800 shrink-0">
          <div className="relative rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 p-3.5 overflow-hidden">
            {/* Bubble decorations */}
            <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full border border-indigo-400/10 pointer-events-none" />
            <div className="absolute bottom-2 right-3 w-6 h-6 rounded-full bg-indigo-400/6 border border-indigo-400/12 pointer-events-none" />

            <div
              className={`flex items-center gap-3 relative ${isArabic ? "flex-row-reverse" : "flex-row"}`}
            >
              {isCollapsed ? (
                <div className="flex justify-center">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-3 ${isArabic ? "flex-row-reverse" : "flex-row"}`}
                >
                  ...
                </div>
              )}
              <div
                className={`flex-1 min-w-0 ${isArabic ? "text-right" : "text-left"}`}
              >
                <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate leading-tight">
                  {userName}
                </p>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate leading-tight mt-0.5">
                  {userEmail}
                </p>
              </div>
              <button
                onClick={() => alert("Logout")}
                title={t("logout")}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150 shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        className={`absolute top-4 ${isArabic ? "right-4" : "left-4"} lg:hidden z-40 w-9 h-9 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 shadow-sm flex items-center justify-center text-neutral-600 dark:text-neutral-300`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
      </button>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex items-center justify-between px-6 bg-main dark:bg-[#1c1c1c] border-b border-[#C7C4D7]/15 dark:border-neutral-800 shrink-0">
          {/* Search */}
          <div className="flex items-center flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute w-3.5 h-3.5 top-1/2 left-3.5 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder={t("search")}
                className="
                  w-full pl-9 pr-4 py-2 h-9
                  bg-neutral-50 dark:bg-neutral-800
                  border border-neutral-200 dark:border-neutral-700
                  rounded-xl text-sm
                  text-neutral-700 dark:text-neutral-200
                  placeholder:text-neutral-400
                  focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400
                  transition-all duration-150
                "
              />
            </div>
          </div>

          {/* Right actions */}
          <div
            className={`flex items-center gap-2 ${isArabic ? "mr-4" : "ml-4"}`}
          >
            {/* Bell */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-150">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-500" />
            </button>

            {/* Settings */}
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all duration-150"
              onClick={() => alert("Settings")}
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-700 mx-1" />

            {/* Locale switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-150">
                  {locale.toUpperCase()}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl shadow-lg shadow-black/5 p-1"
              >
                {locales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => changeLocale(loc)}
                    className="rounded-lg text-sm px-3 py-2 cursor-pointer"
                  >
                    {loc.toUpperCase()}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2.5 h-9 pl-2 pr-3 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 transition-all duration-150"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                  {initials}
                </div>
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200 hidden sm:block">
                  {userName.split(" ")[0]}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-neutral-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div
                    className={`
                      absolute top-full mt-2 z-20
                      ${isArabic ? "left-0" : "right-0"}
                      w-52 bg-white dark:bg-neutral-900
                      border border-neutral-200 dark:border-neutral-700
                      rounded-2xl shadow-xl shadow-black/8
                      overflow-hidden p-1
                    `}
                  >
                    <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800 mb-1">
                      <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-100 truncate">
                        {userName}
                      </p>
                      <p className="text-xs text-neutral-400 truncate mt-0.5">
                        {userEmail}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-150"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="w-3.5 h-3.5" />
                      {t("profile")}
                    </Link>
                    <button
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-150"
                      onClick={() => alert("Logout")}
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      {t("logout")}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page title */}
        {title && (
          <div className="px-6 py-5 border-b border-neutral-100 dark:border-neutral-800 bg-white dark:bg-[#1c1c1c]">
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {title}
            </h1>
          </div>
        )}

        {/* Main scroll area */}
        <main className="flex-1 bg-main min-h-0 overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
