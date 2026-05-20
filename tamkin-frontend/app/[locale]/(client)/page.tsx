"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Slider from "@/components/ui/Slider";
import CampaignCard from "@/components/campaigns/CampaignCard";
import AppButton from "@/components/buttons/AppButton";
import ReelsSection from "@/components/reels/ReelsSection";

export default function Home() {
  const t = useTranslations("homePage");
  return (
    <div className="py-4">

      <ReelsSection />
      <div className="mt-2 sm:mt-6 md:mt-10">
        <Slider
          images={[
            "https://images.unsplash.com/photo-1730382625230-3756013c515c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXN0YWJsaXNofGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1730382625230-3756013c515c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXN0YWJsaXNofGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1730382625230-3756013c515c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXN0YWJsaXNofGVufDB8fDB8fHww",
            "https://images.unsplash.com/photo-1730382625230-3756013c515c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXN0YWJsaXNofGVufDB8fDB8fHww",
          ]}
          height="400"
          width="1200"
          spaceBetween={20}
          autoplay={{ delay: 3000 }}
          slidesPerView={1}
          pagination={{ clickable: true }}
          loop
        />
      </div>
      <div className="flex items-center justify-between mt-6">
        <h2 className="text-2xl font-bold">Campaigns</h2>
        <AppButton variant="outline">View All</AppButton>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <CampaignCard
            key={i}
            name="Save the Children"
            image="https://media.istockphoto.com/id/1285484294/photo/little-child-boy-hiding-in-old-vintage-suitcase-in-the-attic.webp?a=1&b=1&s=612x612&w=0&k=20&c=cM2PBmrv26qpy3evJcpjEtRwA8gmf_P3mo4S7QtjU6I="
            tags={["Education", "Kids", "Charity"]}
            status="active"
            totalPaid={5000}
            requiredAmount={10000}
            rating={5}
          />
        ))}
      </div>
    </div>
  );
}
