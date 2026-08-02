"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CardContent } from "@/components/ui/card";
import { DollarSign, Target, ImageOff } from "lucide-react";
import { Link } from "@/i18n/navigation";

type CampaignCardProps = {
  uuid: string;
  name: string;
  image: string;
  tags: string[];
  status: "active" | "paused" | "completed";
  totalPaid: number;
  requiredAmount: number;
  rating?: number;
};

const dotStyles = {
  active: "bg-emerald-500",
  paused: "bg-amber-500",
  completed: "bg-blue-500",
};

const badgeStyles = {
  active: "bg-emerald-500/90 text-white border-emerald-400/30 backdrop-blur-md",
  paused: "bg-amber-500/90 text-white border-amber-400/30 backdrop-blur-md",
  completed: "bg-blue-500/90 text-white border-blue-400/30 backdrop-blur-md",
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  uuid,
  name,
  image,
  tags,
  status,
  totalPaid,
  requiredAmount,
}) => {
  const t = useTranslations("campaignCard");
  const progress = Math.min((totalPaid / requiredAmount) * 100, 100);
  const remaining = Math.max(requiredAmount - totalPaid, 0);
  const [imgBroken, setImgBroken] = useState(false);

  return (
    <div className="flex items-center justify-center p-0 m-0">
      <style>{`
        @keyframes customFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes customScaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-card-fade { animation: customFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-image-scale { animation: customScaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
        .animate-stagger-1 { animation: customFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards; }
        .animate-stagger-2 { animation: customFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; }
        .animate-stagger-3 { animation: customFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; }
        .animate-stagger-4 { animation: customFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; }
      `}</style>

      <div className="w-full max-w-sm rounded-3xl overflow-hidden border border-gray-200/70 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/10 opacity-0 animate-card-fade">
        <Link
          href={`/campaigns/${uuid}`}
          className="block group focus-visible:outline-none"
        >
          <div className="relative w-full h-56 overflow-hidden rounded-t-3xl opacity-0 animate-image-scale block isolate p-0 m-0 leading-[0]">
            {imgBroken ? (
              <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center gap-2">
                <ImageOff className="w-10 h-10 text-gray-300 dark:text-gray-600" />
                <span className="text-xs text-gray-400 font-medium">Image unavailable</span>
              </div>
            ) : (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                onError={() => setImgBroken(true)}
                className="object-cover rounded-t-3xl transition-transform duration-700 group-hover:scale-105 p-0 m-0"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            <div className="absolute left-4 top-4 z-10">
              <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold shadow-lg ${badgeStyles[status]}`}>
                <span className={`h-2 w-2 rounded-full ${dotStyles[status]}`} />
                {t(status)}
              </span>
            </div>

            <div className="absolute bottom-4 right-4 z-10">
              <div className="rounded-full bg-white/95 px-4 py-2 shadow-xl backdrop-blur-md dark:bg-gray-900/90">
                <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {Math.round(progress)}%
                </p>
              </div>
            </div>
          </div>

          <CardContent className="p-6 pt-5">
            {tags.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2 opacity-0 animate-stagger-1">
                {tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-primary-50 px-3 py-1 text-[11px] font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-gray-900 transition-colors duration-300 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400 opacity-0 animate-stagger-2">
              {name}
            </h3>

            <div className="mt-4 opacity-0 animate-stagger-3">
              <div className="mb-1.5 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>{t("fundingProgress")}</span>
                <span className="text-primary-600 dark:text-primary-400">{Math.round(progress)}%</span>
              </div>

              <div className="relative h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-primary-700  transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-1.5 flex items-center justify-between text-[11px] text-gray-400">
                <span>${remaining.toLocaleString()} {t("left")}</span>
                <span>${totalPaid.toLocaleString()} {t("raised")}</span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 opacity-0 animate-stagger-4">
              <div className="rounded-xl bg-gray-50/80 p-3 transition-all duration-300 hover:scale-[1.02] group-hover:bg-primary-50/40 dark:bg-gray-800/50 dark:group-hover:bg-primary-950/20">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{t("raisedLabel")}</span>
                </div>
                <p className="mt-1 text-base font-bold text-gray-900 dark:text-white">
                  ${totalPaid.toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50/80 p-3 transition-all duration-300 hover:scale-[1.02] group-hover:bg-primary-50/40 dark:bg-gray-800/50 dark:group-hover:bg-primary-950/20">
                <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                  <Target className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{t("goalLabel")}</span>
                </div>
                <p className="mt-1 text-base font-bold text-gray-900 dark:text-white">
                  ${requiredAmount.toLocaleString()}
                </p>
              </div>
            </div>

          </CardContent>
        </Link>
      </div>
    </div>
  );
};

export default CampaignCard;
