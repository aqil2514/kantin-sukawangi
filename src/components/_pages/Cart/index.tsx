"use client"
import { useCartStore } from "@/lib/store-cart";

// TODO : Kerjain ini nanti

export default function Cart() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cartItems } = useCartStore();
  return <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">ok</div>;
}
