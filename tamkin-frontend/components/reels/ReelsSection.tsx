"use client";

import React, { useRef } from "react";
import { Heart, MessageCircle, Share2, Play, Eye } from "lucide-react";

interface Reel {
  id: string;
  thumbnail: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  user: {
    name: string;
    avatar: string;
  };
  title: string;
}

const MOCK_REELS: Reel[] = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1593113565253-15df45451e5e?auto=format&fit=crop&q=80&w=400&h=700",
    views: "12.5K",
    likes: "3.4K",
    comments: "124",
    shares: "45",
    user: {
      name: "Tamkin Relief",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
    },
    title: "Distribution in North Gaza",
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=400&h=700",
    views: "8.2K",
    likes: "2.1K",
    comments: "89",
    shares: "12",
    user: {
      name: "Gaza Hope",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    },
    title: "Safe Haven for Children",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=400&h=700",
    views: "25.1K",
    likes: "10.5K",
    comments: "432",
    shares: "156",
    user: {
      name: "Aid Connect",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
    },
    title: "Emergency Water Supply",
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&q=80&w=400&h=700",
    views: "5.4K",
    likes: "1.2K",
    comments: "56",
    shares: "8",
    user: {
      name: "Mercy Hands",
      avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=60",
    },
    title: "Hot Meals Distribution",
  },
];

const ReelCard = ({ reel }: { reel: Reel }) => {
  return (
    <div className="relative min-w-[180px] sm:min-w-[220px] aspect-9/16 rounded-xl overflow-hidden group cursor-pointer border border-gray-100 dark:border-gray-800">
      {/* Background Image */}
      <img
        src={reel.thumbnail}
        alt={reel.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

      {/* Top Views Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[9px] font-bold text-white uppercase tracking-wider border border-white/10">
        <Eye className="w-3 h-3" />
        {reel.views}
      </div>

      {/* Right Side Interaction Buttons */}
      <div className="absolute right-2 bottom-12 flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-0.5">
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
            <Heart className="w-4 h-4" />
          </button>
          <span className="text-[8px] font-bold text-white uppercase tracking-widest">{reel.likes}</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </button>
          <span className="text-[8px] font-bold text-white uppercase tracking-widest">{reel.comments}</span>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-3 left-3 right-10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-5 h-5 rounded-full border border-white/30 overflow-hidden shrink-0">
            <img src={reel.user.avatar} alt={reel.user.name} className="w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold text-white truncate uppercase tracking-wider">
            {reel.user.name}
          </span>
        </div>
        <h3 className="text-[10px] text-gray-200 line-clamp-1 font-medium">
          {reel.title}
        </h3>
      </div>
    </div>
  );
};

const ReelsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-6">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider">
            Reels
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Short Stories</p>
        </div>
        <button className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest hover:underline">
          See All
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-4 px-4 sm:px-0 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MOCK_REELS.map((reel) => (
          <div key={reel.id} className="snap-start">
            <ReelCard reel={reel} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReelsSection;
