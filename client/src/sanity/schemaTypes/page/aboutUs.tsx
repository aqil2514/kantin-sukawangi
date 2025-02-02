import { defineField, defineType } from "sanity";

//TODO : Lanjutin ini
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
      type: "array",  // Menggunakan array untuk block content
      of: [
        {
          type: "block",  // Menentukan tipe block content
        },
      ],
      description: "Deskripsi singkat tentang Kantin",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "companyImage",
      title: "Gambar Kantin",
      type: "image",
      description: "Gambar representasi kantin (misal: logo atau foto kantor)",
      options: {
        hotspot: true, // Memungkinkan untuk crop dan zoom gambar
      },
    }),
  ],
});
