"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignCardSkeleton } from "@/components/skeletons/CampaignSkeleton";

export default function CampaignsPage() {
  const t = useTranslations("campaigns");
  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const { data: campaigns, isLoading } = useCampaigns();

  const campaignTitle = (c: { title: unknown }) =>
    typeof c.title === "string"
      ? c.title
      : (c.title as Record<string, string> | undefined)?.["en"] || "";

  const handleSearch = () => {
    setSubmittedQuery(searchInput.trim());
  };

  const filteredCampaigns = (campaigns || []).filter((campaign: any) => {
    const title = campaignTitle(campaign).toLowerCase();
    const q = submittedQuery.toLowerCase();
    const matchesSearch = !q || title.includes(q);
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">
          {t("title")}
        </h1>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
          {t("subtitle")}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-12">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all"
          />
        </div>
        <button
          onClick={handleSearch}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 transition-colors shrink-0"
        >
          <Search className="w-4 h-4" />
          {t("search")}
        </button>
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
            {t("noCampaigns")}
          </p>
          {submittedQuery && (
            <button
              onClick={() => {
                setSearchInput("");
                setSubmittedQuery("");
              }}
              className="mt-4 text-sm font-black text-primary-600 uppercase tracking-widest hover:underline"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
