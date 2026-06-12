"use client";
import { ArrowDown, ArrowUp, ArrowUpDown, Eye, Trash } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table,
  TableRow,
} from "../ui/table";
import { Skeleton } from "../ui/skeleton";
import PaginationCard from "../common/PaginationCard";
import { Card } from "../ui/card";

type PaymentRow = {
  id: string;
  name: string;
  campaign: string;
  email: string;
  amount: number;
  currency: string;
  provider: string;
  createdAt: Date;
};

const MOCK_PAYMENTS: PaymentRow[] = [
  {
    id: "P-1",
    name: "Ahmed Ali",
    campaign: "Medical Supplies for Gaza",
    email: "ahmed@example.com",
    amount: 500,
    currency: "USD",
    provider: "stripe",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "P-2",
    name: "Sarah Hassan",
    campaign: "Winter Relief Fund",
    email: "sarah@example.com",
    amount: 250,
    currency: "USD",
    provider: "paymob",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "P-3",
    name: "Omar Khaled",
    campaign: "Education Support",
    email: "omar@example.com",
    amount: 1000,
    currency: "USD",
    provider: "fawry",
    createdAt: new Date("2024-03-10"),
  },
];

type SortKey = keyof PaymentRow;

const PaymentTables = () => {
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return [...MOCK_PAYMENTS].sort((a, b) => {
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
  }, [sortKey, sortDir]);

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
      <Table>
        <TableHeader>
          <TableRow>
            {["id", "name", "campaign", "email", "amount", "createdAt"].map(
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
            : filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.campaign}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>
                    {p.amount} {p.currency}
                  </TableCell>
                  <TableCell>{p.createdAt.toLocaleDateString()}</TableCell>
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
              ))}
        </TableBody>
      </Table>

      <PaginationCard
        page={page}
        setPage={setPage}
        totalItems={MOCK_PAYMENTS.length}
        pageSize={5}
        totalPages={1}
      />
    </Card>
  );
};

export default PaymentTables;
