"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Share2, Eye } from "lucide-react";
import AppButton from "../buttons/AppButton";
import { Link } from "@/i18n/navigation";

type CampaignCardProps = {
  name: string;
  image: string;
  tags: string[];
  status: "active" | "paused" | "completed";
  totalPaid: number;
  requiredAmount: number;
  rating?: number;
};

const statusStyles = {
  active: "bg-green-500/10 text-green-600 border-green-200",
  paused: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  completed: "bg-blue-500/10 text-blue-600 border-blue-200",
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  name,
  image,
  tags,
  status,
  totalPaid,
  requiredAmount,
  rating = 4,
}) => {
  const [liked, setLiked] = useState(false);

  const remaining = requiredAmount - totalPaid;

  return (
    <Link href={`/campaigns/123`} className="block group">
      <Card className="w-full max-w-xl overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:border-indigo-200">
        {/* IMAGE (TRUE TOP EDGE) */}
        <div className="relative h-48 w-full overflow-hidden rounded-t-xl bg-gray-100">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* STATUS */}
          <div className="absolute top-3 left-3">
            <span
              className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/90 dark:bg-gray-900/90 border border-gray-100 dark:border-gray-800 text-gray-900 dark:text-white shadow-sm`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 space-y-4">
          <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">{name}</h3>

          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, i) => (
              <span key={i} className="text-[9px] font-bold uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-gray-900 px-1.5 py-0.5 rounded border border-gray-100 dark:border-gray-800">
                {tag}
              </span>
            ))}
          </div>

          <div className="space-y-1.5">
            <div className="w-full h-1 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000" 
                style={{ width: `${(totalPaid / requiredAmount) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
              <span className="text-gray-400">Raised</span>
              <span className="text-indigo-600">{Math.round((totalPaid / requiredAmount) * 100)}%</span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-700 pt-3">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Total</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">
                {totalPaid.toLocaleString()} EGP
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Remaining</span>
              <span className={`text-sm font-black ${remaining > 0 ? "text-rose-600" : "text-emerald-600"}`}>
                {remaining.toLocaleString()} EGP
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CampaignCard;
