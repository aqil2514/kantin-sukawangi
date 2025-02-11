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
  
  export default function TransactionStatusBadge({ status }: TransactionStatusBadgeProps) {
    return (
      <span className={`px-2 py-1 text-white text-sm font-semibold rounded-md ${statusColors[status]} mx-auto`}>
        {statusLabels[status]}
      </span>
    );
  }
  