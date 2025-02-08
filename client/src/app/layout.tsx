import type { Metadata } from "next";
import { Geist, Geist_Mono, Macondo, Oswald, Lora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/Layouts/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: {
    default: "Kantin Sukawangi",
    template: "%s | Kantin Sukawangi",
  },
  description: "Kantin Sukawangi",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const macondoFont = Macondo({
  variable: "--font-macondo",
  subsets: ["latin"],
  weight: "400",
});

const oswaldFont = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: "400",
});

const loraFont = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: "400",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${macondoFont.variable} ${oswaldFont.variable} ${loraFont.variable} antialiased`}
        >
          <Navbar />
          <Toaster />
          {children}
          <Footer />
          <GoogleAnalytics gaId="G-78NX9JXXG3" />
        </body>
      </SessionProvider>
    </html>
  );
}
