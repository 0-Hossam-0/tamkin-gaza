"use client";

import React, { useState } from "react";
import { TCampaign } from "@/@types/TCampaign";
import { Eye, Edit, Trash2, Search, Filter } from "lucide-react";
import PaginationCard from "../common/PaginationCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCampaigns, useDeleteCampaign } from "@/hooks/useCampaigns";
import { CampaignTableSkeleton } from "../skeletons/CampaignSkeleton";
import CampaignEditor from "../editors/CampaignEditor";
import toast from "react-hot-toast";

const CampaignsTable = () => {
  const { locale } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCampaign, setEditingCampaign] = useState<TCampaign | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const itemsPerPage = 5;

  const { data: campaigns, isLoading } = useCampaigns();
  const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteCampaign();

  const extractStr = (v: unknown): string =>
    typeof v === "string" ? v : typeof v === "object" && v ? Object.values(v).join(" ") : "";

  const filteredData = (campaigns || []).filter(
    (c: TCampaign) =>
      extractStr(c.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
      extractStr(c.description).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusBadge = (status: TCampaign["status"]) => {
    const styles: Record<string, string> = {
      ACTIVE:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
      DRAFT:
        "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
      COMPLETED:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
      CANCELED:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 border-rose-200 dark:border-rose-500/30",
    };
    return (
      <span
        className={`px-2.5 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.DRAFT}`}
      >
        {status}
      </span>
    );
  };

  function handleDelete(id: string) {
    deleteCampaign(id, {
      onSuccess: () => { toast.success("Campaign deleted!"); setDeletingId(null); },
      onError: (err) => toast.error(err.message),
    });
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-gray-200"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full sm:w-auto">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-6">
              <CampaignTableSkeleton />
            </div>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold">Campaign</th>
                  <th className="px-6 py-4 font-semibold">Progress</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {paginatedData.map((campaign: TCampaign) => {
                  const target = Number(campaign.target_amount);
                  const current = Number(campaign.current_amount);
                  const progress = target > 0 ? Math.min(100, Math.round((current / target) * 100)) : 0;
                  return (
                    <tr key={campaign.uuid} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white mb-1">{extractStr(campaign.title)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{extractStr(campaign.description)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="w-full max-w-[200px]">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">${current.toLocaleString()}</span>
                            <span className="text-gray-500 dark:text-gray-400">of ${target.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 dark:text-gray-300">{new Date(campaign.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/${locale}/admin/campaigns/${campaign.uuid}`}>
                            <button className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                              <Eye className="w-4 h-4" />
                            </button>
                          </Link>
                          <button onClick={() => setEditingCampaign(campaign)}
                            className="p-1.5 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-md hover:bg-amber-50 dark:hover:bg-amber-500/10">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => setDeletingId(campaign.uuid)}
                            className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {!isLoading && paginatedData.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">No campaigns found matching your search.</div>
          )}
        </div>

        {filteredData.length > 0 && (
          <PaginationCard
            totalPages={Math.ceil(filteredData.length / itemsPerPage)}
            page={currentPage}
            setPage={setCurrentPage}
            pageSize={itemsPerPage}
            totalItems={filteredData.length}
          />
        )}
      </div>

      {editingCampaign && (
        <CampaignEditor
          campaign={editingCampaign}
          open={!!editingCampaign}
          onClose={() => setEditingCampaign(null)}
        />
      )}

      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Delete Campaign</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Are you sure you want to delete this campaign? This action cannot be undone.</p>
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

export default CampaignsTable;
