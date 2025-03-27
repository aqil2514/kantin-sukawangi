import React from "react";
import DataElement from "./Data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const DataStatus: React.FC<{ data: Transaction.TransactionDb }> = ({ data }) => {
  const status = data.status;

  const bgColor: Record<Transaction.TransactionStatus, string> = {
    nothing: "bg-gray-100 dark:bg-gray-800",
    pending: "bg-yellow-50 dark:bg-yellow-900",
    settlement: "bg-green-50 dark:bg-green-900",
    capture: "bg-green-50 dark:bg-green-900",
    deny: "bg-red-50 dark:bg-red-900",
    cancel: "bg-red-50 dark:bg-red-900",
    expire: "bg-gray-50 dark:bg-gray-700",
    refund: "bg-blue-50 dark:bg-blue-900",
    awaiting_payment: "bg-yellow-50 dark:bg-yellow-900",
  };

  const textColor: Record<Transaction.TransactionStatus, string> = {
    nothing: "text-gray-600 dark:text-gray-300",
    pending: "text-yellow-700 dark:text-yellow-300",
    settlement: "text-green-700 dark:text-green-300",
    capture: "text-green-700 dark:text-green-300",
    deny: "text-red-700 dark:text-red-300",
    cancel: "text-red-700 dark:text-red-300",
    expire: "text-gray-700 dark:text-gray-300",
    refund: "text-blue-700 dark:text-blue-300",
    awaiting_payment: "text-yellow-700 dark:text-yellow-300",
  };

  const badgeColor: Record<Transaction.TransactionStatus, string> = {
    nothing: "hover:bg-gray-600 bg-gray-300 text-gray-800 dark:bg-gray-500 dark:hover:bg-gray-600",
    pending: "hover:bg-yellow-600 bg-yellow-500 text-white dark:bg-yellow-700",
    settlement: "hover:bg-green-600 bg-green-500 text-white dark:bg-green-700",
    capture: "hover:bg-green-600 bg-green-500 text-white dark:bg-green-700",
    deny: "hover:bg-red-600 bg-red-500 text-white dark:bg-red-700",
    cancel: "hover:bg-red-600 bg-red-500 text-white dark:bg-red-700",
    expire: "hover:bg-gray-600 bg-gray-400 text-white dark:bg-gray-600",
    refund: "hover:bg-blue-600 bg-blue-500 text-white dark:bg-blue-700",
    awaiting_payment: "hover:bg-yellow-600 bg-yellow-500 text-white dark:bg-yellow-700",
  };

  return (
    <div className={`p-4 rounded-lg shadow-md ${bgColor[status]}`}>
      <Badge
        className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all cursor-pointer ${badgeColor[status]}`}
      >
        {data.status}
      </Badge>
      {data.status_message && (
        <div className={`mt-2 ${textColor[status]}`}>
          <span className="font-semibold">Status Message:</span> {data.status_message}
        </div>
      )}
    </div>
  );
};

const DataElementCustomer: typeof DataElement = ({ data }) => {
  if (!data) return null;

  return (
    <div className="grid gap-4">
      {/* Tanggal Transaksi */}
      {data.transaction_date && (
        <Card className="max-w-[400px]">
          <CardContent className="p-4">
            <span className="font-semibold">Tanggal Transaksi:</span>{" "}
            {new Date(data.transaction_date).toLocaleString("id-ID")}
          </CardContent>
        </Card>
      )}

      {data.confirmation_date && (
        <Card className="max-w-[400px]">
          <CardContent className="p-4">
            <span className="font-semibold">Tanggal Konfirmasi:</span>{" "}
            {new Date(data.confirmation_date).toLocaleString("id-ID")}
          </CardContent>
        </Card>
      )}

      {/* Status Pemesanan */}
      <DataStatus data={data} />

      {/* Detail Pemesan */}
      {data.order_details && (
        <Card>
          <CardContent className="p-4">
            <span className="font-semibold">Detail Pemesan:</span>
            <div className="grid gap-2 mt-2">
              <div>
                <span className="font-semibold">Nama:</span>{" "}
                {data.order_details.customer_details.full_name}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {data.order_details.customer_details.email}
              </div>
              <div>
                <span className="font-semibold">Telepon:</span>{" "}
                {data.order_details.customer_details.phone}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DataElementCustomer;
