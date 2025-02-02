import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const sanityConfig = {
  projectId: "your_project_id", // Ganti dengan ID proyek Sanity kamu
  dataset: "production", // Sesuaikan dengan dataset yang kamu pakai
  apiVersion: "2023-01-01", // Versi API, bisa disesuaikan dengan yang terbaru
  useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(sanityConfig);

const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: never) => builder.image(source);
