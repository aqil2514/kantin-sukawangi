import LandingPage from "@/components/_pages/(Public)/LandingPage";
import { getHomeData } from "@/sanity/fetch/page";
import { servedProductList } from "@/sanity/fetch/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda | Kantin Sukawangi",
  description: "Halaman landing page Kantin Sukawangi",
};

export default async function Home() {
  const data = await getHomeData();
  const servedProducts = await servedProductList();

  return <LandingPage data={data} servedProducts={servedProducts} />;
}
