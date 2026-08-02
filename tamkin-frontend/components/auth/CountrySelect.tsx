"use client";

import { useMemo } from "react";
import countries from "i18n-iso-countries";
import langs from "i18n-iso-countries/langs/en.json";

countries.registerLocale(langs);

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const options = useMemo(() => {
    const names = countries.getNames("en", { select: "official" });
    return Object.entries(names)
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 text-gray-900 dark:text-white appearance-none cursor-pointer transition-all"
    >
      {options.map(({ code, name }) => (
        <option key={code} value={code}>
          {name} ({code})
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
