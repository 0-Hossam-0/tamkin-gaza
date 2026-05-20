import { useLocale } from "next-intl";
import React from "react";

const useLanguage = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const isEnglish = !isArabic;
  return { locale, isArabic, isEnglish };
};

export default useLanguage;
