import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Heart, Mail, Globe } from "lucide-react";

export default async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-gray-100 dark:border-gray-800 bg-primary-800 dark:bg-gray-900/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-black text-2xl text-yellow-300 tracking-tight"
            >
              تمكين
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* CAMPAIGNS */}
          <div>
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider mb-4">
              {t("campaigns")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/campaigns"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("campaigns")}
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("stories")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider mb-4">
              {t("support")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("terms")}
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="font-bold text-sm text-yellow-300 uppercase tracking-wider mb-4">
              {t("company")}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-yellow-300 transition-colors"
                >
                  {t("about")}
                </Link>
              </li>
              <li className="flex items-center gap-2 text-sm text-yellow-500">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <Link href="mailto:[EMAIL_ADDRESS]">[EMAIL_ADDRESS]</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tamkin. {t("rights")}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link
              href="/privacy"
              className="hover:text-yellow-300 transition-colors"
            >
              {t("privacy")}
            </Link>
            <span className="text-yellow-300">|</span>
            <Link
              href="/terms"
              className="hover:text-yellow-300 transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
