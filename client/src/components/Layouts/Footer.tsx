"use client";

import Image from "next/image";
import Link from "next/link";
import { CiMap } from "react-icons/ci";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { navigatorLinks } from "./Navbar/data";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function Footer() {
  const pathName = usePathname();
  const year = new Date().getFullYear();

  // Memoize navigator links for performance
  const links = useMemo(() => navigatorLinks, []);

  return (
    <footer className="w-full h-auto grid grid-rows-[4rem_auto_3rem] z-50 relative">
      {/* Logo Section */}
      <div className="bg-zinc-800 flex justify-center items-center py-4">
        <Image
          src="/images/logo.png"
          alt="Logo Kantin Sukawangi"
          width={64}
          height={64}
          priority
          className="object-contain"
          aria-label="Logo Kantin Sukawangi"
        />
      </div>

      {/* Main Content */}
      <div className="bg-zinc-800 text-white grid gap-8 md:grid-cols-3 py-8 px-4">
        {/* Contact Section */}
        <div className="text-center flex flex-col gap-4">
          <h3 className="font-lora font-bold underline text-xl md:text-2xl">
            Kontak
          </h3>
          <Link
            href="https://maps.app.goo.gl/ZTLSvJB69uWMY1bm8"
            target="_blank"
            className="flex justify-center items-center gap-2 text-sm md:text-base"
            aria-label="Lokasi Kantin Sukawangi di Google Maps"
          >
            <CiMap className="text-lg md:text-xl" aria-hidden="true" />
            <p>Jl. Raya Sukawangi No.1, Sukawangi, Bekasi, Jawa Barat</p>
          </Link>
          <Link
            href="https://wa.me/62123456789?text=Halo%20Kantin%20Sukawangi,%20saya%20ingin%20memesan!"
            target="_blank"
            className="flex justify-center items-center gap-2 text-sm md:text-base"
            aria-label="Hubungi Kantin Sukawangi melalui WhatsApp"
          >
            <FaWhatsapp className="text-lg md:text-xl" aria-hidden="true" />
            <p>+62 123 456 789</p>
          </Link>
        </div>

        {/* Menu Section */}
        <div className="text-center flex flex-col gap-4">
          <h3 className="font-lora font-bold underline text-xl md:text-2xl">
            Menu
          </h3>
          {links.map((nav, i) => (
            <Link
              href={nav.href}
              key={i}
              className={`text-sm md:text-base ${
                pathName === nav.href
                  ? "font-semibold text-red-500 cursor-default"
                  : "hover:underline"
              }`}
              aria-current={pathName === nav.href ? "page" : undefined}
            >
              {nav.text}
            </Link>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="text-center flex flex-col gap-4">
          <h3 className="font-lora font-bold underline text-xl md:text-2xl">
            Ikuti Kami
          </h3>
          <div className="flex justify-center gap-6 text-2xl md:text-3xl">
            <Link
              href="https://instagram.com/kantin_sukawangi"
              target="_blank"
              className="hover:text-pink-500"
              aria-label="Ikuti kami di Instagram"
            >
              <FaInstagram aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black text-white py-3">
        <p className="text-center text-sm md:text-base">
          &copy; {year} Kantin Sukawangi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
