"use client";

import React, { useState } from "react";
import { Plus, X, Upload } from "lucide-react";
import { useUploadReel } from "@/hooks/useReels";
import toast from "react-hot-toast";

const ReelCreator = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { mutate: upload, isPending } = useUploadReel();

  const handleSubmit = () => {
    if (!file) {
      toast.error("Please select a video file");
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    if (title) fd.append("title", title);
    if (content) fd.append("content", content);
    upload(fd, {
      onSuccess: () => {
        toast.success("Reel uploaded!");
        setOpen(false);
        setTitle("");
        setContent("");
        setFile(null);
      },
      onError: (err) => toast.error(err.message),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Reels</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage video reels</p>
        </div>
        <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Reel</span>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create Reel</h3>
              <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video File *</label>
                <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input type="file" accept="video/mp4,video/mkv,video/webm,video/avi,video/quicktime,video/x-m4v"
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} className="hidden" id="reel-video" />
                  <label htmlFor="reel-video" className="cursor-pointer">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">MP4, MKV, WebM, AVI (max. 100MB)</p>
                  </label>
                </div>
                {file && <p className="text-xs text-gray-500 mt-1">{file.name}</p>}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
              <button onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={handleSubmit} disabled={isPending || !file}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors disabled:opacity-50">
                {isPending ? "Uploading..." : "Create Reel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelCreator;
