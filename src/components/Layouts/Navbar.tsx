// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { FaWhatsapp } from "react-icons/fa";
// import { navigatorLinks } from "./misc";
// import { usePathname } from "next/navigation";
// import NavbarMobile from "./NavbarMobile";
// import { useMemo } from "react";
// import NavbarCarts from "./NavbarCarts";

// export default function Navbar() {
//   const pathName = usePathname();

//   // Memoize navigatorLinks to optimize performance
//   const links = useMemo(() => navigatorLinks, []);

//   return (
//     <header className="w-full fixed top-0 left-0 z-50">
//       {/* WhatsApp Contact */}
//       <div className="bg-emerald-500 px-4 flex items-center h-8 sm:h-10">
//         <Link
//           target="_blank"
//           href="https://wa.me/6285774885367?text=Halo%20Kantin%20Sukawangi,%20saya%20ingin%20memesan!"
//           className="flex gap-2 items-center text-white"
//           aria-label="Hubungi kami melalui WhatsApp"
//         >
//           <FaWhatsapp aria-hidden="true" />
//           <p className="text-sm sm:text-base">+62 857 7488 5367</p>
//         </Link>
//       </div>

//       {/* Main Navigation */}
//       <nav className="flex px-4 justify-between md:justify-center gap-8 items-center flex-wrap h-24 bg-white shadow-md relative">
//         {/* Logo */}
//         <Link href="/" aria-label="Beranda">
//           <figure className="flex gap-2 items-center">
//             <div className="h-8 w-8 sm:h-12 sm:w-12 md:w-16 md:h-16 relative">
//               <Image
//                 src="/images/logo.png"
//                 alt="Logo Kantin Sukawangi"
//                 fill
//                 sizes="auto"
//                 priority
//               />
//             </div>
//             <p className="font-macondo text-xl md:text-2xl font-bold text-red-500">
//               Kantin <span className="text-amber-500">Sukawangi</span>
//             </p>
//           </figure>
//         </Link>

//         {/* Desktop Navigation */}
//         <div className="font-oswald hidden md:flex gap-6">
//           {links.map((nav, i) => (
//             <Link
//               href={nav.href}
//               key={i}
//               className={`text-base ${
//                 pathName === nav.href
//                   ? "text-red-500 font-bold cursor-default"
//                   : "text-gray-600 hover:text-red-500"
//               }`}
//               aria-current={pathName === nav.href ? "page" : undefined}
//             >
//               {nav.text}
//             </Link>
//           ))}
//         </div>

//         <NavbarCarts />

//         {/* Mobile Navigation */}
//         <NavbarMobile />
//       </nav>
//     </header>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { navigatorLinks } from "./misc";
import { usePathname } from "next/navigation";
import NavbarMobile from "./NavbarMobile";
import { useMemo } from "react";
import NavbarCarts from "./NavbarCarts";

export default function Navbar() {
  const pathName = usePathname();

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

        {/* Navbar Carts */}
        <NavbarCarts />

        {/* Mobile Navigation */}
        <NavbarMobile />
      </nav>
    </header>
  );
}
