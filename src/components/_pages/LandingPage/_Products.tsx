import Image from "next/image";
import { products } from "./misc";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Products() {
  return (
    <div className="min-h-screen bg-slate-200 py-4 px-8">
      <h3 className="text-center font-lora font bold text-red-500 text-xl md:text-3xl lg:text-4xl font-bold">
        Produk <span className="text-yellow-500">Kantin Sukawangi</span>
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4 px-4">
        {products.map((product, i) => (
          <div key={`product-${i}`} className="w-full max-w-xs mx-auto">
            {/* Gambar Produk */}
            <div className="relative w-full h-56 overflow-hidden rounded-xl">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="hover:scale-110 transition-transform duration-300 object-cover"
              />
            </div>
            {/* Nama Produk */}
            <p className="mt-2 text-center text-sm font-semibold text-gray-800 line-clamp-1">
              {product.name}
            </p>
            {/* Harga dan Tombol */}
            <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
              <p className="text-sm font-semibold text-green-600 flex-1">
                {formatCurrency(product.price)}
              </p>
              <Button
                variant="destructive"
                className="text-sm w-full sm:w-auto"
              >
                + Keranjang
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant={"destructive"} className="block mx-auto mt-8">
        <Link href={"/products"}>
        Produk Lainnya
        </Link>
      </Button>
    </div>
  );
}
