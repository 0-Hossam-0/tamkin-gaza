import React from "react";
import Image from "next/image";
import { 
  Heart, 
  Share2, 
  Calendar, 
  Users, 
  Target, 
  ChevronRight, 
  ShieldCheck, 
  ArrowLeft 
} from "lucide-react";
import AppButton from "@/components/buttons/AppButton";
import Link from "next/link";

export default function CampaignDetailsPage({ params }: { params: { id: string, locale: string } }) {
  // In a real app, you'd fetch the campaign data using params.id
  const campaign = {
    title: "Emergency Medical Supplies for Northern Gaza Hospitals",
    description: "Our mission is to provide life-saving medical equipment and supplies to the most affected hospitals in Northern Gaza. With the current crisis, inventories are depleted, and medical staff are working tirelessly with minimal resources. Your donation will directly fund the purchase of surgical kits, antibiotics, bandages, and oxygen cylinders. Every contribution, no matter the size, helps save a life.",
    raised: 45200,
    target: 100000,
    donors: 1420,
    daysLeft: 12,
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80",
    tags: ["Medical", "Emergency", "Gaza"],
    author: "Tamkin Relief Organization",
    verified: true
  };

  const progress = Math.min(100, Math.round((campaign.raised / campaign.target) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <Link href="/campaigns" className="hover:text-indigo-600 transition-colors">Campaigns</Link>
        <ChevronRight className="w-4 h-4 shrink-0" />
        <span className="text-gray-900 font-medium truncate">{campaign.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image & Story */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
            <img 
              src={campaign.image} 
              alt={campaign.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              {campaign.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Organized by</p>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{campaign.author}</h3>
                  {campaign.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-500 fill-current" />}
                </div>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              {campaign.title}
            </h1>

            <div className="prose prose-indigo max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {campaign.description}
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Impact Breakdown</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Direct Medical Aid</h4>
                    <p className="text-xs text-gray-500 mt-1">Funds are used to buy essential supplies within 48 hours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">Emergency Logistics</h4>
                    <p className="text-xs text-gray-500 mt-1">Covers safe transportation and storage of medical kits.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Donation Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm shadow-gray-100/50">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-black text-gray-900 dark:text-white">${campaign.raised.toLocaleString()}</span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">of ${campaign.target.toLocaleString()}</span>
            </div>

            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-6">
              <div 
                className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <Users className="w-4 h-4 text-gray-400 mb-1" />
                <span className="text-lg font-black text-gray-900 dark:text-white">{campaign.donors.toLocaleString()}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Donors</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <Calendar className="w-4 h-4 text-gray-400 mb-1" />
                <span className="text-lg font-black text-gray-900 dark:text-white">{campaign.daysLeft}</span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Days Left</span>
              </div>
            </div>

            <div className="space-y-3">
              <AppButton className="w-full py-4 text-base font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all active:scale-98 flex items-center justify-center">
                Donate Now
              </AppButton>
              <button className="w-full py-3 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-3.5 h-3.5" />
                Share this campaign
              </button>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex -space-x-1.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full border border-white dark:border-gray-800 overflow-hidden bg-gray-100">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Donor" />
                    </div>
                  ))}
                </div>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Join 1,400+ supporters</span>
              </div>
              <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Secure Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
