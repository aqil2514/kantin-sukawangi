"use client";
import { createContext, SetStateAction, useContext, useState } from "react";

interface AdminInit {
  children: React.ReactNode;
  isActiveSidebar: boolean;
  setIsActiveSidebar: React.Dispatch<SetStateAction<boolean>>;
}

type AdminContextProps = Omit<AdminInit, "children">;
type AdminProviderProps = Pick<AdminInit, "children">;

const AdminContext = createContext<AdminContextProps>({} as AdminContextProps);

export default function AdminProvider({ children}: AdminProviderProps) {
  const [isActiveSidebar, setIsActiveSidebar] = useState<boolean>(false);

  const value: AdminContextProps = {
    isActiveSidebar,
    setIsActiveSidebar,
  };
  return (
    <AdminContext.Provider value={value}>{ children}</AdminContext.Provider>
  );
}

export const useAdminData = () => useContext(AdminContext);
