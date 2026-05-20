"use client";

import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  page: number;
  setPage: (p: number) => void;
  totalItems: number;
  pageSize: number;
  totalPages: number;
};

const PaginationCard = ({
  page,
  setPage,
  totalItems,
  pageSize,
  totalPages,
}: Props) => {
  const start = Math.min((page - 1) * pageSize + 1, totalItems);
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      {/* Info */}
      <span className="text-xs text-gray-500">
        Showing {start}–{end} of {totalItems}
      </span>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ‹
        </Button>

        {/* Pages */}
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(
          (p) => (
            <Button
              key={p}
              size="sm"
              variant={p === page ? "default" : "outline"}
              onClick={() => setPage(p)}
              className={`w-8 h-8 p-0 ${p === page ? "bg-indigo-400" : ""}`}
            >
              {p}
            </Button>
          ),
        )}

        {totalPages > 5 && <span className="text-xs text-gray-400">...</span>}

        {/* Next */}
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          ›
        </Button>
      </div>
    </div>
  );
};

export default PaginationCard;
