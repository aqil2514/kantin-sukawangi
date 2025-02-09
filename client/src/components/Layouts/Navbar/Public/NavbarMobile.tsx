import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CiMenuBurger } from "react-icons/ci";
import { navigatorLinks, navigatorUserLinks } from "../data";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaKey } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useGetUser } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NavbarMobile() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden" asChild>
        <Button variant="outline">
          <CiMenuBurger />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[90%]">
        <SheetHeader className="my-2 ">
          <SheetTitle>
            <Link href={"/"}>
              <p className="font-macondo text-xl md:text-2xl font-bold text-red-500">
                Kantin <span className="text-amber-500">Sukawangi</span>
              </p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-screen pb-28">
          <NavbarMobileSession />
          <NavbarMobileNavigation />
          <SheetFooter className="mt-4">
            <SheetClose asChild>
              <Button>Tutup</Button>
            </SheetClose>
          </SheetFooter>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

const NavbarMobileNavigation = () => {
  const pathName = usePathname();

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-100 rounded-lg shadow-md my-4">
      <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
        Navigasi
      </h3>
      {navigatorLinks.map((nav, i) =>
        pathName === nav.href ? (
          <p
            key={i}
            className="cursor-default text-gray-600 font-medium px-3 py-2 rounded-md bg-gray-200 flex items-center gap-2"
          >
            {nav.icon}
            {nav.text}
          </p>
        ) : (
          <Link
            href={nav.href}
            key={i}
            className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-300 transition-all duration-200 flex items-center gap-2"
          >
            {nav.icon}
            {nav.text}
          </Link>
        )
      )}
    </div>
  );
};

const NavbarMobileSession = () => {
  const { user, session } = useGetUser();
  const pathName = usePathname();

  if (!session)
    return (
      <Link href="/auth">
        <Button className="w-full flex items-center gap-2 bg-green-600 hover:bg-green-500 transition-all duration-300 my-4">
          <FaKey />
          <span>Login</span>
        </Button>
      </Link>
    );

  return (
    <div className="flex flex-col items-center text-center p-4 bg-gray-100 rounded-lg shadow-md">
      <figure className="flex flex-col items-center">
        <div className="relative w-16 h-16 overflow-hidden rounded-full border border-gray-300">
          <Image
            src={user.image || "/default-avatar.png"}
            alt={user.name || "User Avatar"}
            fill
            className="object-cover"
          />
        </div>
        <figcaption className="mt-2 font-medium text-gray-700">
          {user.name}
        </figcaption>
      </figure>

      <div className="mt-4 w-full flex justify-center gap-4">
        {navigatorUserLinks.map((link) => {
          const isAdminLink = link.allowFor === "admin" && user.role !== "admin";
          const isActive = pathName === link.href;

          if (isAdminLink) {
            return null;
          }

          return isActive ? (
            <Button
              key={link.href}
              className="flex items-center gap-2 transition-all duration-300 text-left bg-white hover:bg-white cursor-default"
            >
              {link.icon}
            </Button>
          ) : (
            <Link key={link.href} href={link.href} title={link.text} className="text-left">
              <Button className="w-full flex items-center gap-2 transition-all duration-300 text-left hover:bg-white bg-slate-200">
                {link.icon}
              </Button>
            </Link>
          );
        })}
      </div>

      <Button
        className="w-full flex items-center gap-2 justify-center bg-red-600 hover:bg-red-500 transition-all duration-300 mt-4"
        onClick={() => signOut()}
      >
        <LogOut />
        <span>Logout</span>
      </Button>
    </div>
  );
};