"use client";
import { useAdminSidebarStore } from "@/lib/store/admin-sidebar";
import React from "react";

export default function AdminContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isActiveSidebar } = useAdminSidebarStore();

  return (
    <div
      className={`block lg:grid transition-[grid-template-columns] duration-500 ease-in-out ${isActiveSidebar ? "grid-cols-[20%_auto]" : "grid-cols-[minmax(0px,_0px)_auto]"}`}
    >
      {children}
    </div>
  );
}
