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
import { navigatorLinks } from "../misc";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaKey } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function NavbarMobile() {
  const pathName = usePathname();
  const { data: session } = useSession();
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden" asChild>
        <Button variant="outline">
          <CiMenuBurger />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <p className="font-macondo text-xl md:text-2xl font-bold text-red-500">
                Kantin <span className="text-amber-500">Sukawangi</span>
              </p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        {session ? (
          <Button
            className="relative bg-red-600 hover:bg-red-500 transition-all duration-300"
            onClick={() => signOut()}
          >
            <LogOut /> Logout
          </Button>
        ) : (
          <Link href={"/auth"}>
            <Button className="relative bg-green-600 hover:bg-green-500 transition-all duration-300">
              <FaKey />
              Login
            </Button>
          </Link>
        )}
        <div className="flex flex-col gap-4">
          {navigatorLinks.map((nav, i) =>
            pathName === nav.href ? (
              <p key={i} className="cursor-default">
                {nav.text}
              </p>
            ) : (
              <Link href={nav.href} key={i}>
                {nav.text}
              </Link>
            )
          )}
        </div>
        <SheetFooter className="mt-4">
          <SheetClose asChild>
            <Button>Tutup</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
