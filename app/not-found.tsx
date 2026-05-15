'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo2 from '@/app/assets/logo2.png';

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: '#f5f5f3', direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}
    >
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className=" relative flex flex-cols justify-center items-start mb-8" style={{ width: 180, height: 180 }}>
              <Image src={logo2} alt="Afaq Logo" width={64} height={64} />
          <div
            className="absolute inset-0 flex items-center justify-center font-black"
            style={{ fontSize: 64, color: '#1a1a1a', letterSpacing: '-4px', lineHeight: 1 }}
          >
            404
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-3" style={{ color: '#1a1a1a' }}>
          عذراً، الصفحة غير موجودة
        </h1>
        <p className="text-sm mb-8 max-w-sm leading-relaxed" style={{ color: '#777' }}>
          يبدو أن الصفحة التي تبحث عنها قد تمّ نقلها أو حذفها أو ربما لم تكن موجودة أصلاً.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/"
            className="px-8 py-3 rounded-full text-white text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ backgroundColor: '#1a1a1a' }}
          >
            العودة إلى الرئيسية
          </Link>
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full text-sm font-semibold transition-all hover:bg-gray-100"
            style={{ border: '1.5px solid #ccc', color: '#444' }}
          >
            تواصل معنا
          </Link>
        </div>
      </main>

      <div className="pb-8 text-center text-xs" style={{ color: '#bbb' }}>
        فريق آفاق — AAFAQQ TEAM
      </div>
    </div>
  );
}