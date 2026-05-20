import React from 'react';
import { ArrowLeft, Edit, Play, Heart, MessageCircle, Share2, BarChart2 } from 'lucide-react';
import Link from 'next/link';

const ReelShowPage = ({ params }: { params: { id: string, locale: string } }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/admin/reals`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Relief Distribution - North Gaza</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Reel Details</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm">
            <Play className="w-4 h-4" />
            <span>Watch Full Reel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-black rounded-xl overflow-hidden aspect-9/16 relative flex items-center justify-center group shadow-md border border-gray-800">
            <img 
              src="https://images.unsplash.com/photo-1593113565253-15df45451e5e?auto=format&fit=crop&q=80&w=400&h=700" 
              alt="Reel thumbnail" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
                <Play className="w-8 h-8 ml-1" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
              <span className="px-2 py-1 text-xs font-medium bg-indigo-600 text-white rounded">Published</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
                  <Play className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12.5K</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Views</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">3,402</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Likes</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">845</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Comments</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2">
                  <Share2 className="w-5 h-5" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">1,120</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Shares</div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 border-t border-gray-100 dark:border-gray-700 pt-6">Details</h3>
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Title</span>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Relief Distribution - North Gaza</p>
              </div>
              <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Description</span>
                <p className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  A short documentary style reel showing the recent distribution of medical and food supplies to displaced families in northern areas. Thank you to all our donors for making this possible. Link in bio to contribute.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Platform</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 text-xs font-medium bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400 rounded-full">Instagram</span>
                    <span className="px-2 py-1 text-xs font-medium bg-black text-white dark:bg-white dark:text-black rounded-full">TikTok</span>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Upload Date</span>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Mar 15, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelShowPage;
