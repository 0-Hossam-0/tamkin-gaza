"use client";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Trash } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from "../ui/table";
import { TPayments } from "@/@types/TPayments";
import { Skeleton } from "../ui/skeleton";
import { Pagination } from "swiper/modules";
import PaginationCard from "../common/PaginationCard";
import { Card } from "../ui/card";
const cols: TPayments[] = [
  {
    id: "R-1",
    amount: 10,
    user: {
      id: `idd`,
      name: "name",
      email: `user@example.com`,
      role: "admin",
      isActive: true,
      country: "Egypt",
      phone: "+20 10" + Math.floor(Math.random() * 100000000),
      createdAt: new Date(Date.now() - 86400000 * 10),
      lastLogin: new Date(Date.now() - 3600000 * 5),
      colorIdx: 6,
    },
    provider: "stripe",
    currency: "USD",

    createdAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    id: "R-1",
    amount: 10,
    user: {
      id: `idd`,
      name: "name",
      email: `user@example.com`,
      role: "admin",
      isActive: true,
      country: "Egypt",
      phone: "+20 10" + Math.floor(Math.random() * 100000000),
      createdAt: new Date(Date.now() - 86400000 * 10),
      lastLogin: new Date(Date.now() - 3600000 * 5),
      colorIdx: 6,
    },
    currency: "USD",

    provider: "stripe",
    createdAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    id: "R-1",
    amount: 10,
    user: {
      id: `idd`,
      name: "name",
      email: `user@example.com`,
      role: "admin",
      isActive: true,
      country: "Egypt",
      phone: "+20 10" + Math.floor(Math.random() * 100000000),
      createdAt: new Date(Date.now() - 86400000 * 10),
      lastLogin: new Date(Date.now() - 3600000 * 5),
      colorIdx: 6,
    },
    currency: "USD",

    provider: "stripe",
    createdAt: new Date(Date.now() - 86400000 * 10),
  },
  {
    id: "R-1",
    amount: 10,
    user: {
      id: `idd`,
      name: "name",
      email: `user@example.com`,
      role: "admin",
      isActive: true,
      country: "Egypt",
      phone: "+20 10" + Math.floor(Math.random() * 100000000),
      createdAt: new Date(Date.now() - 86400000 * 10),
      lastLogin: new Date(Date.now() - 3600000 * 5),
      colorIdx: 6,
    },
    currency: "USD",
    provider: "stripe",
    createdAt: new Date(Date.now() - 86400000 * 10),
  },
];
type SortKey = keyof TPayments;

const PaymentTables = () => {
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
    return cols.sort((a, b) => {
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
    <Card>
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            {["id", "name", "campaing", "email", "amount", "createdAt"].map(
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
            : filtered.map((p) => {
                return (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs">
                          {p.user.name.slice(0, 2).toUpperCase()}
                        </div>
                        {p.user.name}
                      </div>
                    </TableCell>

                    <TableCell>{"pay for gaza"}</TableCell>
                    <TableCell>{p.user.email}</TableCell>

                    <TableCell>
                      {p.amount} {p.currency}
                    </TableCell>

                    <TableCell>
                      {new Date(p.createdAt).toDateString()}
                    </TableCell>

                    <TableCell>
                      <div className="flex gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Eye className="w-3 h-3" />
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
        totalItems={cols.length}
        pageSize={5}
        totalPages={1}
      />
    </Card>
  );
};

export default PaymentTables;
