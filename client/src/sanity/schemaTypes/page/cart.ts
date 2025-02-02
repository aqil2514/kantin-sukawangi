import { defineField, defineType } from "sanity";

export default defineType({
  name: "cart",
  title: "Cart",
  type: "document",
  fields: [
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Judul halaman untuk Cart.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "noItems",
      title: "No Items",
      type: "string",
      description: "Teks yang menunjukkan jumlah item di keranjang.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "checkout",
      title: "Checkout",
      type: "string",
      description: "Teks tombol untuk melanjutkan ke checkout.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "detailOrder",
      title: "Detail Order",
      type: "string",
      description: "Teks untuk menunjukkan detail pesanan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "shoppingCta",
      title: "Shopping CTA",
      type: "string",
      description: "Teks Call-to-Action untuk melanjutkan berbelanja.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "amountOrder",
      title: "Amount Order",
      type: "string",
      description: "Jumlah total untuk pesanan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "amountShip",
      title: "Amount Ship",
      type: "string",
      description: "Jumlah biaya pengiriman.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "totalAmount",
      title: "Total Amount",
      type: "string",
      description: "Jumlah total yang harus dibayar (termasuk biaya pengiriman).",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "detailContinueOrder",
      title: "Detail Continue Order",
      type: "string",
      description: "Teks untuk melanjutkan pesanan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "continueOrder",
      title: "Continue Order",
      type: "string",
      description: "Teks tombol untuk melanjutkan pesanan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "orderToken",
      title: "Order Token",
      type: "string",
      description: "Token untuk pesanan, digunakan untuk identifikasi.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "inputTokenPlaceholder",
      title: "Input Token Placeholder",
      type: "string",
      description: "Placeholder untuk input token pesanan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "sendToken",
      title: "Send Token",
      type: "string",
      description: "Teks tombol untuk mengirimkan token.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
  ],
});
