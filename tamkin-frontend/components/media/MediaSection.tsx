"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import MediaCard from "./MediaCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const mockMedia = [
  {
    id: 1,
    title: "Food Distribution in Northern Gaza",
    description:
      "Our teams on the ground successfully distributing hot meals to over 500 displaced families residing in temporary shelters.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
    date: "Oct 15, 2023",
  },
  {
    id: 2,
    title: "Medical Supplies Delivery",
    description:
      "Arrival of essential medical supplies and emergency first aid kits to the main hospital to support the overworked medical staff.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    date: "Oct 18, 2023",
  },
  {
    id: 3,
    title: "Winter Relief Campaign",
    description:
      "Providing warm winter clothes, thick blankets, and portable heaters for the upcoming harsh winter season.",
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601020f1b?q=80&w=2070&auto=format&fit=crop",
    date: "Nov 02, 2023",
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    description:
      "Setting up advanced water purification stations across several affected areas to ensure access to clean and safe drinking water.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
    date: "Nov 10, 2023",
  },
  {
    id: 5,
    title: "Emergency Shelter Provision",
    description:
      "Providing high-quality temporary tents and sturdy shelter materials for individuals whose homes have been destroyed.",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    date: "Nov 15, 2023",
  },
];

const AUTOPLAY_MS = 4000;
const SCROLL_STEP = 420;

export default function MediaSection() {
  const t = useTranslations("mediaSection");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Autoplay — paused on hover, skipped for reduced motion.
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (isHovering || prefersReducedMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const isAtRight =
        Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth;
      el.scrollTo({
        left: isAtRight ? 0 : el.scrollLeft + SCROLL_STEP,
        behavior: "smooth",
      });
    }, AUTOPLAY_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovering]);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -SCROLL_STEP : SCROLL_STEP,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full py-16">
      <div className="flex items-end justify-between mb-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
            {t("heading")}
          </h2>
          <p className="mt-2 text-sm font-bold uppercase tracking-widest text-gray-400">
            {t("subtitle")}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            aria-label={t("scrollLeft") ?? "Scroll left"}
            className="p-3.5 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:-translate-x-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label={t("scrollRight") ?? "Scroll right"}
            className="p-3.5 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hover:translate-x-1 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-gray-200" />
          </button>
        </div>
      </div>

      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
      >
        <div
          ref={scrollRef}
          role="region"
          aria-label={t("heading")}
          className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-6 lg:px-8 pb-8 pt-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {mockMedia.map((media) => (
            <div
              key={media.id}
              className="snap-center shrink-0 w-[85vw] sm:w-[400px]"
            >
              <MediaCard media={media} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
