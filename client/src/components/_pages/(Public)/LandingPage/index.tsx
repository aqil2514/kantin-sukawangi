"use client";
import HeroSection from "./_Hero";
import Products from "./_Products";
import HomeProvider, { HomeContextProps } from "./Provider";

export default function LandingPage({
  data,
  servedProducts,
}: HomeContextProps) {
  return (
    <HomeProvider data={data} servedProducts={servedProducts}>
      <HeroSection />
      <Products />
    </HomeProvider>
  );
}
