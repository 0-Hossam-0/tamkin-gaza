"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useLanguage from "@/hooks/useLanguage";

type Currency = "USD" | "EGP";

interface RevenueData {
  month: string;
  revenue: Record<Currency, number>;
}


const allRevenueData: RevenueData[] = [
  { month: "Jan", revenue: { USD: 1200, EGP: 60000 } },
  { month: "Feb", revenue: { USD: 1500, EGP: 75000 } },
  { month: "Mar", revenue: { USD: 1700, EGP: 85000 } },
  { month: "Apr", revenue: { USD: 1400, EGP: 70000 } },
  { month: "May", revenue: { USD: 1900, EGP: 95000 } },
  { month: "Jun", revenue: { USD: 2200, EGP: 110000 } },
];


const formatCurrency = (value: number, currency: Currency) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};


export default function RevenueChart() {
  const [currency, setCurrency] = useState<Currency>("USD");
  const [loading, setLoading] = useState(false);
  const { isArabic } = useLanguage();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const chartData = allRevenueData.map((d) => ({
    month: d.month,
    value: d.revenue[currency],
  }));

  const tooltipFormatter = (value: any): string => {
    if (value == null) return "";

    const num = typeof value === "number" ? value : Number(value);

    if (isNaN(num)) return String(value);

    return formatCurrency(num, currency);
  };

  return (
    <Card className="p-6 border-none shadow-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Revenue ({currency})</h3>

        {/* Currency Switch */}
        <div className="flex gap-2">
          {(["USD", "EGP"] as Currency[]).map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                currency === c
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <Skeleton className="h-72 w-full rounded" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip formatter={tooltipFormatter} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#4f46e5"
              fill="#c7d2fe"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
