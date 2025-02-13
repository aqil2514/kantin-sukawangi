import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import DataElement from "./DO_DataElement";
import Footer from "./DO_Footer";

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
        <DialogHeader className="bg-slate-100 p-4">
          <DialogTitle>
            {data?.data && `Oder Id : #${data.data.order_id}`}
          </DialogTitle>
          <DialogDescription>
            {data?.data && `User Id #${data.data.user_id}`}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <LoadingElement />
        ) : error ? (
          <ErrorElement />
        ) : (
          <DataElement data={data?.data} />
        )}
        <DialogFooter>
          <Footer data={data?.data} />
        </DialogFooter>
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


