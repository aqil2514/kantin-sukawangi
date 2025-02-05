"use client";

import Container from "@/components/Layouts/Container";
import AboutProvider from "./Provider";
import Image from "next/image";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

// TODO : Adjust UI
export default function About({ staticData }: { staticData: Page.AboutUs }) {
  const {
    aboutUsTitle,
    companyDescription,
    companyImage,
    greetings,
    companyVideo,
    companyMission,
    companyVision,
  } = staticData;

  // Placeholder image jika companyImage tidak tersedia
  const imageUrl =
    companyImage || "/images/placeholders/placeholder-600x400.jpg";

  return (
    <AboutProvider staticData={staticData}>
      <Container type="main">
        {/* Judul & Salam */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl font-extrabold text-gray-800">
            {aboutUsTitle}
          </h1>
          <p className="text-lg italic text-gray-600 mt-2">{greetings}</p>
        </motion.div>

        {/* Video Kantin */}
        {companyVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center mt-6"
          >
            <iframe
              width="600"
              height="340"
              src={companyVideo.replace("watch?v=", "embed/")}
              title="Company Video"
              frameBorder="0"
              allowFullScreen
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        )}

        {/* Deskripsi dan Gambar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Deskripsi */}

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="prose max-w-none mt-4 text-gray-700 leading-relaxed"
          >
            <ScrollArea className="h-[400px] text-justify pr-4">
              <PortableText value={companyDescription} />
            </ScrollArea>
          </motion.div>

          {/* Gambar dengan Placeholder & Animasi */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex justify-center"
          >
            <Image
              src={imageUrl}
              alt="Company Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover transition-transform duration-300 hover:scale-105"
            />
          </motion.div>
        </div>

        {/* Visi dan Misi  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          {/* Visi Kantin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="mt-10 prose text-center text-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-800">Visi Kami</h2>
            <ScrollArea className="h-[200px] text-justify pr-4 mt-4">
              <PortableText value={companyVision} components={ListComponent} />
            </ScrollArea>
          </motion.div>

          {/* Misi Kantin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            className="mt-10 prose text-center text-gray-700"
          >
            <h2 className="text-2xl font-bold text-gray-800">Misi Kami</h2>
            <ScrollArea className="h-[200px] text-justify pr-4 mt-4">
              <PortableText value={companyMission} components={ListComponent} />
            </ScrollArea>
          </motion.div>
        </div>
      </Container>
    </AboutProvider>
  );
}

const ListComponent: PortableTextComponents = {
  list: {
    bullet: ({ children }) => <ul className="list-disc ml-5">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal ml-5">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
};
