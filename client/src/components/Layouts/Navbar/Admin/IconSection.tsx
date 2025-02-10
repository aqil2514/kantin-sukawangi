import { Button } from "@/components/ui/button";
import { Bell, MessageCircle, RefreshCw } from "lucide-react";

export default function IconSection() {
  return (
    <div className="hidden md:flex items-center gap-6 text-white">
      <Button className="p-2 hover:text-red-500 transition">
        <RefreshCw size={22} />
      </Button>
      <Button className="relative p-2 hover:text-red-500 transition">
        <Bell size={22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
          3
        </span>
      </Button>
      <Button className="relative p-2 hover:text-red-500 transition">
        <MessageCircle size={22} />
        <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-4 h-4 flex items-center justify-center rounded-full">
          5
        </span>
      </Button>
    </div>
  );
}
