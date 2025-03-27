import { TableCell } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

interface TransactionStatusBadgeProps {
  status: Transaction.TransactionStatus;
}

const statusColors: Record<Transaction.TransactionStatus, string> = {
  nothing: "bg-gray-500",
  pending: "bg-yellow-500",
  settlement: "bg-green-500",
  capture: "bg-blue-500",
  deny: "bg-red-500",
  cancel: "bg-red-600",
  expire: "bg-gray-700",
  refund: "bg-purple-500",
  awaiting_payment: "bg-orange-500",
};

const textColors: Record<Transaction.TransactionStatus, string> = {
  nothing: "text-gray-500",
  pending: "text-yellow-500",
  settlement: "text-green-500",
  capture: "text-blue-500",
  deny: "text-red-500",
  cancel: "text-red-600",
  expire: "text-gray-700",
  refund: "text-purple-500",
  awaiting_payment: "text-orange-500",
};

const statusLabels: Record<Transaction.TransactionStatus, string> = {
  nothing: "Tidak Ada",
  pending: "Menunggu Konfirmasi",
  settlement: "Berhasil",
  capture: "Pembayaran Ditangkap",
  deny: "Ditolak",
  cancel: "Dibatalkan",
  expire: "Kedaluwarsa",
  refund: "Dana Dikembalikan",
  awaiting_payment: "Menunggu Pembayaran",
};

export default function TableStatus({ status }: TransactionStatusBadgeProps) {
  const statusData = Object.entries(statusLabels);
  return (
    <TableCell>
      <Select>
        <SelectTrigger
          className={`px-2 py-1 text-white text-sm font-semibold rounded-md ${statusColors[status]} mx-auto`}
        >
          {statusLabels[status]}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ubah Status Pemesanan</SelectLabel>
            {statusData.map(([status, label]) => {
              const textColor =
                textColors[status as Transaction.TransactionStatus];

              return (
                <SelectItem
                  key={status}
                  value={status}
                  className={`${textColor}`}
                >
                  {" "}
                  {label}{" "}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableCell>
  );
}
