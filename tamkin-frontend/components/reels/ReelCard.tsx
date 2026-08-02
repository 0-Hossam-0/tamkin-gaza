"use client";

import React, { useState } from "react";
import { Eye, ImageOff } from "lucide-react";

export interface ReelItem {
  id: string;
  thumbnail: string;
  views: string;
  title: string;
  userName: string;
}

export function ReelCard({ reel }: { reel: ReelItem }) {
  const [broken, setBroken] = useState(false);

  return (
    <div className="relative min-w-[180px] sm:min-w-[220px] aspect-9/16 rounded-xl overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-800">
      {broken ? (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-2">
          <ImageOff className="w-8 h-8 text-gray-300 dark:text-gray-600" />
          <span className="text-[9px] text-gray-400 font-medium">Image unavailable</span>
        </div>
      ) : (
        <img
          src={reel.thumbnail}
          alt={reel.title}
          onError={() => setBroken(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">
        <Eye className="w-3 h-3" /> {reel.views}
      </div>
      <div className="absolute bottom-3 left-3 right-3">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full border border-white/30 overflow-hidden shrink-0 bg-gray-600 flex items-center justify-center text-[8px] text-white">
            {reel.userName.charAt(0)}
          </div>
          <span className="text-[10px] font-bold text-white truncate uppercase tracking-wider">{reel.userName}</span>
        </div>
        <h3 className="text-[10px] text-gray-200 line-clamp-1 font-medium">{reel.title}</h3>
      </div>
    </div>
  );
}

export function ReelCardSkeleton() {
  return (
    <div className="min-w-[180px] sm:min-w-[220px] aspect-9/16 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
  );
}
