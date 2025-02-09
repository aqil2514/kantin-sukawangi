"use client";

import { Menu } from "lucide-react";
import DropdownAdmin from "./DropDown";
import IconSection from "./IconSection";
import Title from "./Title";

export default function AdminNavbar() {
  return (
    <div className="flex items-center justify-between bg-zinc-900 w-full h-14 px-6 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Menu
          className="text-white cursor-pointer hover:text-red-500 transition"
          size={24}
        />

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
