"use client";

import React, { useRef } from "react";
import { Eye } from "lucide-react";
import { useReels } from "@/hooks/useReels";

interface Reel {
  id: string;
  thumbnail: string;
  views: string;
  title: string;
  userName: string;
}

const ReelCard = ({ reel }: { reel: Reel }) => {
  return (
    <div className="relative min-w-[180px] sm:min-w-[220px] aspect-9/16 rounded-xl overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-800">
      <img src={reel.thumbnail} alt={reel.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
};

const ReelsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: paginated } = useReels(1, 10);
  const reels = paginated?.items || [];

  const mappedReels: Reel[] = reels.map((r) => ({
    id: r.uuid,
    thumbnail: r.fileUrl,
    views: "—",
    title: r.title || "Untitled Reel",
    userName: r.user?.fullName || "Unknown",
  }));

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">Reels</h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Stories</p>
        </div>
        <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">See All</button>
      </div>
      <div ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {mappedReels.length > 0
          ? mappedReels.map((reel) => (
              <div key={reel.id} className="snap-start"><ReelCard reel={reel} /></div>
            ))
          : Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[180px] sm:min-w-[220px] aspect-9/16 rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            ))}
      </div>
    </section>
  );
};

export default ReelsSection;
