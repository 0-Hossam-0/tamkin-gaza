"use client";

import React from "react";
import Image from "next/image";
import { Calendar, User, ChevronLeft, Share2, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function BlogDetailPage({ params }: { params: { id: string, locale: string } }) {
  // Mock data for the specific blog post
  const blog = {
    title: "Restoring Hope: The Impact of Medical Aid in Northern Gaza",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80",
    date: "Oct 24, 2024",
    author: "Dr. Sarah Ahmed",
    category: "Field Update",
    content: `
      The healthcare system in Northern Gaza is facing unprecedented challenges. Hospitals are operating at several times their capacity, with critical shortages of basic supplies and electricity. Yet, amidst this crisis, there are stories of incredible resilience and hope.

      Our latest shipment of medical supplies reached Al-Shifa hospital last week, providing essential surgical kits and antibiotics. Dr. Ahmed, our lead medical coordinator, reports that these supplies have already been used in over 100 life-saving procedures.

      "Every kit represents a life that can be saved," says Dr. Ahmed. "When we receive these supplies, the atmosphere in the operating theater changes. There's a renewed sense of possibility."

      The impact goes beyond just the immediate medical treatment. It provides hope to the community that they are not forgotten. The presence of international aid, delivered by local hands, strengthens the social fabric of the displaced communities.

      However, the need remains vast. We are currently preparing our next convoy, which will focus on pediatric care and maternal health supplies.
    `,
    tags: ["Healthcare", "Emergency Aid", "Humanitarian", "Gaza Hospitals"]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link 
        href="/blogs" 
        className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors mb-8"
      >
        <ChevronLeft className="w-3 h-3" />
        Back to Stories
      </Link>

      <div className="mb-8">
        <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm mb-4 inline-block">
          {blog.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-6">
          {blog.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            {blog.date}
          </div>
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            {blog.author}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </button>
            <button className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
              <MessageCircle className="w-3.5 h-3.5" />
              Comments
            </button>
          </div>
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 bg-gray-100">
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="prose prose-indigo dark:prose-invert max-w-none">
        {blog.content.split('\n').map((paragraph, i) => (
          paragraph.trim() && (
            <p key={i} className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
              {paragraph.trim()}
            </p>
          )
        ))}
      </div>

      <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap gap-2">
          {blog.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 text-[9px] font-bold text-gray-400 uppercase tracking-widest rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Author Box */}
      <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 flex items-center gap-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center shrink-0 overflow-hidden border border-white dark:border-gray-800 shadow-sm">
          <img src="https://i.pravatar.cc/100?img=32" alt={blog.author} />
        </div>
        <div>
          <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider mb-1">{blog.author}</h4>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Medical Coordinator, Tamkin Relief</p>
        </div>
      </div>
    </div>
  );
}
