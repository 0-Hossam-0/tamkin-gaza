"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface MediaCardProps {
  media: {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
  };
}

export default function MediaCard({ media }: MediaCardProps) {
  const t = useTranslations("mediaSection");

  return (
    <div>
      {/* <DialogTrigger asChild> */}
        <button
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full hover:shadow-xl hover:-translate-y-1 hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 group text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
          aria-label={`${media.title} — ${t("showMedia")}`}
        >
          <div className="p-3 pb-0">
            <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700">
              <Image
                src={media.image}
                alt={media.title}
                fill
                sizes="(max-width: 640px) 85vw, 400px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                {media.date}
              </div>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-grow items-center text-center">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
              {media.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2 flex-grow">
              {media.description}
            </p>

            {/* <span className="w-full py-3 px-4 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-sm rounded-xl group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors mt-auto flex items-center justify-center gap-1.5">
              {t("showMedia")}
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span> */}
          </div>
        </button>
      {/* </DialogTrigger> */}
{/* 
      <DialogContent className="max-w-4xl border-0 p-0 overflow-hidden bg-white dark:bg-gray-900 rounded-[2rem] gap-0">
        <div className="flex flex-col md:flex-row">
          <div className="relative h-[300px] md:h-[500px] w-full md:w-3/5 bg-gray-100 dark:bg-gray-800">
            <Image
              src={media.image}
              alt={media.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-8 md:p-10 w-full md:w-2/5 flex flex-col justify-center bg-gray-50 dark:bg-gray-900">
            <div className="mb-4">
              <span className="text-sm font-bold text-primary-500 mb-2 block">
                {media.date}
              </span>
              <DialogTitle className="text-3xl font-black text-gray-900 dark:text-gray-100 leading-tight">
                {media.title}
              </DialogTitle>
            </div>
            <DialogDescription className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg mt-4">
              {media.description}
            </DialogDescription>
          </div>
        </div>
      </DialogContent> */}
    </div>
  );
}
