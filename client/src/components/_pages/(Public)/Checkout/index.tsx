"use client";

import React from "react";
import NoProducts from "./NoProducts";
import WithProducts from "./WithProducts";
import { useCartStore } from "@/lib/store/cart";

export default function Checkout() {
  const { cartItems } = useCartStore();

  return (
    <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="my-4">
        {cartItems.length === 0 ? <NoProducts /> : <WithProducts />}
      </div>
    </div>
  );
}
