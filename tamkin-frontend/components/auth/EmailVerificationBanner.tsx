"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRequestConfirmEmail, useConfirmEmail } from "@/hooks/useAuth";
import { Mail, CheckCircle, XCircle, Loader2, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

export function EmailVerificationBanner() {
  const { user } = useAuth();
  const requestConfirm = useRequestConfirmEmail();
  const confirmEmail = useConfirmEmail();
  const t = useTranslations("emailVerification");

  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!user || user.emailVerified || dismissed) return null;

  const handleSendCode = async () => {
    try {
      await requestConfirm.mutateAsync();
      setCodeSent(true);
      toast.success(t("codeSent"));
    } catch {
      toast.error(t("codeFailed"));
    }
  };

  const handleVerify = async () => {
    if (!code.trim()) return;
    try {
      await confirmEmail.mutateAsync(code.trim());
      toast.success(t("verifiedSuccess"));
      user.emailVerified = true;
      setDismissed(true);
    } catch {
      toast.error(t("invalidCode"));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-xl shadow-gray-200/50 dark:shadow-black/20 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{t("title")}</h3>
            <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-gray-300 hover:text-gray-500 transition-colors"
        >
          <XCircle className="w-4 h-4" />
        </button>
      </div>

      {!codeSent ? (
        <button
          onClick={handleSendCode}
          disabled={requestConfirm.isPending}
          className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {requestConfirm.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
          {t("sendCode")}
        </button>
      ) : (
        <div className="space-y-3">
          <div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder={t("enterCode")}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm text-center tracking-[0.5em] font-mono font-bold focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleVerify}
              disabled={code.length < 4 || confirmEmail.isPending}
              className="flex-1 py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {confirmEmail.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              {t("verify")}
            </button>
            <button
              onClick={handleSendCode}
              disabled={requestConfirm.isPending}
              className="px-3 py-2.5 text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors"
            >
              {t("resend")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
