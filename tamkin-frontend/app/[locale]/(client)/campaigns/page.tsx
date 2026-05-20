"use client";

import React, { useState } from "react";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const CATEGORIES = ["All", "Medical", "Food", "Water", "Shelter", "Education"];

const MOCK_CAMPAIGNS = [
  {
    id: "1",
    name: "Emergency Medical Supplies for Northern Gaza",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    tags: ["Medical", "Emergency"],
    status: "active" as const,
    totalPaid: 45000,
    requiredAmount: 100000,
  },
  {
    id: "2",
    name: "Hot Meals for Displaced Families",
    image: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=600&auto=format&fit=crop&q=80",
    tags: ["Food", "Essential"],
    status: "active" as const,
    totalPaid: 12000,
    requiredAmount: 30000,
  },
  {
    id: "3",
    name: "Clean Water Tanker Distribution",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&auto=format&fit=crop&q=80",
    tags: ["Water", "Health"],
    status: "active" as const,
    totalPaid: 8000,
    requiredAmount: 15000,
  },
  {
    id: "4",
    name: "Winter Tent Insulation Project",
    image: "https://images.unsplash.com/photo-1504159506876-f8338247a14a?w=600&auto=format&fit=crop&q=80",
    tags: ["Shelter", "Winter"],
    status: "active" as const,
    totalPaid: 25000,
    requiredAmount: 50000,
  },
  {
    id: "5",
    name: "Mobile School Kits for Children",
    image: "https://media.istockphoto.com/id/1285484294/photo/little-child-boy-hiding-in-old-vintage-suitcase-in-the-attic.webp?a=1&b=1&s=612x612&w=0&k=20&c=cM2PBmrv26qpy3evJcpjEtRwA8gmf_P3mo4S7QtjU6I=",
    tags: ["Education", "Kids"],
    status: "active" as const,
    totalPaid: 5000,
    requiredAmount: 20000,
  },
];

export default function CampaignsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
    const matchesCategory = activeCategory === "All" || campaign.tags.includes(activeCategory);
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">
          Active Campaigns
        </h1>
        <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
          Support our ongoing humanitarian efforts in Gaza
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-12">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeCategory === category
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white dark:bg-gray-800 text-gray-400 border-gray-100 dark:border-gray-800 hover:border-indigo-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Grid */}
      {filteredCampaigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} {...campaign} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <SlidersHorizontal className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-400 font-bold uppercase tracking-widest">No campaigns found matching your filters</p>
          <button 
            onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
            className="mt-4 text-sm font-black text-indigo-600 uppercase tracking-widest hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
