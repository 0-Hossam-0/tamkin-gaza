"use client";

import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Search } from "lucide-react";
import { TReels } from "@/@types/TReels";

const REELS: TReels[] = [
  {
    id: "R-1",
    title: "Marketing Tips",
    description: "Best strategies for 2025 growth",
    url: "https://instagram.com/reel/abc123",
    totalViews: 1000,
    totalLikes: 100,
    totalShares: 10,
    totalComments: 10,
    totalSaves: 10,
    totalReposts: 10,
  },
  {
    id: "R-2",
    title: "AI Automation",
    description: "Automate your business بسهولة",
    url: "https://instagram.com/reel/xyz456",
    totalViews: 1000,
    totalLikes: 100,
    totalShares: 10,
    totalComments: 10,
    totalSaves: 10,
    totalReposts: 10,
  },
  {
    id: "R-3",
    title: "Startup Ideas",
    description: "أفكار مشاريع مربحة",
    url: "https://instagram.com/reel/qwe789",
    totalViews: 1000,
    totalLikes: 100,
    totalShares: 10,
    totalComments: 10,
    totalSaves: 10,
    totalReposts: 10,
  },
];

const RealsTable = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return REELS.filter((r) =>
      [r.title, r.description, r.url]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [search]);

  function copy(url: string) {
    navigator.clipboard.writeText(url);
  }

  return (
    <Card className="rounded-2xl border-none shadow-none overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-3 border-b">
        <h2 className="text-sm font-semibold">Reels</h2>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            className="pl-7 h-8 text-xs"
            placeholder="Search reels..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Title</TableHead>
            <TableHead className="text-xs">Description</TableHead>
            <TableHead className="text-xs">URL</TableHead>
            <TableHead className="text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filtered.map((reel) => (
            <TableRow key={reel.id}>
              <TableCell className="text-xs text-gray-400">{reel.id}</TableCell>

              <TableCell className="text-sm font-medium">
                {reel.title}
              </TableCell>

              <TableCell className="text-xs text-gray-500 max-w-[250px] truncate">
                {reel.description}
              </TableCell>

              <TableCell className="text-xs text-blue-600 truncate max-w-[200px]">
                {reel.url}
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => copy(reel.url)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>

                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => window.open(reel.url, "_blank")}
                  >
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default RealsTable;
