import Link from "next/link";
import { adminSidebarLinks } from "../../data";
import { MdDashboard } from "react-icons/md";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Button } from "@/components/ui/button";

export default function AdminSidebarMenu() {
  return (
    <nav className="w-full h-full p-4">
      <Link href="/admin/sanity" target="_blank">
        <Button className="mt-4 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
        <HiMiniBuildingOffice2 />
          Studio
        </Button>
      </Link>
      <div className="text-white flex flex-wrap items-center pb-2 gap-1 my-4 border-double border-b-8 border-white">
        <MdDashboard size={24} />
        <p className="my-auto">Dashboard</p>
      </div>
      <ul className="space-y-2">
        {adminSidebarLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="flex items-center gap-3 p-3 rounded-lg text-white hover:bg-gray-700 transition"
            >
              {link.icon}
              <span>{link.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
