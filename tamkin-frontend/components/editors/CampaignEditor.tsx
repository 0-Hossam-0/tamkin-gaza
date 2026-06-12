"use client";

import React, { useState, useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useUpdateCampaign } from "@/hooks/useCampaigns";
import type { TCampaign } from "@/@types/TCampaign";
import toast from "react-hot-toast";

const LANGUAGES = [
  { key: "en", label: "English" },
  { key: "ar", label: "Arabic" },
  { key: "tr", label: "Turkish" },
  { key: "ur", label: "Urdu" },
];

function extractObj(raw: unknown): Record<string, string> {
  if (!raw) return { en: "", ar: "", tr: "", ur: "" };
  if (typeof raw === "object") {
    return { en: "", ar: "", tr: "", ur: "", ...(raw as Record<string, string>) };
  }
  try {
    const parsed = JSON.parse(raw as string);
    if (typeof parsed === "object") {
      return { en: "", ar: "", tr: "", ur: "", ...parsed };
    }
  } catch {}
  return { en: raw as string, ar: "", tr: "", ur: "" };
}

interface CampaignEditorProps {
  campaign: TCampaign;
  open: boolean;
  onClose: () => void;
}

const CampaignEditor = ({ campaign, open, onClose }: CampaignEditorProps) => {
  const [title, setTitle] = useState<Record<string, string>>({ en: "", ar: "", tr: "", ur: "" });
  const [description, setDescription] = useState<Record<string, string>>({ en: "", ar: "", tr: "", ur: "" });
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const { mutate: update, isPending } = useUpdateCampaign();

  useEffect(() => {
    if (open) {
      setTitle(extractObj(campaign.title));
      setDescription(extractObj(campaign.description));
      setTargetAmount(String(campaign.target_amount ?? ""));
      setCurrentAmount(String(campaign.current_amount ?? ""));
      setFiles(null);
    }
  }, [open, campaign]);

  const handleSubmit = () => {
    const fd = new FormData();
    LANGUAGES.forEach(({ key }) => {
      if (title[key]) fd.append(`title[${key}]`, title[key]);
      if (description[key]) fd.append(`description[${key}]`, description[key]);
    });
    if (targetAmount) fd.append("target_amount", targetAmount);
    if (currentAmount) fd.append("current_amount", currentAmount);
    if (files) {
      Array.from(files).forEach((f) => fd.append("images", f));
    }

    update(
      { id: campaign.uuid, data: fd },
      {
        onSuccess: () => {
          toast.success("Campaign updated!");
          onClose();
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Campaign</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {LANGUAGES.map(({ key, label }) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title ({label}){key === "en" ? " *" : ""}
                </label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title[key]}
                  onChange={(e) => setTitle({ ...title, [key]: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description ({label})
                </label>
                <textarea
                  rows={2}
                  placeholder="Enter description"
                  value={description[key]}
                  onChange={(e) => setDescription({ ...description, [key]: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Amount ($)
              </label>
              <input
                type="number"
                placeholder="50000"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Current Amount
              </label>
              <input
                type="number"
                placeholder="0"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Images</label>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <input type="file" multiple accept="image/*" onChange={(e) => setFiles(e.target.files)} className="hidden" id="edit-campaign-images" />
              <label htmlFor="edit-campaign-images" className="cursor-pointer">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF</p>
              </label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
            {isPending ? "Updating..." : "Update Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignEditor;
