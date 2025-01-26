import LandingPage from "@/components/_pages/LandingPage";
import { Metadata } from "next";

export const metadata:Metadata={
  title:"Beranda | Kantin Sukawangi",
  description:"Halaman landing page Kantin Sukawangi"
}

export default function Home() {
  return <LandingPage />;
}
