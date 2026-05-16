'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from "next-auth/react";
import logo from '../assets/logo.png';
import { langHeaders } from '../lib/lang';
import { hasAuthCookiesFromDocument } from '../lib/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (session || hasAuthCookiesFromDocument()) {
      router.replace('/');
      return;
    }

    setCheckingAuth(false);
  }, [session, status, router]);

  if (checkingAuth || status === 'loading' || session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) { setError('البريد الإلكتروني أو كلمة المرور غير صحيحين'); return; }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        credentials: "include",
        headers: { 'Content-Type': 'application/json', ...langHeaders() },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) { setError('البريد الإلكتروني أو كلمة المرور غير صحيحين'); return; }

      router.push('/');
    } catch {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحين');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f5f5f3', direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}
    >
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div
          className="w-full max-w-md rounded-2xl p-10 shadow-lg"
          style={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5' }}
        >
          <div className="flex flex-col items-center mb-8">
            <div style={{ width: 64, height: 64, marginBottom: 12 }}>
              <Image src={logo} alt="Afaq Logo" width={64} height={64} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>تسجيل الدخول</h1>
            <p className="text-sm mt-1" style={{ color: '#777' }}>مرحباً بك في فريق آفاق</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: '#f5f5f3',
                  border: '1.5px solid #e0e0e0',
                  color: '#1a1a1a',
                  textAlign: 'right',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2d6a2d')}
                onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: '#f5f5f3',
                  border: '1.5px solid #e0e0e0',
                  color: '#1a1a1a',
                  textAlign: 'right',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#2d6a2d')}
                onBlur={(e) => (e.target.style.borderColor = '#e0e0e0')}
              />
            </div>

            <div className="flex justify-end">
              <span className="text-xs cursor-pointer" style={{ color: '#2d6a2d' }}>نسيت كلمة المرور؟</span>
            </div>

            {error && (
              <p className="text-sm text-center" style={{ color: '#dc2626' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm mt-2 transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
            </button>
          </form>
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="text-gray-400 text-xs">أو</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>
          <button
            onClick={() => signIn("google")}
            className="w-full py-3 rounded-xl font-bold text-sm mt-3 border transition-all hover:bg-gray-50"
            style={{ borderColor: '#e0e0e0', color: '#1a1a1a' }}
          >
            تسجيل الدخول باستخدام Google
          </button>

          <p className="text-center text-sm mt-6" style={{ color: '#888' }}>
            ليس لديك حساب؟{' '}
            <Link href="/signup" className="font-semibold" style={{ color: '#2d6a2d' }}>
              إنشاء حساب
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}