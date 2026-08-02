"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop",
    title: "Food Donation",
    description: "Providing meals and essential supplies to families in need.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    title: "Helping Communities",
    description:
      "Volunteers working together to support underprivileged communities.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1469571486292-b53601020f1b?q=80&w=2070&auto=format&fit=crop",
    title: "Support & Care",
    description:
      "Every contribution helps bring hope to those facing hardship.",
  },
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Check direction for RTL support from document or html dir if possible
  // A simple way is to use inline style for transform to move the exact percentage
  const slideWidth = 100 / slides.length;
  // in LTR: translate -currentIndex * slideWidth. In RTL: translate currentIndex * slideWidth.
  // We'll use `dir="ltr"` on the slider container to ensure it behaves consistently and just flip the flex-direction if needed,
  // or simply rely on standard CSS. If the page is RTL, flex lays out items right-to-left.
  // So moving to index 1 (which is left of index 0) means translating right (positive %).
  const isRTL =
    typeof window !== "undefined"
      ? document.documentElement.dir === "rtl"
      : false;

  return (
    <div className="relative w-full overflow-hidden min-h-[50vh] rounded-xl bg-[#f7ecdd]">
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(${isRTL ? currentIndex * slideWidth : -currentIndex * slideWidth}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0"
            style={{ width: `${slideWidth}%` }}
          >
            <div className="flex flex-col md:grid grid-cols-2 h-full">
              {/* Left Side */}
              <div className="flex items-center justify-center p-8 bg-muted/20">
                <div className="relative h-[400px] w-full max-w-sm overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Right Side */}
              <div className="flex flex-col justify-center gap-10 p-8">
                <h2 className="my-8 text-6xl font-bold">{slide.title}</h2>

                <p className="leading-7 text-muted-foreground text-3xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white flex items-center justify-center shadow-md rounded-r-2xl transition-all z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/90 hover:bg-white flex items-center justify-center shadow-md rounded-l-2xl transition-all z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
}
