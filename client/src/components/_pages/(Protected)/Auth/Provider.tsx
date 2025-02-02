import { useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
  useEffect,
} from "react";

export type ActivePage = "login" | "register";

interface AuthContextProps {
  activePage: ActivePage;
  setActivePage: React.Dispatch<SetStateAction<ActivePage>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activePage, setActivePage] = useState<ActivePage>("login");

  useEffect(() => {
    const valueParam = searchParams.get("page");
    if (valueParam === "register" || valueParam === "login") {
      return setActivePage(valueParam);
    } else {
      setActivePage("login");
      router.replace("/auth?page=login");
      return;
    }
  }, [searchParams, router]);

  const value: AuthContextProps = {
    activePage,
    setActivePage,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
