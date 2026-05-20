"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Eye, Film } from "lucide-react";

type ReelStats = {
  id: string;
  likes: number;
  views: number;
};

const REELS: ReelStats[] = [
  { id: "R-1", likes: 120, views: 1500 },
  { id: "R-2", likes: 80, views: 900 },
  { id: "R-3", likes: 200, views: 3200 },
];

export const RealKips = () => {
  const totalReels = REELS.length;
  const totalLikes = REELS.reduce((sum, r) => sum + r.likes, 0);
  const totalViews = REELS.reduce((sum, r) => sum + r.views, 0);

  const stats = [
    {
      label: "Total Reels",
      value: totalReels,
      icon: Film,
    },
    {
      label: "Total Likes",
      value: totalLikes,
      icon: Heart,
    },
    {
      label: "Total Views",
      value: totalViews,
      icon: Eye,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-3">
      {stats.map(({ label, value, icon: Icon }) => (
        <Card
          key={label}
          className="rounded-2xl border-none hover:shadow-sm transition"
        >
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-gray-500">{label}</span>
              <span className="text-xl font-semibold text-gray-900">
                {value.toLocaleString()}
              </span>
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
