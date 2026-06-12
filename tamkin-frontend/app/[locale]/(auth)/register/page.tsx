"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useRegister } from "@/hooks/useAuth";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import toast from "react-hot-toast";
import CountrySelect from "@/components/auth/CountrySelect";
import { User, Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const registerMutation = useRegister();

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
      toast.error("Passwords do not match");
      return;
    }

    try {
      const data = await registerMutation.mutateAsync(formData);
      toast.success("Account created successfully!");
      if (data.user.role === "admin" || data.user.role === "super_admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      if (error.response?.data?.issues?.length) {
        toast.error(error.response.data.issues[0].error[0]);
      } else {
        toast.error(error.response?.data?.message || "Failed to register");
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create an account</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Join Tamkin and start making a difference</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Nationality
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
              <CountrySelect
                value={formData.nationality}
                onChange={(code) => setFormData((prev) => ({ ...prev, nationality: code }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {registerMutation.isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white dark:bg-zinc-900 px-4 text-sm text-gray-400">or continue with</span>
          </div>
        </div>

        <GoogleLoginButton />

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
