"use client";

import React, { useState } from "react";
import { TTeamMember } from "@/@types/TTeam";
import { Edit, Trash2, Search, Filter, Shield, User, Briefcase, Mail } from "lucide-react";
import PaginationCard from "../common/PaginationCard";

const MOCK_TEAM: TTeamMember[] = [
  {
    id: "1",
    name: "Ahmed Youssef",
    email: "ahmed@tamkin.org",
    role: "Admin",
    type: "Employee",
    status: "Active",
    joinedAt: "2023-01-15",
    permissions: ["All"],
  },
  {
    id: "2",
    name: "Sarah Ali",
    email: "sarah@tamkin.org",
    role: "Manager",
    type: "Employee",
    status: "Active",
    joinedAt: "2023-03-22",
    permissions: ["View Campaigns", "Edit Campaigns", "Manage Users"],
  },
  {
    id: "3",
    name: "Omar Khaled",
    email: "omar@volunteer.org",
    role: "Editor",
    type: "Member",
    status: "Active",
    joinedAt: "2023-06-10",
    permissions: ["View Campaigns", "Edit Campaigns"],
  },
  {
    id: "4",
    name: "Laila Mahmoud",
    email: "laila@volunteer.org",
    role: "Viewer",
    type: "Member",
    status: "Inactive",
    joinedAt: "2023-08-05",
    permissions: ["View Campaigns", "View Analytics"],
  },
];

const TeamTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = MOCK_TEAM.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getRoleBadge = (role: TTeamMember["role"]) => {
    switch (role) {
      case "Admin":
        return <span className="px-2.5 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-500/30 flex items-center gap-1 w-fit"><Shield className="w-3 h-3" /> Admin</span>;
      case "Manager":
        return <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full border border-blue-200 dark:border-blue-500/30 flex items-center gap-1 w-fit"><Briefcase className="w-3 h-3" /> Manager</span>;
      case "Editor":
        return <span className="px-2.5 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1 w-fit"><Edit className="w-3 h-3" /> Editor</span>;
      case "Viewer":
        return <span className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-600 flex items-center gap-1 w-fit"><User className="w-3 h-3" /> Viewer</span>;
    }
  };

  const getTypeBadge = (type: TTeamMember["type"]) => {
    return type === "Employee" ? (
      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 rounded">Employee</span>
    ) : (
      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 rounded">Member</span>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members..."
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
              <th className="px-6 py-4 font-semibold">Member</th>
              <th className="px-6 py-4 font-semibold">Role & Type</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Permissions</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {paginatedData.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{member.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    {getRoleBadge(member.role)}
                    <div>{getTypeBadge(member.type)}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                    member.status === 'Active' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' 
                      : 'bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {member.permissions.map((perm, idx) => (
                      <span key={idx} className="px-1.5 py-0.5 text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-600">
                        {perm}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-md hover:bg-indigo-50 dark:hover:bg-indigo-500/10">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {paginatedData.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            No team members found matching your search.
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

export default TeamTable;
