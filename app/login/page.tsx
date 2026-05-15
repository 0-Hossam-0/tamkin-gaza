'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from "next-auth/react";
import logo from '../assets/logo.png';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
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

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white text-sm mt-2 transition-opacity hover:opacity-90 active:opacity-80"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              تسجيل الدخول
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