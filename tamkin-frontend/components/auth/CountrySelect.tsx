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
      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-gray-900 dark:text-white appearance-none cursor-pointer"
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
