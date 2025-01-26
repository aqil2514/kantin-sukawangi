"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useProducts } from "./Provider";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/lib/store-cart";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function ProductsLists() {
  const { products, initProducts, setProducts } = useProducts();
  const { cartItems, addToCart, decreaseCartItem, increaseCartItem } =
    useCartStore();
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const productsPerPage = 6; // Products per page

  // Reset products on initialization
  useEffect(() => {
    setProducts(initProducts);
  }, [initProducts, setProducts, cartItems]);

  // Calculate the start and end indices for products on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex); // Products for the current page

  // Change page handler
  const changePage = (page: number) => {
    if (page > 0 && page <= Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <ScrollArea>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4 px-4">
        {currentProducts.length === 0 ? (
          <p className="font-oswald text-center text-lg">Ups... Produk tidak tersedia...</p>
        ) : (
          currentProducts.map((product, i) => {
            const selectedProduct = cartItems.find(
              (item) => item.id === String(product.id)
            );

            return (
              <div key={`product-${i}`} className="w-full max-w-xs mx-auto">
                {/* Product Image */}
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

                {/* Product Name */}
                <p className="mt-2 text-center text-sm font-semibold text-gray-800 line-clamp-1">
                  {product.name}
                </p>

                {/* Price and Button */}
                <div className="flex flex-wrap justify-between items-center gap-2 mt-2">
                  <p className="text-sm font-semibold text-green-600 flex-1">
                    {formatCurrency(product.price)}
                  </p>
                  {selectedProduct ? (
                    <div className="flex gap-2">
                      <Button
                        variant={"destructive"}
                        onClick={() => decreaseCartItem(String(product.id))}
                        aria-label="Decrease quantity"
                      >
                        <FaAngleDown />
                      </Button>

                      <p className="my-auto">{selectedProduct.quantity}</p>

                      <Button
                        variant={"destructive"}
                        onClick={() => increaseCartItem(String(product.id))}
                        aria-label="Increase quantity"
                      >
                        <FaAngleUp />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="destructive"
                      className="text-sm w-full sm:w-auto"
                      onClick={() => addToCart(product)}
                      disabled={!product.isAvailable}
                      aria-label={product.isAvailable ? "Add to cart" : "Out of stock"}
                    >
                      {product.isAvailable ? "+ Keranjang" : "Stok Habis"}
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
          aria-label="Previous page"
        >
          &lt; Prev
        </Button>
        <p className="font-medium">
          Page {currentPage} of {Math.ceil(products.length / productsPerPage)}
        </p>
        <Button
          variant="outline"
          disabled={currentPage === Math.ceil(products.length / productsPerPage)}
          onClick={() => changePage(currentPage + 1)}
          aria-label="Next page"
        >
          Next &gt;
        </Button>
      </div>
    </ScrollArea>
  );
}
