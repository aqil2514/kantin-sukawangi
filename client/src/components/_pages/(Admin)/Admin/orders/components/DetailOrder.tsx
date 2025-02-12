import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("Gagal mengambil detail order");
    }
    return res.json();
  });

export default function DetailOrder({ orderId }: { orderId: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { data, error, isLoading } = useSWR(
    isOpen ? `/api/admin/orders?orderId=${orderId}` : null,
    fetcher
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="text-zinc-800 border-blue-500 bg-blue-500 hover:bg-blue-300 p-1 rounded-xl">
        Lihat Detail
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
          <DialogTitle>Detail Order</DialogTitle>
        <DialogDescription>
            {data?.data && `Detil pesanan #${data.data.order_id}`}
        </DialogDescription>
          {isLoading ? (
            <LoadingElement />
          ) : error ? (
            <ErrorElement />
          ) : (
            <DataElement data={data?.data} />
          )}
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const LoadingElement = () => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};

const ErrorElement = () => {
  return (
    <Alert variant="destructive">
      <AlertTitle>Gagal Memuat</AlertTitle>
      <AlertDescription>
        Tidak dapat mengambil detail order. Silakan coba lagi.
      </AlertDescription>
    </Alert>
  );
};

// TODO : BUAT UI UNTUK INI
const DataElementIdentity: React.FC<{ data?: Transaction.TransactionDb }> = ({ data }) => {
    if (!data) return null;
  
    return (
      <div className="grid grid-cols-2 gap-2">
        <div>
          <span className="font-semibold">Order ID:</span> {data.order_id}
        </div>
        <div>
          <span className="font-semibold">User ID:</span> {data.user_id}
        </div>
      </div>
    );
  };
  
  const DataElement: React.FC<{ data?: Transaction.TransactionDb }> = ({ data }) => {
    if (!data) return null;
    
    return (
      <div className="space-y-2">
        <DataElementIdentity data={data} />
        <div>
          <span className="font-semibold">Jumlah:</span> {data.amount.toLocaleString("id-ID")} {data.currency}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {data.status}
        </div>
        <div>
          <span className="font-semibold">Metode Pembayaran:</span> {data.payment_method}
        </div>
        <div>
          <span className="font-semibold">Gateway Pembayaran:</span> {data.payment_gateway}
        </div>
        {data.transaction_date && (
          <div>
            <span className="font-semibold">Tanggal Transaksi:</span> {new Date(data.transaction_date).toLocaleString("id-ID")}
          </div>
        )}
        {data.confirmation_date && (
          <div>
            <span className="font-semibold">Tanggal Konfirmasi:</span> {new Date(data.confirmation_date).toLocaleString("id-ID")}
          </div>
        )}
        {data.status_message && (
          <div>
            <span className="font-semibold">Status Message:</span> {data.status_message}
          </div>
        )}
        {data.order_details && (
          <div>
            <span className="font-semibold">Detail Pemesan:</span>
            <div className="ml-4">
              <div><span className="font-semibold">Nama:</span> {data.order_details.customer_details.full_name}</div>
              <div><span className="font-semibold">Email:</span> {data.order_details.customer_details.email}</div>
              <div><span className="font-semibold">Telepon:</span> {data.order_details.customer_details.phone}</div>
            </div>
          </div>
        )}
      </div>
    );
  };
  