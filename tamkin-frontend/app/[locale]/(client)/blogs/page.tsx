"use client";

import React from "react";
import BlogCard from "@/components/blogs/BlogCard";

const MOCK_BLOGS = [
  {
    id: "1",
    title: "Restoring Hope: The Impact of Medical Aid in Northern Gaza",
    excerpt: "Despite the immense challenges, our medical teams continue to provide life-saving care. Read about the stories of resilience from the frontlines of healthcare in Gaza.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop&q=80",
    date: "Oct 24, 2024",
    author: "Dr. Sarah Ahmed",
    category: "Field Update",
  },
  {
    id: "2",
    title: "Feeding the Future: Our Community Kitchen Initiative",
    excerpt: "Thousands of families are receiving hot meals daily through our expanded kitchen network. Discover how your support is making a difference at the dinner table.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    date: "Oct 20, 2024",
    author: "Omar Khalid",
    category: "Impact",
  },
  {
    id: "3",
    title: "Water Crisis in Gaza: A Race Against Time",
    excerpt: "Clean water is becoming a luxury in many districts. We explore the current state of water infrastructure and our efforts to distribute safe drinking water.",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80",
    date: "Oct 15, 2024",
    author: "Mariam Hassan",
    category: "Analysis",
  },
  {
    id: "4",
    title: "Educational Continuity in Times of Crisis",
    excerpt: "Children are finding ways to learn even in displacement camps. We highlight the mobile education kits that are keeping dreams alive for thousands of students.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
    date: "Oct 10, 2024",
    author: "Prof. Yusuf Al-Amin",
    category: "Education",
  },
];

export default function BlogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-3">
          Our Stories
        </h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest max-w-2xl mx-auto">
          Updates, field reports, and impact stories from our humanitarian missions in Gaza.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {MOCK_BLOGS.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>

      {/* Newsletter simple box */}
      <div className="mt-20 p-10 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center">
        <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-wider mb-2">Subscribe to Updates</h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-6">Get the latest stories delivered to your inbox</p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none"
          />
          <button className="px-6 py-3 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-indigo-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
