import { Globe, Home } from "lucide-react";
import { MdFastfood } from "react-icons/md";
import { StructureResolver } from "sanity/structure";
import { FaShoppingCart } from "react-icons/fa";

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
                .title("Cart")
                .child(S.document().schemaType("cart").documentId("cart"))
                .icon(FaShoppingCart),
            ])
        ),
      S.documentTypeListItem("product").title("Produk").icon(MdFastfood),
    ]);
