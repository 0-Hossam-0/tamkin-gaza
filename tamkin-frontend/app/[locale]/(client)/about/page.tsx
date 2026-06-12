"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSystemHealth } from "@/hooks/useSystemHealth";

export default function AboutPage() {
  const { data, isLoading } = useSystemHealth();

  if (isLoading || !data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-40 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{data.about.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-7">
          <p>{data.about.description}</p>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{data.mission.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            {data.mission.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 italic">
            {data.mission.statement}
          </p>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{data.features.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-muted-foreground">
            {data.features.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-indigo-600 dark:text-indigo-400 italic">
            {data.features.statement}
          </p>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{data.why_tamkin.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-7">
          <div>
            <p className="font-semibold mb-2">What we provide:</p>
            <ul className="space-y-2">
              {data.why_tamkin.before.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-indigo-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold mb-2">
              Gaza Reality ({data.why_tamkin.gaza_reality.amputees_count.toLocaleString()} amputees):
            </p>
            <ul className="space-y-2">
              {data.why_tamkin.gaza_reality.issues.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-red-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm font-semibold text-indigo-600 dark:text-indigo-400 italic">
            {data.why_tamkin.summary}
          </p>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">{data.stories.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {data.stories.founders.map((founder, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
              <div className="w-24 h-24 rounded-full bg-indigo-100 shrink-0 overflow-hidden border border-white dark:border-gray-800 shadow-sm mx-auto sm:mx-0">
                <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{founder.name}</h3>
                <p className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">{founder.role} &middot; {founder.location}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{founder.story}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
