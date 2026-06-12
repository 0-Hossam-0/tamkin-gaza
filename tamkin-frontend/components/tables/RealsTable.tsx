"use client";

import React, { useMemo, useState } from "react";
import {
  Table, TableHeader, TableRow, TableHead, TableBody, TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Search, Edit, Trash2 } from "lucide-react";
import { useReels, useDeleteReel } from "@/hooks/useReels";
import { ReelTableSkeleton } from "../skeletons/ReelSkeleton";
import ReelEditor from "../editors/ReelEditor";
import type { TReels } from "@/@types/TReels";
import toast from "react-hot-toast";

const RealsTable = () => {
  const [search, setSearch] = useState("");
  const [editingReel, setEditingReel] = useState<TReels | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { data: paginated, isLoading } = useReels(1, 50);
  const { mutate: deleteReel, isPending: isDeleting } = useDeleteReel();

  const reels = paginated?.items || [];

  const filtered = useMemo(() => {
    return reels.filter((r) =>
      [r.title, r.content, r.fileUrl].join(" ").toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, reels]);

  function copy(url: string) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  }

  function handleDelete(id: string) {
    deleteReel(id, {
      onSuccess: () => { toast.success("Reel deleted!"); setDeletingId(null); },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <>
      <Card className="rounded-2xl border-none shadow-none overflow-hidden">
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-sm font-semibold">Reels</h2>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
            <Input className="pl-7 h-8 text-xs" placeholder="Search reels..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {isLoading ? (
          <div className="p-4"><ReelTableSkeleton /></div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Title</TableHead>
                <TableHead className="text-xs">Description</TableHead>
                <TableHead className="text-xs">URL</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((reel) => (
                <TableRow key={reel.uuid}>
                  <TableCell className="text-sm font-medium">{reel.title || "Untitled"}</TableCell>
                  <TableCell className="text-xs text-gray-500 max-w-[250px] truncate">{reel.content || "—"}</TableCell>
                  <TableCell className="text-xs text-blue-600 truncate max-w-[200px]">{reel.fileUrl}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-end">
                      <Button size="icon" variant="ghost" onClick={() => copy(reel.fileUrl)}><Copy className="w-3 h-3" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => window.open(reel.fileUrl, "_blank")}><ExternalLink className="w-3 h-3" /></Button>
                      <Button size="icon" variant="ghost" onClick={() => setEditingReel(reel)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setDeletingId(reel.uuid)}>
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {editingReel && (
        <ReelEditor
          reel={editingReel}
          open={!!editingReel}
          onClose={() => setEditingReel(null)}
        />
      )}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Reel</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete this reel? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button onClick={() => handleDelete(deletingId)} disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50">
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RealsTable;
