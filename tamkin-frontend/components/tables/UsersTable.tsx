"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Edit,
  Trash,
  Mail,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Search,
} from "lucide-react";
import PaginationCard from "../common/PaginationCard";
import { useUsers } from "@/hooks/useUsers";
import type { TUser } from "@/@types/IUser";

const AVATAR_COLORS = [
  ["#eef0fd", "#4648D4"],
  ["#f0fdf4", "#15803d"],
  ["#fef9ec", "#b45309"],
  ["#fdf2f8", "#9d174d"],
  ["#eff6ff", "#1d4ed8"],
  ["#fff7ed", "#c2410c"],
];

function relativeTime(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

type SortKey = "fullName" | "email" | "role" | "createdAt" | "uuid";

export default function UsersTable() {
  const { data: users, isLoading } = useUsers();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filtered = useMemo(() => {
    const list = users || [];
    return list
      .filter(
        (u) =>
          !search ||
          [u.fullName, u.email, u.uuid].some((v) =>
            v.toLowerCase().includes(search.toLowerCase()),
          ),
      )
      .sort((a, b) => {
        const ak = sortKey === "fullName" ? "fullName" : sortKey;
        let av = String(a[ak as keyof TUser] ?? "");
        let bv = String(b[ak as keyof TUser] ?? "");
        av = av.toLowerCase();
        bv = bv.toLowerCase();
        return av < bv ? -sortDir : av > bv ? sortDir : 0;
      });
  }, [users, search, sortKey, sortDir]);

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(k: SortKey) {
    if (sortKey === k) setSortDir((d) => (d === 1 ? -1 : 1));
    else {
      setSortKey(k);
      setSortDir(-1);
    }
  }

  const SortIcon = ({ k }: { k: SortKey }) => {
    if (sortKey !== k)
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-30 inline" />;
    return sortDir === 1 ? (
      <ArrowUp className="w-3 h-3 inline" />
    ) : (
      <ArrowDown className="w-3 h-3 inline" />
    );
  };

  return (
    <Card className="rounded-3xl overflow-hidden border-none shadow-none">
      <div className="flex justify-between px-5 py-3 border-b">
        <h2 className="text-sm font-semibold">Users ({users?.length || 0})</h2>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            className="pl-7 pr-3 py-1 text-xs border rounded-lg"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {["uuid", "fullName", "email", "role", "createdAt"].map(
              (col) => (
                <TableHead
                  key={col}
                  onClick={() => handleSort(col as SortKey)}
                  className="cursor-pointer text-xs"
                >
                  {col === "fullName" ? "name" : col}
                  <SortIcon k={col as SortKey} />
                </TableHead>
              ),
            )}
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={6}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : paginated.map((user, idx) => {
                const [bg, fg] = AVATAR_COLORS[idx % AVATAR_COLORS.length];

                return (
                  <TableRow key={user.uuid}>
                    <TableCell className="text-xs font-mono">
                      {user.uuid.slice(0, 8)}...
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                          style={{ background: bg, color: fg }}
                        >
                          {user.fullName.slice(0, 2).toUpperCase()}
                        </div>
                        {user.fullName}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs">{user.email}</TableCell>
                    <TableCell>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          user.role === "admin" || user.role === "super_admin"
                            ? "bg-purple-50 text-purple-700"
                            : user.role === "user"
                              ? "bg-gray-100 text-gray-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">
                      {relativeTime(user.createdAt)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-3 h-3" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Mail className="w-3 h-3" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>

      <PaginationCard
        page={page}
        setPage={setPage}
        totalItems={filtered.length}
        pageSize={pageSize}
        totalPages={Math.ceil(filtered.length / pageSize)}
      />
    </Card>
  );
}
