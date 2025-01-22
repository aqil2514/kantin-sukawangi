"use client";

import { useStore } from "@/lib/store";
import React from "react";
import NoProducts from "./NoProducts";
import WithProducts from "./WithProducts";

export default function Checkout() {
  const { cartItems } = useStore();

  return (
    <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      <div className="my-4">
        {cartItems.length === 0 ? <NoProducts /> : <WithProducts />}
      </div>
    </div>
  );
}
