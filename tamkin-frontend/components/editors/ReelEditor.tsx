"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useUpdateReel } from "@/hooks/useReels";
import type { TReels } from "@/@types/TReels";
import toast from "react-hot-toast";

interface ReelEditorProps {
  reel: TReels;
  open: boolean;
  onClose: () => void;
}

const ReelEditor = ({ reel, open, onClose }: ReelEditorProps) => {
  const [title, setTitle] = useState(reel.title || "");
  const [content, setContent] = useState(reel.content || "");
  const { mutate: update, isPending } = useUpdateReel();

  if (!open) return null;

  const handleSubmit = () => {
    update(
      { id: reel.uuid, data: { title, content } },
      {
        onSuccess: () => {
          toast.success("Reel updated!");
          onClose();
        },
        onError: (err) => toast.error(err.message),
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Reel</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
            <input type="text" placeholder="Reel title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
            <input type="text" placeholder="Short description..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
          <button onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={handleSubmit} disabled={isPending}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
            {isPending ? "Updating..." : "Update Reel"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReelEditor;
