"use client";

import React from "react";
import { ArrowLeft, Edit, Calendar, Target, Activity, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCampaign } from "@/hooks/useCampaigns";
import { CampaignDetailSkeleton } from "@/components/skeletons/CampaignSkeleton";

const CampaignShowPage = () => {
  const { id, locale } = useParams();
  const { data: campaign, isLoading } = useCampaign(id as string);

  if (isLoading) return <CampaignDetailSkeleton />;
  if (!campaign) return <div className="text-center py-20 text-gray-500">Campaign not found</div>;

  const target = Number(campaign.target_amount);
  const current = Number(campaign.current_amount);
  const progress = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/campaigns`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{campaign.title}</h2>
            <p className="text-sm text-gray-500">Campaign Details</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
          <Edit className="w-4 h-4" /> <span>Edit Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{campaign.description}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Target className="w-4 h-4 text-indigo-500" /> Goal</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">${target.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Activity className="w-4 h-4 text-emerald-500" /> Raised</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">${current.toLocaleString()}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Calendar className="w-4 h-4 text-amber-500" /> Created</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">{new Date(campaign.created_at).toLocaleDateString()}</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2"><Users className="w-4 h-4 text-blue-500" /> Status</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white capitalize">{campaign.status.toLowerCase()}</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="font-bold text-indigo-600">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-600 dark:bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          </div>

          {campaign.image && campaign.image.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {campaign.image.map((img, i) => (
                  <img key={i} src={img} alt={`Campaign image ${i + 1}`} className="rounded-lg object-cover w-full h-40" />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  campaign.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" :
                  campaign.status === "DRAFT" ? "bg-amber-100 text-amber-700" :
                  campaign.status === "COMPLETED" ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700"
                }`}>{campaign.status}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{new Date(campaign.created_at).toLocaleDateString()}</span>
              </div>
              {campaign.updated_at && (
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500">Updated</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{new Date(campaign.updated_at).toLocaleDateString()}</span>
                </div>
              )}
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500">UUID</span>
                <span className="text-sm font-mono text-gray-900 dark:text-white">{campaign.uuid.slice(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignShowPage;
