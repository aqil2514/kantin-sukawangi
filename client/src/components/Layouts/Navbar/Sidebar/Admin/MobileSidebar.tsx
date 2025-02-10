import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import UserInfo from "./UserInfo";
import AdminSidebarMenu from "./Menu";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu className="text-white cursor-pointer hover:text-red-500 transition" />
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-zinc-800 border-none">
        <SheetHeader>
          <SheetTitle className="text-white">Kantin Sukawangi</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-screen">
          <div className="my-4 pb-12">
            <UserInfo />

            <AdminSidebarMenu />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
