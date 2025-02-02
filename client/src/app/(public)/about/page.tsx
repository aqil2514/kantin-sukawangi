import About from "@/components/_pages/(Public)/About";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
};

export default function AboutPage() {
  return <About />;
}
