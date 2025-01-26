"use client"
import Checkout from "./Checkout";
import Products from "./Products";


export default function Cart() {
  
  return (
    <div className="px-4 pt-40 pb-12 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Keranjang Anda</h1>

      <div className="grid grid-cols-[60%_auto] gap-4">
        {/* Products */}
        <Products />
        <Checkout />
      </div>
    </div>
  );
}
