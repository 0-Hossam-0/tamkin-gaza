"use client";

import { useEffect, useMemo, useState } from "react";
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
import { TUser } from "@/@types/IUser";
import PaginationCard from "../common/PaginationCard";

// ── Types ─────────────────────────────────────

// ── Mock Data ─────────────────────────────────

const FIRST = ["Alex", "Nour", "Omar", "Layla", "Hassan", "Fatima"];
const LAST = ["Ibrahim", "Mansour", "Ali", "Smith", "Lee", "Kim"];

const USERS: TUser[] = Array.from({ length: 15 }, (_, i) => ({
  id: `U-${i + 1}`,
  name: `${FIRST[i % FIRST.length]} ${LAST[i % LAST.length]}`,
  email: `user${i}@example.com`,
  role: i % 5 === 0 ? "admin" : "user",
  isActive: i % 3 !== 0,
  country: "Egypt",
  phone: "+20 10" + Math.floor(Math.random() * 100000000),
  createdAt: new Date(Date.now() - i * 86400000 * 10),
  lastLogin: new Date(Date.now() - i * 3600000 * 5),
  colorIdx: i % 6,
}));

// ── Helpers ───────────────────────────────────

const AVATAR_COLORS = [
  ["#eef0fd", "#4648D4"],
  ["#f0fdf4", "#15803d"],
  ["#fef9ec", "#b45309"],
  ["#fdf2f8", "#9d174d"],
  ["#eff6ff", "#1d4ed8"],
  ["#fff7ed", "#c2410c"],
];

function relativeTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (hrs < 24) return `${hrs}h ago`;
  return `${days}d ago`;
}

type SortKey = keyof TUser;

// ── Component ─────────────────────────────────

export default function UsersTable() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return USERS.filter(
      (u) =>
        !search ||
        [u.name, u.email, u.id].some((v) =>
          v.toLowerCase().includes(search.toLowerCase()),
        ),
    ).sort((a, b) => {
      let av: any = a[sortKey];
      let bv: any = b[sortKey];

      if (av instanceof Date) {
        av = av.getTime();
        bv = bv.getTime();
      } else if (typeof av === "string") {
        av = av.toLowerCase();
        bv = bv.toLowerCase();
      }

      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });
  }, [search, sortKey, sortDir]);

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
      {/* Header */}
      <div className="flex justify-between px-5 py-3 border-b">
        <h2 className="text-sm font-semibold">Users</h2>

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

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {["id", "name", "email", "role", "isActive", "createdAt"].map(
              (col) => (
                <TableHead
                  key={col}
                  onClick={() => handleSort(col as SortKey)}
                  className="cursor-pointer text-xs"
                >
                  {col}
                  <SortIcon k={col as SortKey} />
                </TableHead>
              ),
            )}
            <TableHead>actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell colSpan={7}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                </TableRow>
              ))
            : filtered.map((user) => {
                const [bg, fg] = AVATAR_COLORS[user.colorIdx];

                return (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs"
                          style={{ background: bg, color: fg }}
                        >
                          {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        {user.name}
                      </div>
                    </TableCell>

                    <TableCell>{user.email}</TableCell>

                    <TableCell>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          user.role === "admin"
                            ? "bg-purple-50 text-purple-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          user.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {user.isActive ? "Active" : "Suspended"}
                      </span>
                    </TableCell>

                    <TableCell>{relativeTime(user.createdAt)}</TableCell>

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
        pageSize={5}
        totalPages={Math.ceil(filtered.length / 5)}
      />
    </Card>
  );
}
