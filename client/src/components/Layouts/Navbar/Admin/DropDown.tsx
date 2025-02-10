import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KeyRound, LogOut, Settings, User } from "lucide-react";
import { CiGlobe } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DropdownAdmin() {
  const session = useSession();
  const user = session.data?.user as Auth.User;
  const router = useRouter()
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 md:bg-red-600 md:hover:bg-red-500 px-4 py-2 rounded-lg"
        >
          <Image
            src={user.image as string}
            width={32}
            height={32}
            alt="Admin profile Image"
            className="rounded-full"
          />
          <p className="text-sm text-white md:block hidden">{user.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 bg-zinc-800 text-white rounded-md shadow-lg"
      >
        <DropdownMenuItem className="flex gap-2 p-2 hover:bg-zinc-700 cursor-pointer">
          <User size={18} /> Profil
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 p-2 hover:bg-zinc-700 cursor-pointer">
          <Settings size={18} /> Pengaturan
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2 p-2 hover:bg-zinc-700 cursor-pointer">
          <KeyRound size={18} /> Ubah Password
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 p-2 hover:bg-zinc-700 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <CiGlobe size={18} /> Landing Page
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex gap-2 p-2 hover:bg-zinc-700 cursor-pointer text-red-500"
          onClick={() => signOut()}
        >
          <LogOut size={18} /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
