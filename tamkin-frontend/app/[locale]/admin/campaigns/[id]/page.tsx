import React from 'react';
import { ArrowLeft, Edit, Calendar, Users, Target, Activity } from 'lucide-react';
import Link from 'next/link';

const CampaignShowPage = ({ params }: { params: { id: string, locale: string } }) => {
  // In a real app, fetch campaign data based on params.id
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Link href={`/${params.locale}/admin/campaigns`} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Medical Supplies for Gaza</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Campaign Details</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <Edit className="w-4 h-4" />
          <span>Edit Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
              Providing essential medical supplies to hospitals in need. This campaign aims to deliver immediate relief and restock critical inventory for emergency rooms and intensive care units facing shortages.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Target className="w-4 h-4 text-indigo-500" />
                  Goal
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">$50,000</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  Raised
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">$35,000</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  Donors
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">1,250</div>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  Days Left
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">35</div>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">70%</span>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div className="bg-indigo-600 dark:bg-indigo-500 h-3 rounded-full transition-all duration-500" style={{ width: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Details</h3>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                <span className="px-2.5 py-0.5 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full">Active</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">Start Date</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Jan 01, 2024</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">End Date</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">Jun 01, 2024</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">ID</span>
                <span className="text-sm font-mono text-gray-900 dark:text-white">CMP-8472</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignShowPage;
