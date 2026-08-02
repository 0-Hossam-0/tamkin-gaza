"use client";

import React from "react";
import { useAuth } from "@/components/AuthProvider";
import { User, Mail, Shield, Globe, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const t = useTranslations("profile");

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t("notSignedIn")}</h2>
        <p className="text-gray-400 text-sm mb-6">{t("signInToView")}</p>
        <Link href="/login" className="text-primary-600 font-medium hover:underline">{t("signIn")}</Link>
      </div>
    );
  }

  const infos = [
    { label: t("name"), value: user.fullName, icon: User },
    { label: t("email"), value: user.email, icon: Mail },
    { label: t("role"), value: user.role, icon: Shield },
    { label: t("nationality"), value: user.nationality || "—", icon: Globe },
    { label: t("memberSince"), value: new Date(user.createdAt).toLocaleDateString(), icon: Calendar },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-600 transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> {t("back")}
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-linear-to-r from-primary-600 to-primary-400 h-24" />
        <div className="px-6 pb-6">
          <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center -mt-8 mb-4 border-2 border-white dark:border-gray-800 shadow-md">
            <User className="w-7 h-7 text-primary-600" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">{user.fullName}</h1>
          <p className="text-xs text-gray-400 font-medium">{user.email}</p>
          {!user.emailVerified && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded-full uppercase tracking-wider">
              {t("notVerified")}
            </span>
          )}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          {infos.map((info) => (
            <div key={info.label} className="flex items-center gap-4 px-6 py-4">
              <info.icon className="w-4 h-4 text-gray-400 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{info.label}</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
