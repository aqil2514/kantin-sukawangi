import Products from "@/components/_pages/(Public)/Products";
import ProductsProvider from "@/components/_pages/(Public)/Products/Provider";
import { servedProductList } from "@/sanity/fetch/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk",
  description: "Produk-produk yang ada di Kantin Sukawangi",
};

export default async function ProductsPage() {
  const productData = await servedProductList();

  return (
    <ProductsProvider productsLists={productData}>
      <Products />
    </ProductsProvider>
  );
}
