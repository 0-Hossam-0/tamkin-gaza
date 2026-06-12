"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Film } from "lucide-react";
import { useReels } from "@/hooks/useReels";
import { KPISkeleton } from "../skeletons/TableSkeleton";

export const RealKips = () => {
  const { data: paginated, isLoading } = useReels(1, 100);
  const reels = paginated?.items || [];

  const totalReels = reels.length;
  const stats = [
    { label: "Total Reels", value: totalReels, icon: Film },
    { label: "Total Likes", value: 0, icon: Heart },
    { label: "Total Views", value: 0, icon: Eye },
  ];

  if (isLoading) return <KPISkeleton />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card key={label} className="rounded-2xl border-none hover:shadow-sm transition">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-xl font-semibold text-gray-900">{value.toLocaleString()}</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-600" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
