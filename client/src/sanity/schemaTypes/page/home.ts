import { defineField, defineType } from "sanity";

export default defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Nama Usaha",
      type: "string",
      description: "Nama tempat usaha yang dijalankan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
    defineField({
      name: "companyMotto",
      title: "Slogan Usaha",
      type: "string",
      description: "Slogan tempat usaha yang dijalankan.",
      validation: (Rule) => Rule.required().min(1).max(100),
    }),
  ],
});
