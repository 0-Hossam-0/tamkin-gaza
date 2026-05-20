"use client";

import React, { useState } from "react";
import { TCampaign } from "@/@types/TCampaign";
import { Eye, Edit, Trash2, Search, Filter } from "lucide-react";
import PaginationCard from "../common/PaginationCard";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_CAMPAIGNS: TCampaign[] = [
  {
    id: "1",
    title: "Medical Supplies for Gaza",
    description: "Providing essential medical supplies to hospitals in need.",
    targetAmount: 50000,
    raisedAmount: 35000,
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    status: "Active",
    donorsCount: 1250,
  },
  {
    id: "2",
    title: "Winter Relief Fund",
    description: "Winter clothes and blankets for displaced families.",
    targetAmount: 25000,
    raisedAmount: 25500,
    startDate: "2023-11-01",
    endDate: "2024-02-28",
    status: "Completed",
    donorsCount: 840,
  },
  {
    id: "3",
    title: "Education Support",
    description: "School supplies and makeshift classrooms.",
    targetAmount: 100000,
    raisedAmount: 45000,
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    status: "Active",
    donorsCount: 2100,
  },
];

const CampaignsTable = () => {
  const { locale } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = MOCK_CAMPAIGNS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: TCampaign["status"]) => {
    switch (status) {
      case "Active":
        return <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-500/30">Active</span>;
      case "Completed":
        return <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/30">Completed</span>;
      case "Pending":
        return <span className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-500/30">Pending</span>;
      case "Cancelled":
        return <span className="px-2.5 py-1 text-xs font-medium bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400 rounded-full border border-rose-200 dark:border-rose-500/30">Cancelled</span>;
    }
  };

  return (
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
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
            <tr>
              <th className="px-6 py-4 font-semibold">Campaign</th>
              <th className="px-6 py-4 font-semibold">Progress</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Dates</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {paginatedData.map((campaign) => {
              const progress = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
              return (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900 dark:text-white mb-1">
                      {campaign.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
                      {campaign.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full max-w-[200px]">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="font-medium text-indigo-600 dark:text-indigo-400">${campaign.raisedAmount.toLocaleString()}</span>
                        <span className="text-gray-500 dark:text-gray-400">of ${campaign.targetAmount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(campaign.status)}</td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900 dark:text-gray-300">{campaign.endDate}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{campaign.donorsCount} donors</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/${locale}/admin/campaigns/${campaign.id}`}>
                        <button className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors rounded-md hover:bg-amber-50 dark:hover:bg-amber-500/10">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            No campaigns found matching your search.
          </div>
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
  );
};

export default CampaignsTable;
