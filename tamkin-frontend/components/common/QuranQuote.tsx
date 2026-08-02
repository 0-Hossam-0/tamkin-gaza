"use client";

import { useEffect, useState } from "react";
import { Amiri_Quran } from "next/font/google";

const amiri = Amiri_Quran({
  weight: "400",
  subsets: ["arabic"],
});

const verses = [
  {
    text: "مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ ۗ وَاللَّهُ يُضَاعِفُ لِمَن يَشَاءُ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
    source: "سورة البقرة - 261",
  },
  {
    text: "لَن تَنَالُوا الْبِرَّ حَتَّىٰ تُنفِقُوا مِمَّا تُحِبُّونَ ۚ وَمَا تُنفِقُوا مِن شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
    source: "سورة آل عمران - 92",
  },
  {
    text: "وَمَا أَنفَقْتُم مِّن شَيْءٍ فَهُوَ يُخْلِفُهُ ۖ وَهُوَ خَيْرُ الرَّازِقِينَ",
    source: "سورة سبأ - 39",
  },
  {
    text: "يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ ۗ وَاللَّهُ لَا يُحِبُّ كُلَّ كَفَّارٍ أَثِيمٍ",
    source: "سورة البقرة - 276",
  },
  {
    text: "إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ ۖ وَإِن تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَّكُمْ ۚ وَيُكَفِّرُ عَنكُم مِّن سَيِّئَاتِكُمْ ۗ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
    source: "سورة البقرة - 271",
  },
  {
    text: "الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
    source: "سورة البقرة - 274",
  },
  {
    text: "فَاتَّقُوا اللَّهَ مَا اسْتَطَعْتُمْ وَاسْمَعُوا وَأَطِيعُوا وَأَنفِقُوا خَيْرًا لِّأَنفُسِكُمْ ۗ وَمَن يُوقَ شُحَّ نَفْسِهِ فَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ",
    source: "سورة التغابن - 16",
  },
  {
    text: "آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ ۖ فَالَّذِينَ آمَنُوا مِنكُمْ وَأَنفَقُوا لَهُمْ أَجْرٌ كَبِيرٌ",
    source: "سورة الحديد - 7",
  },
  {
    text: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنفِقُوا مِن طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُم مِّنَ الْأَرْضِ",
    source: "سورة البقرة - 267",
  },
  {
    text: "إِنَّ الْمُصَّدِّقِينَ وَالْمُصَّدِّقَاتِ وَأَقْرَضُوا اللَّهَ قَرْضًا حَسَنًا يُضَاعَفُ لَهُمْ وَلَهُمْ أَجْرٌ كَرِيمٌ",
    source: "سورة الحديد - 18",
  },
];

interface QuranQuoteProps {
  className?: string;
}

export default function QuranQuote({ className = "" }: QuranQuoteProps) {
  const [verse, setVerse] = useState<{
    text: string;
    source: string;
  } | null>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * verses.length);
    setVerse(verses[randomIndex]);
  }, []);

  if (!verse) {
    return null;
  }

  return (
    <div
      dir="rtl"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ease-out ${
        isOpen
          ? "left-4 right-4 md:left-1/2 md:right-auto md:w-[850px] md:-translate-x-1/2"
          : "w-auto"
      }`}
    >
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className={`
            group
            flex items-center gap-3
            rounded-full
            border border-primary-200/70 dark:border-primary-800
            bg-white/90 dark:bg-zinc-900/90
            backdrop-blur-xl
            px-5 py-3
            shadow-lg shadow-black/5
            hover:shadow-xl
            hover:-translate-y-0.5
            transition-all
            ${className}
          `}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/40">
            📖
          </div>

          <div className="text-right">
            <p className="text-sm font-bold text-primary-700 dark:text-primary-300">
              آية اليوم
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              اضغط للقراءة
            </p>
          </div>
        </button>
      ) : (
        <div
          className={`
            relative overflow-hidden
            rounded-3xl
            border border-primary-200/60 dark:border-primary-800/60
            bg-white/95 dark:bg-zinc-900/95
            backdrop-blur-xl
            shadow-2xl
            ${className}
          `}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100/70 dark:from-zinc-900 dark:via-zinc-900 dark:to-primary-950/40" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(34,197,94,0.05),transparent_60%)]" />

          {/* Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute left-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 dark:bg-zinc-800/70 text-lg hover:bg-white dark:hover:bg-zinc-700 transition"
          >
            ✕
          </button>

          <div className="relative z-10 p-8 md:p-10">
            <div className="mb-8 flex justify-center">
              <span className="rounded-full border border-primary-200 dark:border-primary-700 bg-primary-100/70 dark:bg-primary-900/30 px-5 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300">
                📖 آية اليوم
              </span>
            </div>

            <p className={`text-center text-3xl md:text-4xl leading-[2.5] text-primary-900 dark:text-primary-100 ${amiri.className}`}>
              ﴿ {verse.text} ﴾
            </p>

            <div className="mt-10 flex justify-center">
              <span className="rounded-full border border-primary-300 dark:border-primary-700 bg-white/70 dark:bg-primary-900/40 px-6 py-2 text-sm font-semibold text-primary-700 dark:text-primary-300 backdrop-blur-sm">
                {verse.source}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
