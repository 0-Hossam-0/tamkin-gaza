'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import logo from '../assets/logo.png';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);

  const inputStyle = {
    backgroundColor: '#f5f5f3',
    border: '1.5px solid #e0e0e0',
    color: '#1a1a1a',
    textAlign: 'right' as const,
  };

  const focusGreen = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#2d6a2d';
  };
  const blurGray = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.style.borderColor = '#e0e0e0';
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f5f5f3', direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}
    >
      <main className="flex-1 flex items-center justify-center px-4 py-14">
        <div
          className="w-full max-w-md rounded-2xl p-10 shadow-lg"
          style={{ backgroundColor: '#fff', border: '1px solid #e5e5e5'  }}
        >
          <div className="flex flex-col items-center mb-8">
            <div style={{ width: 64, height: 64, marginBottom: 12 }}>
              <Image src={logo} alt="Afaq Logo" width={64} height={64} />
            </div>
            <h1 className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>إنشاء حساب</h1>
            <p className="text-sm mt-1" style={{ color: '#777' }}>انضم إلى فريق آفاق</p>
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>الاسم الكامل</label>
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>تأكيد كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm" style={{ color: '#555' }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 cursor-pointer"
                style={{ accentColor: '#2d6a2d' }}
              />
              أوافق على{' '}
              <span className="font-semibold" style={{ color: '#2d6a2d' }}>
                سياسة الخصوصية
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white text-sm mt-1 transition-opacity hover:opacity-90 active:opacity-80"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              إنشاء حساب
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: '#888' }}>
            لديك حساب بالفعل؟{' '}
            <Link href="/login" className="font-semibold" style={{ color: '#2d6a2d' }}>
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}