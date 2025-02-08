import type { Metadata } from "next";
import { Geist, Geist_Mono, Macondo, Oswald, Lora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Layouts/Footer";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Navbar from "@/components/Layouts/Navbar";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head";

export const metadata: Metadata = {
  title: {
    default: "Kantin Sukawangi",
    template: "%s | Kantin Sukawangi",
  },
  description:
    "Nikmati berbagai pilihan makanan dan minuman lezat di Kantin Sukawangi.",
  keywords: [
    "Kantin Sukawangi",
    "makanan enak",
    "minuman segar",
    "kantin online",
    "pesan makanan",
  ],
  openGraph: {
    title: "Kantin Sukawangi",
    description:
      "Nikmati berbagai pilihan makanan dan minuman lezat di Kantin Sukawangi.",
    url: "https://kantin-sukawangi.vercel.app/",
    siteName: "Kantin Sukawangi",
    images: [
      {
        url: "/api/og?title=Kantin%20Sukawangi&desc=Nikmati%20berbagai%20pilihan%20makanan%20dan%20minuman%20lezat",
        width: 1200,
        height: 630,
        alt: "Kantin Sukawangi",
      },
    ],
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kantin Sukawangi",
    description:
      "Nikmati berbagai pilihan makanan dan minuman lezat di Kantin Sukawangi.",
    images: [
      "/api/og?title=Kantin%20Sukawangi&desc=Nikmati%20berbagai%20pilihan%20makanan%20dan%20minuman%20lezat",
    ],
  },
  metadataBase: new URL("https://kantin-sukawangi.vercel.app/"),
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "AQdQ6iFFZcojBbTl9fIdqbzoAYZ5qNBbgdevebLXVRY",
  },
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kantin Sukawangi",
    url: "https://kantin-sukawangi.vercel.app/",
    logo: "https://kantin-sukawangi.vercel.app/images/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+62-856-9327-3746",
      contactType: "customer service",
      areaServed: "ID",
      availableLanguage: "Indonesian",
    },
  };

  return (
    <html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
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
