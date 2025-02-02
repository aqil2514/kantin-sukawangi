import { Button } from "../../ui/button";
import { FaCartShopping } from "react-icons/fa6";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { useCartStore } from "@/lib/store-cart";
import { FaTrashAlt } from "react-icons/fa";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import Link from "next/link";

export default function NavbarCarts() {
  const { cartItems, increaseCartItem, decreaseCartItem, removeCartItem } =
    useCartStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="hidden md:block relative hover:bg-gray-100 transition-all duration-300"
        >
          {/* Ikon Keranjang */}
          <FaCartShopping />

          {/* Badge jumlah barang */}
          {cartItems.length > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs rounded-full">
              {cartItems.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="p-6 bg-white shadow-xl rounded-lg max-w-[400px] sm:max-w-[500px]"
      >
        <SheetHeader>
          <SheetTitle>
            <p className="font-macondo text-xl md:text-2xl font-bold text-red-500">
              Keranjang <span className="text-amber-500">Belanja</span>
            </p>
          </SheetTitle>
          <SheetDescription>
            <Link href="/cart">
              <Button className="flex items-center gap-2 bg-blue-700 text-white hover:bg-blue-500 transition-all duration-200">
                <FaCartShopping />
                Keranjang Anda
              </Button>
            </Link>
            Barang belanjaan akan muncul di sini
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="max-h-[400px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">
              Kamu belum menambahkan apa pun ke keranjang
            </p>
          ) : (
            <div className="space-y-4 mt-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Gambar Produk */}
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md shadow-md"
                      />
                    )}
                    <div>
                      <p className="font-semibold line-clamp-2">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.price)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => decreaseCartItem(item.id)}
                      className="bg-red-600 text-white hover:bg-red-500 transition-all duration-200"
                    >
                      -
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => increaseCartItem(item.id)}
                      className="bg-green-600 text-white hover:bg-green-500 transition-all duration-200"
                    >
                      +
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCartItem(item.id)}
                      className="bg-gray-300 hover:bg-gray-400 transition-all duration-200"
                    >
                      <FaTrashAlt />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        {/* Tombol Checkout */}
        {cartItems.length > 0 && (
          <SheetFooter className="mt-4 flex flex-col gap-2">
            <Link href={"/checkout"}>
              <Button className="w-full bg-green-500 text-white hover:bg-green-400 transition-all duration-200">
                Checkout
              </Button>
            </Link>
            <SheetClose asChild>
              <Button className="w-full bg-red-500 text-white hover:bg-red-400 transition-all duration-200">
                Tutup
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
