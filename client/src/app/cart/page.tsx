import Cart from "@/components/_pages/Cart";
import { getCartData } from "@/sanity/fetch/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
};

export default async function CartPage() {
  const data = await getCartData();
  return <Cart data={data} />;
}
