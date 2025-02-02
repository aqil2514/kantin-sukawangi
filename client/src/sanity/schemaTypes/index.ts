import { type SchemaTypeDefinition } from "sanity";
import product from "./product";
import home from "./page/home";
import cart from "./page/cart";
import aboutUs from "./page/aboutUs";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, home, cart, aboutUs],
};
