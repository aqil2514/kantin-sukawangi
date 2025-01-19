"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProducts } from "./Provider";
import { formatCurrency } from "@/lib/utils";

export default function ProductsLists() {
  const { products, initProducts, setProducts } = useProducts();
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const productsPerPage = 6; // Produk per halaman

  // Mengatur ulang produk saat inisialisasi
  useEffect(() => {
    setProducts(initProducts);
  }, [initProducts, setProducts]);

  // Hitung indeks awal dan akhir untuk produk di halaman saat ini
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex); // Produk di halaman ini

  // Fungsi untuk mengubah halaman
  const changePage = (page: number) => {
    if (page > 0 && page <= Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <ScrollArea>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 px-4">
        {currentProducts.length === 0 ? (
          <p className="font-oswald">Ups... Produk tidak tersedia...</p>
        ) : (
          currentProducts.map((product, i) => (
            <div key={`product-${i}`} className="w-full max-w-xs mx-auto">
              {/* Gambar Produk */}
              <div className="relative w-full h-56 overflow-hidden rounded-xl">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  sizes="auto"
                  className={`hover:scale-110 transition-transform duration-300 object-cover ${
                    product.isAvailable ? "opacity-100" : "opacity-50"
                  }`}
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
                  disabled={!product.isAvailable}
                >
                  {product.isAvailable ? "+ Keranjang" : "Stok Habis"}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          &lt; Prev
        </Button>
        <p className="font-medium">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </p>
        <Button
          variant="outline"
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage)
          }
          onClick={() => changePage(currentPage + 1)}
        >
          Next &gt;
        </Button>
      </div>
    </ScrollArea>
  );
}
