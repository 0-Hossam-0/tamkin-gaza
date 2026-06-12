"use client";

import React, { useState } from "react";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignCardSkeleton } from "@/components/skeletons/CampaignSkeleton";

const CATEGORIES = ["All", "Medical", "Food", "Water", "Shelter", "Education"];

export default function CampaignsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: campaigns, isLoading } = useCampaigns();

  const campaignTitle = (c: { title: unknown }) =>
    typeof c.title === "string"
      ? c.title
      : (c.title as Record<string, string> | undefined)?.["en"] || "";

  const filteredCampaigns = (campaigns || []).filter((campaign: any) => {
    const title = campaignTitle(campaign).toLowerCase();
    const matchesCategory =
      activeCategory === "All" || title.includes(activeCategory.toLowerCase());
    const matchesSearch = title.includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">
          Active Campaigns
        </h1>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
          Support our ongoing humanitarian efforts in Gaza
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <CampaignCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign: any) => (
            <CampaignCard
              key={campaign.uuid}
              uuid={campaign.uuid}
              name={campaignTitle(campaign)}
              image={
                campaign.image?.[0] ||
                "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80"
              }
              tags={[campaign.status]}
              status={campaign.status === "ACTIVE" ? "active" : "completed"}
              totalPaid={Number(campaign.current_amount)}
              requiredAmount={Number(campaign.target_amount)}
              rating={5}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">
            No campaigns found matching your filters
          </p>
          <button
            onClick={() => {
              setActiveCategory("All");
              setSearchQuery("");
            }}
            className="mt-4 text-sm font-black text-indigo-600 uppercase tracking-widest hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
