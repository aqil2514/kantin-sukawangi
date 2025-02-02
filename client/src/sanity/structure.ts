import { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Base')
    .items([
      S.documentTypeListItem("product").title("Produk"),
      S.divider(),
    ]);
