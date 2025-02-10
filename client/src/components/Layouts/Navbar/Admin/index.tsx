"use client";

import { Menu } from "lucide-react";
import { IoCloseSharp } from "react-icons/io5";
import DropdownAdmin from "./DropDown";
import IconSection from "./IconSection";
import Title from "./Title";
import { useAdminSidebarStore } from "@/lib/store/admin-sidebar";
import MobileSidebar from "../Sidebar/Admin/MobileSidebar";

export default function AdminNavbar() {
  const { toggleSidebar, isActiveSidebar } = useAdminSidebarStore();
  return (
    <div className="flex items-center justify-between bg-zinc-900 w-full h-14 px-6 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        {isActiveSidebar ? (
          <IoCloseSharp
            className="text-white hidden lg:block cursor-pointer hover:text-red-500 transition"
            size={24}
            onClick={toggleSidebar}
          />
        ) : (
          <Menu
            className="text-white hidden lg:block cursor-pointer hover:text-red-500 transition"
            size={24}
            onClick={toggleSidebar}
          />
        )}

        <MobileSidebar />

        <Title />
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Icon Section */}
        <IconSection />

        {/* Admin Profile Dropdown */}
        <DropdownAdmin />
      </div>
    </div>
  );
}
