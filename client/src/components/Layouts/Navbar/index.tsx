"use client";

import { usePathname } from "next/navigation";
import PublicNavbar from "./Public";

export default function Navbar() {
  const pathName = usePathname();

  if (pathName.startsWith("/admin")) return null;

  return <PublicNavbar />;
}
