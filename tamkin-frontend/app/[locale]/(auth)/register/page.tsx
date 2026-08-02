"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useRegister } from "@/hooks/useAuth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import CountrySelect from "@/components/auth/CountrySelect";
import { User, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();
  const t = useTranslations("auth");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "PS",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error(t("passwordsNoMatch"));
      return;
    }

    try {
      const data = await registerMutation.mutateAsync(formData);
      toast.success(t("accountCreated"));
      if (data.user.role === "admin" || data.user.role === "super_admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data?.issues?.length) {
        toast.error(error.response.data.issues[0].error[0]);
      } else {
        toast.error(error.response?.data?.message || t("failedRegister"));
      }
    }
  };

  const inputClass = "w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400 transition-all";
  const inputWithEyeClass = "w-full pl-9 pr-9 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-gray-900 dark:text-white placeholder-gray-400 transition-all";

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t("createAccount")}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{t("joinTamkin")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("fullName")}
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input id="fullName" placeholder={t("fullNamePlaceholder")} value={formData.fullName} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("email")}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input id="email" type="email" placeholder={t("emailPlaceholder")} value={formData.email} onChange={handleChange} required className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t("nationality")}
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <CountrySelect
              value={formData.nationality}
              onChange={(code) => setFormData((prev) => ({ ...prev, nationality: code }))}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("password")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input id="password" type={showPassword ? "text" : "password"} placeholder={t("passwordPlaceholder")} value={formData.password} onChange={handleChange} required className={inputWithEyeClass} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t("confirm")}
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder={t("passwordPlaceholder")} value={formData.confirmPassword} onChange={handleChange} required className={inputWithEyeClass} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={registerMutation.isPending}
          className="w-full py-2.5 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {registerMutation.isPending ? t("creatingAccount") : t("createAccount")}
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
        {t("alreadyHaveAccount")}{" "}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
        >
          {t("signIn")}
        </button>
      </p>
    </div>
  );
}
