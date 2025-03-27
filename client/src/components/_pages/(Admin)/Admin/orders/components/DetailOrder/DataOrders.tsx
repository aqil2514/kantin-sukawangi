import React from "react";
import DataElement from "./Data";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/utils";

const DataItem: React.FC<{ data: Transaction.TransactionDb }> = ({ data }) => {
  const items = data.order_details?.items;

  if (!items) return null;

  return (
    <ScrollArea className="h-[300px]">
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md ">
        <h3 className="text-lg font-semibold mb-3">Detail Pesanan</h3>
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border-b pb-3 last:border-none"
            >
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="object-cover rounded-md border"
                />
              )}
              <div className="flex-1">
                <h4 className="text-md font-medium">{item.name}</h4>
                <p className="text-gray-600">
                  {item.quantity} x{" "}
                  <span className="font-semibold">
                    Rp{item.price.toLocaleString("id-ID")}
                  </span>
                </p>
              </div>
              <div className="text-right font-semibold text-blue-600">
                Rp{(item.price * item.quantity).toLocaleString("id-ID")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

const DataElementPayment: React.FC<{ data: Transaction.TransactionDb }> = ({
  data,
}) => {
  if (!data) return null;

  const pgImageSrc: Record<string, string> = {
    Midtrans: "/images/logo/Midtrans.png",
  };

  const methodImageSrc: Record<string, string> = {
    credit_card: "/images/logo/Visa.png",
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-2">
      <div className="flex gap-2">
        <Image
          height={64}
          width={64}
          src={pgImageSrc[data.payment_gateway]}
          alt={`${data.payment_gateway} logo`}
        />
        <Image
          height={64}
          width={64}
          src={methodImageSrc[data.payment_method]}
          alt={`${data.payment_method} logo`}
        />
      </div>
      <div className="flex justify-between">
        <span className="font-semibold">Jumlah:</span>
        <span className="text-lg font-bold">{formatCurrency(data.amount)}</span>
      </div>
    </div>
  );
};

const DataElementOrders: typeof DataElement = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-slate-50 p-4 rounded-lg shadow">
      <DataItem data={data} />
      <DataElementPayment data={data} />
    </div>
  );
};

export default DataElementOrders;
