"use client";
import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import CampaignCard from "@/components/campaigns/CampaignCard";
import AppButton from "@/components/buttons/AppButton";
import ReelsSection from "@/components/reels/ReelsSection";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignCardSkeleton } from "@/components/skeletons/CampaignSkeleton";

const PAGE_SIZE = 6;
const STATUSES = ["ALL", "ACTIVE", "COMPLETED", "DRAFT", "CANCELED"];

export default function Home() {
  const { data: campaigns, isLoading } = useCampaigns();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const campaignTitle = (c: { title: unknown }) =>
    typeof c.title === "string"
      ? c.title
      : (c.title as Record<string, string> | undefined)?.["en"] || "";

  const filtered = useMemo(() => {
    const list = campaigns || [];
    return list.filter((c: any) => {
      const title = campaignTitle(c).toLowerCase();
      const matchesSearch = title.includes(search.toLowerCase());
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="py-4">
      <ReelsSection />

      <div className="flex items-center justify-between mt-8 mb-4">
        <h2 className="text-2xl font-bold">Campaigns</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "ALL" ? "All Statuses" : s}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <CampaignCardSkeleton key={i} />
          ))}
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((campaign: any) => (
              <CampaignCard
                key={campaign.uuid}
                uuid={campaign.uuid}
                name={campaignTitle(campaign)}
                image={
                  campaign.image?.[0] ||
                  "https://media.istockphoto.com/id/1285484294/photo/little-child-boy-hiding-in-old-vintage-suitcase-in-the-attic.webp?a=1&b=1&s=612x612&w=0&k=20&c=cM2PBmrv26qpy3evJcpjEtRwA8gmf_P3mo4S7QtjU6I="
                }
                tags={[campaign.status]}
                status={campaign.status === "ACTIVE" ? "active" : "completed"}
                totalPaid={Number(campaign.current_amount)}
                requiredAmount={Number(campaign.target_amount)}
                rating={5}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage <= 1}
                className="p-2 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-30 hover:border-indigo-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-bold text-gray-500">
                Page {safePage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage >= totalPages}
                className="p-2 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-30 hover:border-indigo-200 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">
            No campaigns found
          </p>
        </div>
      )}
    </div>
  );
}
