"use client";

import React, { createContext, useContext, useState } from "react";

const ProductsContext = createContext<Product.ProductsContextProps>(
  {} as Product.ProductsContextProps
);

export default function ProductsProvider({
  children,
  productsLists,
}: Product.ProductsProviderProps) {
  const [products, setProducts] =
    useState<Product.ProductAttributes[]>([]);

    const value:Product.ProductsContextProps = {
      products,
      setProducts,
      initProducts: productsLists
    }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);