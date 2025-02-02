import { getSession } from "next-auth/react";
import { defineType, defineField } from "sanity";

// Ambil username setelah sesi valid
const getUserName = async () => {
  const session = await getSession();
  const user = session?.user as Auth.User;
  return user?.name || "Anonymous";
};

export default defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Nama produk.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Slug untuk URL produk.",
      options: {
        source: "name", // Membuat slug otomatis berdasarkan nama produk
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Deskripsi singkat mengenai produk.",
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      description: "Harga produk dalam format angka.",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      description: "Gambar produk yang digunakan untuk ditampilkan.",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description:
        "Kategori produk, seperti 'Main Course', 'Snack', atau 'Drink'.",
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    // Ganti 'createdBy' menjadi string tanpa pemanggilan asinkron di sini
    defineField({
      name: "createdBy",
      title: "Created By",
      type: "string",
      description: "ID atau nama pengguna yang membuat produk.",
      readOnly: true, // Read-only, diatur otomatis
      // Menggunakan initialValue yang diatur di hook atau lifecycle
    }),
    // Store the creation date of the product
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      description: "Tanggal saat produk dibuat.",
      readOnly: true, // Read-only, diatur otomatis
    }),
    // Store the last update date of the product
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      description: "Tanggal saat produk terakhir diperbarui.",
      readOnly: true, // Read-only, diatur otomatis
    }),
  ],
  initialValue: {
    createdAt: new Date().toISOString(), // Menetapkan tanggal pembuatan otomatis
    updatedAt: new Date().toISOString(), // Menetapkan tanggal update otomatis
  },
  //@ts-expect-error Bawaan sanity
  hooks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeCreate: async (document:any) => {
      const userName = await getUserName();
      return {
        ...document,
        createdBy: userName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    beforeUpdate: async (document:any) => {
      return {
        ...document,
        updatedAt: new Date().toISOString(),
      };
    },
  },
});
