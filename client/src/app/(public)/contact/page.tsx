import Contact from "@/components/_pages/(Public)/Contact";
import { getContactPage } from "@/sanity/fetch/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak Kami",
};

export default async function ContactPage() {
  const staticData = await getContactPage();
  console.log(staticData)

  return <Contact staticData={staticData} />;
}
