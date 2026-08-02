"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useLogin } from "@/hooks/useAuth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();
  const t = useTranslations("auth");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      toast.success(t("loggedIn"));
      if (data.user.role === "admin" || data.user.role === "super_admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || t("failedLogin"));
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("welcomeBack")}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("signInToAccount")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("password")}
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loginMutation.isPending ? t("signingIn") : t("signIn")}
        </button>
      </form>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-white dark:bg-zinc-900 px-3 text-xs text-gray-400">{t("orContinueWith")}</span>
        </div>
      </div>

      <GoogleLoginButton />

      <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-5">
        {t("noAccount")}{" "}
        <button
          type="button"
          onClick={() => router.push("/register")}
          className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
        >
          {t("signUp")}
        </button>
      </p>
    </div>
  );
}
