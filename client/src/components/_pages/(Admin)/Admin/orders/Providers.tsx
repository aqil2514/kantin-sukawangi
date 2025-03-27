"use client";

import { createContext, SetStateAction, useContext, useState } from "react";

export type SourceData = "wa" | "web";

interface OrderProps {
  transactionData: Transaction.AllTransactionDb;
  sourceData: SourceData;
  setSourceData: React.Dispatch<SetStateAction<SourceData>>;
  children: React.ReactNode;
}

type OrderContextProviders = Omit<OrderProps, "children">;
type OrderContextProps = Pick<OrderProps, "children" | "transactionData">;

const OrderContext = createContext<OrderContextProviders>(
  {} as OrderContextProviders
);

export default function OrderProvider({
  children,
  transactionData,
}: OrderContextProps) {
  const [sourceData, setSourceData] = useState<SourceData>("wa")
  return (
    <OrderContext.Provider value={{ transactionData, setSourceData, sourceData }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderData = () => useContext(OrderContext);
