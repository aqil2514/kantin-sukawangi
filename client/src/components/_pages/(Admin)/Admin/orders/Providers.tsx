"use client";

import { createContext, useContext } from "react";

interface OrderProps {
  transactionData: Transaction.TransactionDb[];
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
  return (
    <OrderContext.Provider value={{ transactionData }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderData = () => useContext(OrderContext);
