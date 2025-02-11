"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import TransactionStatusBadge from "./TableStatus";
import { Button } from "@/components/ui/button";

export function TableData({
  transactionData,
}: {
  transactionData: Transaction.TransactionDb[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Ambil page dari searchParams, jika tidak ada default ke 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  // Hitung total halaman
  const totalPages = Math.ceil(transactionData.length / itemsPerPage);

  // Ambil data sesuai halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = transactionData.slice(startIndex, startIndex + itemsPerPage);

  // Fungsi untuk mengganti halaman dan update searchParams
  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", page.toString());
    router.replace(`?${newParams.toString()}`, { scroll: false });
  };

  return (
    <ScrollArea className="w-full border rounded-lg shadow-md">
      <Table className="min-w-full border-collapse">
        <TableCaption className="text-gray-500 text-sm mt-2">
          Daftar transaksi terbaru Anda.
        </TableCaption>

        {/* Header */}
        <TableHeader className="bg-gray-100 sticky top-0 z-10 shadow">
          <TableRow>
            <TableHead className="py-3 px-4 text-left">Order ID</TableHead>
            <TableHead className="py-3 px-4 text-left">Nama</TableHead>
            <TableHead className="py-3 px-4 text-left">Total Transaksi</TableHead>
            <TableHead className="py-3 px-4 text-left">Status</TableHead>
            <TableHead className="py-3 px-4 text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {currentData.map((transaction) => (
            <TableRow
              key={transaction.order_id}
              className="hover:bg-gray-50 transition"
            >
              <TableCell className="py-3 px-4 font-medium">
                {transaction.order_id}
              </TableCell>
              <TableCell className="py-3 px-4">{transaction.order_details?.customer_details.full_name}</TableCell>
              <TableCell className="py-3 px-4 font-semibold">
                {formatCurrency(transaction.amount)}
              </TableCell>
              <TableCell className="py-3 px-4">
                <TransactionStatusBadge status={transaction.status} />
              </TableCell>
              <TableCell className="py-3 px-4 text-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-blue-600 border-blue-500 hover:bg-blue-100"
                  onClick={() => alert(`Detail transaksi: ${transaction.order_id}`)}
                >
                  Lihat Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        {/* Footer */}
        <TableFooter className="bg-gray-100">
          <TableRow>
            <TableCell colSpan={3} className="py-3 px-4 font-semibold">
              Total Keseluruhan:
            </TableCell>
            <TableCell className="py-3 px-4 font-bold text-green-600">
              {formatCurrency(transactionData.reduce((sum, trx) => sum + trx.amount, 0))}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between p-4">
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => goToPage(currentPage - 1)}
        >
          ← Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          disabled={currentPage >= totalPages}
          onClick={() => goToPage(currentPage + 1)}
        >
          Next →
        </Button>
      </div>
    </ScrollArea>
  );
}
