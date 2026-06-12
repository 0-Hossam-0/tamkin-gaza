"use client";

import React, { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useCreateCampaign } from "@/hooks/useCampaigns";
import toast from "react-hot-toast";

const CampaignCreator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [descEn, setDescEn] = useState("");
  const [descAr, setDescAr] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);

  const { mutate: create, isPending } = useCreateCampaign();

  const handleSubmit = () => {
    if (!titleEn || !descEn || !targetAmount) {
      toast.error("Please fill in all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("title[en]", titleEn);
    formData.append("title[ar]", titleAr);
    formData.append("description[en]", descEn);
    formData.append("description[ar]", descAr);
    formData.append("target_amount", targetAmount);
    if (currentAmount) formData.append("current_amount", currentAmount);
    if (files) {
      Array.from(files).forEach((f) => formData.append("images", f));
    }

    create(formData, {
      onSuccess: () => {
        toast.success("Campaign created!");
        setIsOpen(false);
        setTitleEn(""); setTitleAr(""); setDescEn(""); setDescAr("");
        setTargetAmount(""); setCurrentAmount(""); setFiles(null);
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Campaigns</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage fundraising campaigns</p>
        </div>
        <button onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Campaign</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title (English) *</label>
                  <input type="text" placeholder="Enter English title" value={titleEn} onChange={(e) => setTitleEn(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title (Arabic)</label>
                  <input type="text" placeholder="أدخل العنوان بالعربية" value={titleAr} onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (English) *</label>
                  <textarea placeholder="Enter English description" rows={3} value={descEn} onChange={(e) => setDescEn(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description (Arabic)</label>
                  <textarea placeholder="أدخل الوصف بالعربية" rows={3} value={descAr} onChange={(e) => setDescAr(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Amount ($) *</label>
                  <input type="number" placeholder="10000" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Amount</label>
                  <input type="number" placeholder="0" value={currentAmount} onChange={(e) => setCurrentAmount(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Images</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} className="hidden" id="campaign-images" />
                  <label htmlFor="campaign-images" className="cursor-pointer">
                    <p className="text-sm text-gray-600 dark:text-gray-400"><span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB each)</p>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSubmit} disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
                {isPending ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignCreator;
