"use client";

import React from "react";
import {
  HeartHandshake,
  Target,
  ShieldCheck,
  Globe,
  HandHelping,
  Users,
  TrendingUp,
  Building,
  Stethoscope,
  BookOpen,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useSystemHealth } from "@/hooks/useSystemHealth";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className={className}>{children}</div>
    </div>
  );
}

const featureIcons: Record<string, React.ReactNode> = {
  "health": <Stethoscope className="w-6 h-6" />,
  "education": <BookOpen className="w-6 h-6" />,
  "infrastructure": <Building className="w-6 h-6" />,
  "development": <TrendingUp className="w-6 h-6" />,
  "community": <Users className="w-6 h-6" />,
  "support": <HandHelping className="w-6 h-6" />,
};

function getIcon(key: string) {
  const lower = key.toLowerCase();
  for (const [kw, icon] of Object.entries(featureIcons)) {
    if (lower.includes(kw)) return icon;
  }
  return <ShieldCheck className="w-6 h-6" />;
}

function FeatureCard({ title, index }: { title: string; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-500/5 to-transparent rounded-bl-[4rem]" />
      <div className="relative">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300">
          {getIcon(title)}
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">{title}</h3>
      </div>
    </div>
  );
}

function FounderCard({ founder, index }: { founder: { image: string; name: string; role: string; location: string; story: string }; index: number }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:border-primary-200 dark:hover:border-primary-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-primary-50 dark:ring-primary-500/10">
            <img
              src={founder.image}
              alt={founder.name}
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).parentElement!.classList.add("bg-gray-100", "dark:bg-gray-800"); }}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-white">
          {founder.name}
        </h3>
        <p className="text-xs font-bold uppercase tracking-widest text-primary-600 dark:text-primary-400 mt-1">
          {founder.role} &middot; {founder.location}
        </p>
        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
          {founder.story}
        </p>
      </div>
    </div>
  );
}

function StatCard({ value, label, suffix = "" }: { value: string | number; label: string; suffix?: string }) {
  return (
    <div className="rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-100 dark:border-gray-700/50 p-5 text-center hover:shadow-md transition-shadow">
      <div className="text-3xl font-black text-primary-600 dark:text-primary-400">
        {typeof value === "number" ? value.toLocaleString() : value}
        {suffix}
      </div>
      <div className="mt-1 text-xs font-bold uppercase tracking-widest text-gray-400">
        {label}
      </div>
    </div>
  );
}

const missionIcons = [HeartHandshake, Target, Globe, ShieldCheck];

export default function AboutPage() {
  const { data, isLoading } = useSystemHealth();

  if (isLoading || !data) {
    return (
      <div className="min-h-screen">
        <div className="h-[50vh] bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20 animate-pulse" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-56 bg-gray-100 dark:bg-gray-800 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/80 via-white to-white dark:from-primary-950/20 dark:via-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-200/30 dark:bg-primary-600/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-amber-200/20 dark:bg-amber-600/5 blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36">
          <RevealSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
              <HeartHandshake className="w-3.5 h-3.5" />
              About Tamkin
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] tracking-tight">
              {data.about.title}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {data.about.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/campaigns"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-600 text-white font-bold text-sm hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/20"
              >
                Support a campaign
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── MISSION ─── */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <RevealSection delay={100}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest">
                  <Target className="w-3.5 h-3.5" />
                  {data.mission.title}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.mission.statement}
                </p>
              </div>
            </RevealSection>
            <RevealSection delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data.mission.items.map((item, i) => {
                  const Icon = missionIcons[i % missionIcons.length];
                  return (
                    <div
                      key={i}
                      className="group rounded-xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700"
                    >
                      <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">
                        {item}
                      </p>
                    </div>
                  );
                })}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
      </div>

      {/* ─── FEATURES ─── */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                {data.features.title}
              </div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.features.statement}
              </p>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.items.map((item, i) => (
              <FeatureCard key={i} title={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY TAMKIN ─── */}
      <section className="relative bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/30 dark:to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-4">
                <HandHelping className="w-3.5 h-3.5" />
                {data.why_tamkin.title}
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <RevealSection delay={100}>
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-emerald-500" />
                  What We Provide
                </h3>
                <ul className="space-y-4">
                  {data.why_tamkin.before.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 shrink-0">
                        <span className="text-xs font-black">&check;</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>

            <RevealSection delay={200}>
              <div className="rounded-2xl border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 rounded-full bg-rose-500" />
                  Gaza Reality
                </h3>
                <div className="mb-6">
                  <StatCard
                    value={data.why_tamkin.gaza_reality.amputees_count}
                    label="Amputees in Gaza"
                  />
                </div>
                <ul className="space-y-4">
                  {data.why_tamkin.gaza_reality.issues.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-0.5 flex items-center justify-center w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-600 shrink-0">
                        <span className="text-xs font-black">!</span>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          </div>

          <RevealSection delay={300}>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-primary-50 dark:bg-primary-500/5 border border-primary-100 dark:border-primary-800/30">
                <Quote className="w-5 h-5 text-primary-400 shrink-0" />
                <p className="text-sm font-medium text-primary-700 dark:text-primary-300 italic">
                  {data.why_tamkin.summary}
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ─── FOUNDERS / STORIES ─── */}
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <RevealSection>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-4">
                <Users className="w-3.5 h-3.5" />
                {data.stories.title}
              </div>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.stories.founders.map((founder, i) => (
              <FounderCard key={i} founder={founder} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
