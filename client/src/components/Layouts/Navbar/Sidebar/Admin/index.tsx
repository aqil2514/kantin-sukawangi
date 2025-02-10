"use client";
import { useAdminSidebarStore } from "@/lib/store/admin-sidebar";
import UserInfo from "./UserInfo";
import AdminSidebarMenu from "./Menu";

export default function AdminSidebar() {
  const { isActiveSidebar } = useAdminSidebarStore();

  return (
    <div
      className={`hidden lg:block transition-all duration-300 bg-gray-800 h-full pt-4 pl-4`}
      style={{
        opacity: isActiveSidebar ? 1 : 0,
        transform: isActiveSidebar ? "translateX(0)" : "translateX(-100%)",
        overflow: "hidden",
      }}
    >
      <UserInfo />
      <AdminSidebarMenu />
    </div>
  );
}
