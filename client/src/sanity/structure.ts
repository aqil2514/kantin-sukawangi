import { Globe, Home } from "lucide-react";
import { MdFastfood } from "react-icons/md";
import { StructureResolver } from "sanity/structure";
import { FaShoppingCart } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { IoMdContact } from "react-icons/io";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Base")
    .items([
      S.listItem()
        .title("Page")
        .icon(Globe)
        .child(
          S.list()
            .title("Halaman")
            .items([
              S.listItem()
                .title("Beranda")
                .child(S.document().schemaType("home").documentId("home"))
                .icon(Home),
              S.listItem()
                .title("Keranjang")
                .child(S.document().schemaType("cart").documentId("cart"))
                .icon(FaShoppingCart),
              S.listItem()
                .title("Tentang Kami")
                .child(S.document().schemaType("aboutUs").documentId("aboutUs"))
                .icon(FcAbout),
              S.listItem()
                .title("Kontak")
                .child(S.document().schemaType("contactPage").documentId("contactPage"))
                .icon(IoMdContact),
            ])
        ),
      S.documentTypeListItem("product").title("Produk").icon(MdFastfood),
    ]);
