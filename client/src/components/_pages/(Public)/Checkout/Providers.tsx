import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface WithProductContextProps {
  token: string;
  setToken: React.Dispatch<SetStateAction<string>>;
  redirectUrl: string;
  setRedirectUrl: React.Dispatch<SetStateAction<string>>;
  orderId: string;
  setOrderId: React.Dispatch<SetStateAction<string>>;
  paymentStatus: Transaction.TransactionStatus;
  setPaymentStatus: React.Dispatch<
    SetStateAction< Transaction.TransactionStatus>
  >;
  searchParams: ReadonlyURLSearchParams
}

const WithProductContext = createContext<WithProductContextProps>(
  {} as WithProductContextProps
);

export default function WithProductProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");
  const [redirectUrl, setRedirectUrl] = useState<string>("");
  const [orderId, setOrderId] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<Transaction.TransactionStatus>("nothing");
  const searchParams = useSearchParams()

  const value: WithProductContextProps = {
    orderId,
    redirectUrl,
    setRedirectUrl,
    setOrderId,
    setToken,
    token,
    paymentStatus,
    setPaymentStatus,
    searchParams
  };

  return (
    <WithProductContext.Provider value={value}>
      {children}
    </WithProductContext.Provider>
  );
}

export const useWpContext = () => useContext(WithProductContext);
