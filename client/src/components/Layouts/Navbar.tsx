"use client";

import Image from "next/image";
import Link from "next/link";
import { FaKey, FaWhatsapp } from "react-icons/fa";
import { navigatorLinks } from "./misc";
import { usePathname } from "next/navigation";
import NavbarMobile from "./NavbarMobile";
import { useMemo } from "react";
import NavbarCarts from "./NavbarCarts";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();

  // Memoize navigatorLinks to optimize performance
  const links = useMemo(() => navigatorLinks, []);

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* WhatsApp Contact */}
      <div className="bg-emerald-500 px-4 flex items-center justify-between h-8 sm:h-10">
        <Link
          target="_blank"
          href="https://wa.me/6285774885367?text=Halo%20Kantin%20Sukawangi,%20saya%20ingin%20memesan!"
          className="flex gap-2 items-center text-white"
          aria-label="Hubungi kami melalui WhatsApp"
        >
          <FaWhatsapp aria-hidden="true" />
          <p className="text-xs sm:text-sm md:text-base">+62 857 7488 5367</p>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-wrap px-4 justify-between items-center bg-white shadow-md relative h-24">
        {/* Logo */}
        <Link href="/" aria-label="Beranda" className="flex items-center gap-2">
          <div className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 relative">
            <Image
              src="/images/logo.png"
              alt="Logo Kantin Sukawangi"
              fill
              sizes="auto"
              priority
            />
          </div>
          <p className="font-macondo text-xl sm:text-2xl md:text-3xl font-bold text-red-500">
            Kantin <span className="text-amber-500">Sukawangi</span>
          </p>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6">
          {links.map((nav, i) => (
            <Link
              href={nav.href}
              key={i}
              className={`text-base ${
                pathName === nav.href
                  ? "text-red-500 font-bold cursor-default"
                  : "text-gray-600 hover:text-red-500"
              }`}
              aria-current={pathName === nav.href ? "page" : undefined}
            >
              {nav.text}
            </Link>
          ))}
        </div>

        <div className="flex gap-4">
          {session ? (
            <Button className="relative bg-red-600 hover:bg-red-500 transition-all duration-300" onClick={() => signOut()}>
              <LogOut />
            </Button>
          ) : (
            <Link href={"/auth"} className="hidden md:block">
              <Button className="relative bg-green-600 hover:bg-green-500 transition-all duration-300">
                <FaKey />
              </Button>
            </Link>
          )}

          {/* Navbar Carts */}
          <NavbarCarts />

          {/* Mobile Navigation */}
          <NavbarMobile />
        </div>
      </nav>
    </header>
  );
}
