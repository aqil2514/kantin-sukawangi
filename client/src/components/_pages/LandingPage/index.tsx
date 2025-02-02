import { servedProductList } from "@/sanity/fetch/products";
import HeroSection from "./_Hero";
import Products from "./_Products";

export default async function LandingPage() {
  const servedProducts = await servedProductList();
  return (
    <>
      <HeroSection />
      <Products products={servedProducts} />
    </>
  );
}
