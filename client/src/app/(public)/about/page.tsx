import About from "@/components/_pages/(Public)/About";
import { getAboutPageData } from "@/sanity/fetch/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default async function AboutPage() {
  const staticData = await getAboutPageData();
  
  return <About staticData={staticData} />;
}
