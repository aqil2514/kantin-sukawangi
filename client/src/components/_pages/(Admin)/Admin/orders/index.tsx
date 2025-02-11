"use client";
import { TableData } from "./components/Table";
import { useOrderData } from "./Providers";

export default function Order() {
  const { transactionData } = useOrderData();

  return (
    <div className="p-4">
        <TableData transactionData={transactionData} />
    </div>
  );
}
