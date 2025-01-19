import { products } from "@/components/_pages/LandingPage/misc";
import Products from "@/components/_pages/Products";
import ProductsProvider from "@/components/_pages/Products/Provider";
import { Metadata } from "next";

export const metadata:Metadata = {
  title:"Produk",
  description:"Produk-produk yang ada di Kantin Sukawangi"
}

export default function ProductsPage() {
  return (
    <ProductsProvider productsLists={products}>
      <Products />
    </ProductsProvider>
  );
}
