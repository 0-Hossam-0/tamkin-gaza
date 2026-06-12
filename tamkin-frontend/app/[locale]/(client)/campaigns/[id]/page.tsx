"use client";

import React, { useState, use } from "react";
import { ChevronRight, Users, Calendar, Target, ShieldCheck, Share2, ArrowLeft } from "lucide-react";
import AppButton from "@/components/buttons/AppButton";
import Link from "next/link";
import { useCampaign } from "@/hooks/useCampaigns";
import { useCreatePayment } from "@/hooks/usePayments";
import type { TPaymentProvider } from "@/@types/TPayments";

export default function CampaignDetailsPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id } = use(params);
  const { data: campaign, isLoading, isError, error } = useCampaign(id);
  const createPayment = useCreatePayment();

  const [amount, setAmount] = useState(50);
  const [provider, setProvider] = useState<TPaymentProvider>("STRIPE");

  const handleDonate = () => {
    if (!campaign) return;
    createPayment.mutate(
      { campaignUuid: campaign.uuid, amount, provider },
      {
        onSuccess: (data) => {
          if (data.checkoutUrl) {
            window.open(data.checkoutUrl, "_blank");
          }
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
            <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          </div>
          <div className="lg:col-span-4">
            <div className="h-96 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !campaign) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Campaign Not Found</h2>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">
          {(error as Error)?.message || "This campaign doesn't exist or has been removed."}
        </p>
        <Link href="/campaigns" className="inline-flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline">
          <ArrowLeft className="w-3 h-3" /> Back to Campaigns
        </Link>
      </div>
    );
  }

  const progress = Math.min(100, Math.round((Number(campaign.current_amount) / Number(campaign.target_amount)) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/campaigns" className="hover:text-indigo-600 transition-colors">Campaigns</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-gray-900 font-medium truncate">{campaign.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <img
              src={campaign.image?.[0] || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80"}
              alt={campaign.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full border border-gray-200">
                {campaign.status}
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {campaign.title}
            </h1>

            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {campaign.description}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm shadow-gray-100/50">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-black text-gray-900 dark:text-white">
                ${Number(campaign.current_amount).toLocaleString()}
              </span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                of ${Number(campaign.target_amount).toLocaleString()}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Donation Amount (USD)
                </label>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
                  Payment Provider
                </label>
                <select
                  value={provider}
                  onChange={(e) => setProvider(e.target.value as TPaymentProvider)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="STRIPE">Stripe</option>
                  <option value="PAYMOB">Paymob</option>
                  <option value="FAWRY">Fawry</option>
                </select>
              </div>
            </div>

            <AppButton
              onClick={handleDonate}
              isLoading={createPayment.isPending}
              canSend={amount >= 1}
              className="w-full py-4 text-base font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all active:scale-98 flex items-center justify-center"
            >
              {`Donate $${amount}`}
            </AppButton>

            {createPayment.data?.checkoutUrl && (
              <p className="mt-3 text-xs text-green-600 text-center font-medium">
                Payment initiated! Check the new tab to complete.
              </p>
            )}

            {createPayment.isError && (
              <p className="mt-3 text-xs text-red-500 text-center font-medium">
                {(createPayment.error as Error)?.message || "Payment failed. Try again."}
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
