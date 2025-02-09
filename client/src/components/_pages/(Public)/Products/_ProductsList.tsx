"use client";
import { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useProducts } from "./Provider";
import { useCartStore } from "@/lib/store/cart";
import NoProductsFound from "./NoProductsFound";
import ProductsItem from "./ProductsItem";

export default function ProductsLists() {
  const { products, initProducts, setProducts } = useProducts();
  const { cartItems } = useCartStore();
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
  const isNoProducts = currentProducts.length === 0;

  // Change page handler
  const changePage = (page: number) => {
    if (page > 0 && page <= Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(page);
    }
  };

  return (
    <ScrollArea className="w-full h-full pb-8 md:pb-0">
      <div
        className={`grid ${isNoProducts ? "grid-cols-1 sm:grid-cols-1 md:grid-cols-1" : "grid-cols-2"} sm:grid-cols-2 md:grid-cols-3 gap-4 py-4 my-4 px-0 md:px-4`}
      >
        {isNoProducts ? (
          <NoProductsFound />
        ) : (
          currentProducts.map((product, i) => {
            const selectedProduct = cartItems.find(
              (item) => item.id === String(product.id)
            );

            return (
              <ProductsItem
                product={product}
                key={`product-${i}`}
                selectedProduct={selectedProduct}
              />
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!isNoProducts && (
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
            disabled={
              currentPage === Math.ceil(products.length / productsPerPage)
            }
            onClick={() => changePage(currentPage + 1)}
            aria-label="Next page"
          >
            Next &gt;
          </Button>
        </div>
      )}
    </ScrollArea>
  );
}
