"use client";

import React from "react";
import { useSystemHealth } from "@/hooks/useSystemHealth";

export default function StoriesPage() {
  const { data, isLoading } = useSystemHealth();

  if (isLoading || !data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3">
          {data.stories.title}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.stories.founders.map((founder, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
              <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{founder.name}</h3>
              <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-4">
                {founder.role} &middot; {founder.location}
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm line-clamp-5">
                {founder.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
