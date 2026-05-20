"use client";

import React from "react";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  title,
  excerpt,
  image,
  date,
  author,
  category,
}) => {
  return (
    <Link href={`/blogs/${id}`} className="group block">
      <article className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 transition-all hover:border-indigo-200">
        <div className="relative h-56 w-full overflow-hidden bg-gray-100">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded shadow-sm">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              {author}
            </div>
          </div>

          <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-6 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest group-hover:gap-3 transition-all">
            Read Story
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
