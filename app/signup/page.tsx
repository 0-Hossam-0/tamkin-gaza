'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from '../assets/logo.png';
import { langHeaders } from '../lib/lang';

export default function SignupPage() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/');
    }
  }, [session, router]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nationality, setNationality] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError('');
    setSuccess('');

    const errors: Record<string, string> = {};

    if (!fullName) errors.fullName = 'هذا الحقل مطلوب';
    if (!email) errors.email = 'هذا الحقل مطلوب';
    if (!password) errors.password = 'هذا الحقل مطلوب';
    if (!confirm) errors.confirmPassword = 'هذا الحقل مطلوب';
    if (!nationality) errors.nationality = 'هذا الحقل مطلوب';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (password !== confirm) {
      setFieldErrors({ confirmPassword: 'كلمة المرور غير متطابقة' });
      return;
    }

    if (!agreed) {
      setGeneralError('يرجى الموافقة على سياسة الخصوصية');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...langHeaders() },
        body: JSON.stringify({
          email,
          password,
          confirmPassword: confirm,
          fullName,
          nationality,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.issues && Array.isArray(data.issues)) {
          const fieldErrorsMap: Record<string, string> = {};
          data.issues.forEach((issue: { path: string; error: string[] }) => {
            fieldErrorsMap[issue.path] = issue.error.join('، ');
          });
          setFieldErrors(fieldErrorsMap);
        } else {
          setGeneralError(data.message || 'حدث خطأ أثناء التسجيل');
        }
        return;
      }

      setSuccess('تم إنشاء الحساب بنجاح');
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirm('');
      setNationality('');
      setAgreed(false);
    } catch {
      setGeneralError('حدث خطأ في الاتصال بالخادم');
    } finally {
      setLoading(false);
    }
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

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>الاسم الكامل</label>
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setFieldErrors((prev) => { const next = { ...prev }; delete next.fullName; return next; }); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
              {fieldErrors.fullName && (
                <p className="text-xs" style={{ color: '#dc2626' }}>{fieldErrors.fullName}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>البريد الإلكتروني</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((prev) => { const next = { ...prev }; delete next.email; return next; }); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
              {fieldErrors.email && (
                <p className="text-xs" style={{ color: '#dc2626' }}>{fieldErrors.email}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setFieldErrors((prev) => { const next = { ...prev }; delete next.password; return next; }); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
              {fieldErrors.password && (
                <p className="text-xs" style={{ color: '#dc2626' }}>{fieldErrors.password}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>تأكيد كلمة المرور</label>
              <input
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => { setConfirm(e.target.value); setFieldErrors((prev) => { const next = { ...prev }; delete next.confirmPassword; return next; }); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
              {fieldErrors.confirmPassword && (
                <p className="text-xs" style={{ color: '#dc2626' }}>{fieldErrors.confirmPassword}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium" style={{ color: '#444' }}>الجنسية</label>
              <input
                type="text"
                placeholder="مثال: Egy"
                value={nationality}
                onChange={(e) => { setNationality(e.target.value); setFieldErrors((prev) => { const next = { ...prev }; delete next.nationality; return next; }); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                style={inputStyle}
                onFocus={focusGreen}
                onBlur={blurGray}
              />
              {fieldErrors.nationality && (
                <p className="text-xs" style={{ color: '#dc2626' }}>{fieldErrors.nationality}</p>
              )}
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

            {generalError && (
              <p className="text-sm text-center" style={{ color: '#dc2626' }}>{generalError}</p>
            )}
            {success && (
              <p className="text-sm text-center" style={{ color: '#2d6a2d' }}>{success}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm mt-1 transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50"
              style={{ backgroundColor: '#1a1a1a' }}
            >
              {loading ? 'جاري التحميل...' : 'إنشاء حساب'}
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