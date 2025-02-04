import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Halaman Kontak",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Halaman",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      description: "Deskripsi singkat tentang cara menghubungi kantin",
    }),
    defineField({
      name: "address",
      title: "Alamat",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Nomor Telepon",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^\+?\d{7,15}$/, {
          name: "Nomor Telepon",
          invert: false,
        }).warning("Gunakan format yang benar, misalnya +6281234567890"),
    }),
    defineField({
      name: "emails",
      title: "Email",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "email",
              title: "Email",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "map",
      title: "Peta (Embed Google Maps)",
      type: "url",
      description: "Masukkan link embed Google Maps lokasi kantin",
    }),
    defineField({
      name: "googleMap",
      title: "Peta",
      type: "url",
      description: "Masukkan link hasil share location Google Maps",
    }),
    defineField({
      name: "socialMedia",
      title: "Media Sosial",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                ],
                layout: "dropdown",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL Profil",
              type: "url",
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
