"use client";
import { useState, useMemo, useCallback } from "react";
import {
  Search,
  SlidersHorizontal,
 
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import CampaignCard from "@/components/campaigns/CampaignCard";
import ReelsSection from "@/components/reels/ReelsSection";
import { useCampaigns } from "@/hooks/useCampaigns";
import { CampaignCardSkeleton } from "@/components/skeletons/CampaignSkeleton";
import MediaSection from "@/components/media/MediaSection";
import ContactSection from "@/components/contact/ContactSection";
import { Link } from "@/i18n/navigation";

const PAGE_SIZE = 6;

export default function Home() {
  const t = useTranslations("homePage");
  const locale = useLocale();
  const { data: campaigns, isLoading } = useCampaigns();

  const [searchInput, setSearchInput] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const campaignTitle = (c: { title: unknown }) =>
    typeof c.title === "string"
      ? c.title
      : (c.title as Record<string, string> | undefined)?.[locale] ||
        (c.title as Record<string, string> | undefined)?.["en"] ||
        "";

  const handleSearch = useCallback(() => {
    setSubmittedQuery(searchInput.trim());
    setPage(1);
  }, [searchInput]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") handleSearch();
    },
    [handleSearch],
  );

  const filtered = useMemo(() => {
    const list = campaigns || [];
    const q = submittedQuery.toLowerCase();
    return list.filter((c: any) => {
      const title = campaignTitle(c).toLowerCase();
      const matchesSearch = !q || title.includes(q);
      const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, submittedQuery, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  return (
    <div className="min-w-full">
      <div className="w-screen relative  left-1/2 right-1/2 -mx-[50vw]">
        <ReelsSection />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ─── HEADER ─── */}
        <div className="flex items-center justify-between mt-12 mb-8">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <h1 className="md:text-6xl md:text-4xl font-bold text-primary-600 dark:text-white uppercase tracking-tight">
              {t("activeCampaigns")}
            </h1>
            <p className="mt-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
              {t("subtitle")}
            </p>
          </div>
        </div>

        {/* ─── SEARCH + FILTER ─── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 transition-all"
          >
            <option value="ALL">{t("allStatuses")}</option>
            <option value="ACTIVE">{t("active")}</option>
            <option value="COMPLETED">{t("completed")}</option>
            <option value="DRAFT">{t("draft")}</option>
            <option value="CANCELED">{t("canceled")}</option>
          </select>
          <button
            onClick={handleSearch}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20 shrink-0"
          >
            <Search className="w-4 h-4" />
            {t("search")}
          </button>
        </div>

        {/* ─── CAMPAIGNS GRID ─── */}
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

            <Link href={"/campaigns"}>
              <div className="flex items-center justify-center gap-4 mt-12">
                <button className="px-6 py-3 bg-primary-600 text-white font-bold text-sm rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20">
                  {t("viewAll")}
                </button>
              </div>
            </Link>
            {/* 
            {totalPages >= 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage <= 1}
                  className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-30 hover:border-primary-200 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-gray-500 min-w-[120px] text-center">
                  {t("pageOf", { page: safePage, total: totalPages })}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage >= totalPages}
                  className="p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 disabled:opacity-30 hover:border-primary-200 hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div> */}
            {/* )} */}
          </>
        ) : (
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-400 font-bold uppercase tracking-widest">
              {t("noCampaigns")}
            </p>
            {(submittedQuery || statusFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchInput("");
                  setSubmittedQuery("");
                  setStatusFilter("ALL");
                  setPage(1);
                }}
                className="mt-4 text-sm font-black text-primary-600 uppercase tracking-widest hover:underline"
              >
                {t("clearFilters")}
              </button>
            )}
          </div>
        )}
      </div>

      {/* ─── MEDIA SECTION ─── */}
      <div className="w-screen relative mt-10 left-1/2 right-1/2 -mx-[50vw] bg-[#f7ecdd] dark:bg-gray-900/20">
        <MediaSection />
      </div>

      {/* ─── CONTACT SECTION ─── */}
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#f7ecdd] dark:bg-gray-900/20">
        <ContactSection />
      </div>
    </div>
  );
}
