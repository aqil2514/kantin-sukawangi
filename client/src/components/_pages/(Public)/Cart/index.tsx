"use client";
import Checkout from "./RightSide";
import Products from "./LeftSide";
import CartProvider from "./Providers";

export default function Cart({ data }: { data: Page.Cart }) {
  return (
    <CartProvider data={data}>
      <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Keranjang Anda</h1>

        <div className="grid grid-cols-1 md:grid-cols-[60%_auto] gap-4">
          {/* Products */}
          <Products />
          <Checkout />
        </div>
      </div>
    </CartProvider>
  );
}
