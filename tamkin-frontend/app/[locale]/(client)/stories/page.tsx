"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useReels } from "@/hooks/useReels";
import { ReelCard, ReelCardSkeleton } from "@/components/reels/ReelCard";

export default function StoriesPage() {
  const t = useTranslations("reels");
  const { data: paginated, isLoading } = useReels(1, 50);
  const reels = paginated?.items || [];

  const mappedReels = reels.map((r) => ({
    id: r.uuid,
    thumbnail: r.fileUrl,
    views: "—",
    title: r.title || "Untitled Reel",
    userName: r.user?.fullName || "Unknown",
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">
          {t("heading")}
        </h1>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
          {t("subtitle")}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <ReelCardSkeleton key={i} />
          ))}
        </div>
      ) : mappedReels.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {mappedReels.map((reel) => (
            <ReelCard key={reel.id} reel={reel} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">
            No reels available
          </p>
        </div>
      )}
    </div>
  );
}
