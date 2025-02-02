import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutUs",
  title: "Tentang Kami",
  type: "document",
  fields: [
    defineField({
      name: "aboutUsTitle",
      title: "Judul Tentang Kami",
      type: "string",
      description: "Judul utama untuk halaman Tentang Kami",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "greetings",
      title: "Salam Kantin",
      type: "string",
      description: "Slogan atau salam pembuka dari kantin",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "companyDescription",
      title: "Deskripsi Kantin",
      type: "array",
      of: [{ type: "block" }],
      description: "Deskripsi singkat tentang Kantin",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyImage",
      title: "Gambar Kantin",
      type: "image",
      description: "Gambar representasi kantin (misal: logo atau foto kantin)",
      options: { hotspot: true },
    }),
    defineField({
      name: "companyVideo",
      title: "Video Kantin (YouTube)",
      type: "url",
      description: "Masukkan URL video YouTube untuk ditampilkan di iframe",
    }),
    defineField({
      name: "companyVision",
      title: "Visi Kantin",
      type: "array",
      of: [{ type: "block" }],
      description: "Visi perusahaan atau kantin yang ingin dicapai",
    }),
    defineField({
      name: "companyMission",
      title: "Misi Kantin",
      type: "array",
      of: [{ type: "block" }],
      description: "Misi perusahaan atau kantin untuk mencapai visi",
    }),
  ],
});
