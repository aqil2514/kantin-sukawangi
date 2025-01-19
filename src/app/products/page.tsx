import { products } from "@/components/_pages/LandingPage/misc";
import Products from "@/components/_pages/Products";
import ProductsProvider from "@/components/_pages/Products/Provider";

export default function ProductsPage() {
  return (
    <ProductsProvider productsLists={products}>
      <Products />
    </ProductsProvider>
  );
}
