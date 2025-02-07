import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"; // Pastikan path benar
import Image from "next/image";
import { Button } from "@/components/ui/button"; // CTA Button
import { useCartStore } from "@/lib/store-cart";
import { useCartContext } from "./Providers";

export default function Products() {
  const { cartItems, decreaseCartItem, increaseCartItem, removeCartItem } =
    useCartStore();
  const { value, items, setItems } = useCartContext();

  useEffect(() => {
    if (value === "checkout") return setItems(cartItems);
    else if (value === "continue") return setItems([]);
    else if (value === "chatWa") return setItems(cartItems);
  }, [value, setItems, cartItems]);

  return (
    <ScrollArea className="bg-white shadow-md h-[432px] p-4 rounded-lg">
      <div className="flex flex-col gap-4">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-500">
              {value === "checkout" || value === "chatWa"
                ? "Keranjang Anda kosong."
                : "Silahkan masukkan order id atau token pembayaran untuk melihat pesanan anda"}
            </p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md"
            >
              {/* Gambar Produk */}
              <Image
                src={`${item.imageUrl}`}
                alt={item.name}
                width={64}
                height={64}
                className="w-16 h-16 object-cover rounded-lg"
              />

              {/* Detail Produk */}
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-700">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x Rp{item.price.toLocaleString("id-ID")}
                </p>
              </div>

              {/* Total Harga per Produk */}
              <div className="flex flex-col items-end">
                <p className="font-medium text-gray-700">
                  Rp{(item.price * item.quantity).toLocaleString("id-ID")}
                </p>
                {(value === "checkout" || value === "chatWa") && (
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => decreaseCartItem(item.id)}
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => increaseCartItem(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </ScrollArea>
  );
}
