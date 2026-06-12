"use client";

import React from "react";
import { ArrowLeft, Play } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useReel } from "@/hooks/useReels";
import { ReelDetailSkeleton } from "@/components/skeletons/ReelSkeleton";

const ReelShowPage = () => {
  const { id, locale } = useParams();
  const { data: reel, isLoading } = useReel(id as string);

  if (isLoading) return <ReelDetailSkeleton />;
  if (!reel) return <div className="text-center py-20 text-gray-500">Reel not found</div>;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href={`/${locale}/admin/reals`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{reel.title || "Untitled Reel"}</h2>
            <p className="text-sm text-gray-500">Reel Details</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">
          <Play className="w-4 h-4" /> <span>Watch Reel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-black rounded-xl overflow-hidden aspect-9/16 relative flex items-center justify-center group shadow-md border border-gray-800">
            {reel.fileUrl ? (
              <video src={reel.fileUrl} className="w-full h-full object-cover" controls />
            ) : (
              <div className="text-gray-500 text-sm">No video available</div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded">{reel.fileName}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500 block mb-1">Title</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{reel.title || "—"}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 block mb-1">Description</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">{reel.content || "—"}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Uploaded by</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{reel.user?.fullName || "Unknown"}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block mb-1">Upload Date</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{new Date(reel.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelShowPage;
