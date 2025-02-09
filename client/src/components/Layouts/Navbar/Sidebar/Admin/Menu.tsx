"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarFooterLinks, adminSidebarLinks } from "../../data";
import { MdDashboard } from "react-icons/md";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdminSidebarMenu() {
  const pathname = usePathname(); // Dapatkan path aktif

  return (
    <nav className="w-full h-full p-4">
      {/* Tombol Studio */}
      <Link href="/admin/sanity" target="_blank">
        <Button className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-2">
          <HiMiniBuildingOffice2 />
          <span>Studio</span>
        </Button>
      </Link>

      {/* Header Dashboard */}
      <div className="text-white flex flex-wrap items-center pb-2 gap-1 my-4 border-double border-b-8 border-white">
        <MdDashboard size={24} />
        <p className="my-auto">Dashboard</p>
      </div>

      {/* Menu Utama */}
      <ScrollArea className="h-[250px] border-b-2 border-zinc-300">
        <ul className="space-y-2">
          {adminSidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                {isActive ? (
                  <p className="flex items-center gap-3 p-3 rounded-lg bg-white cursor-default text-gray-900">
                    {link.icon}
                    <span>{link.text}</span>
                  </p>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-white hover:text-gray-900 hover:bg-white transition"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      {/* Footer Links */}
      <div>
        <ul className="space-y-2 my-4 flex flex-col justify-end">
          {adminSidebarFooterLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                {isActive ? (
                  <p className="flex items-center gap-3 p-3 rounded-lg bg-white cursor-default text-gray-900">
                    {link.icon}
                    <span>{link.text}</span>
                  </p>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-lg text-white hover:text-gray-900 hover:bg-white transition"
                  >
                    {link.icon}
                    <span>{link.text}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
