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
      className="grid transition-[grid-template-columns] duration-500 ease-in-out"
      style={{
        gridTemplateColumns: isActiveSidebar ? "20% auto" : "minmax(0px, 0px) auto",
      }}
    >
      {children}
    </div>
  );
}
