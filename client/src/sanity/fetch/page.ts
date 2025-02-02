import { client } from "../lib/client";

export async function getHomeData() {
  return (await client.fetch(
    `*[_type == "home"] {
  companyName,
  companyMotto
}[0]
`
  )) as Page.Home;
}

export async function getCartData(){
  const groq = `*[_type == "cart"] {
  pageTitle,
  noItems,
  checkout,
  detailOrder,
  shoppingCta,
  amountOrder,
  amountShip,
  totalAmount,
  detailContinueOrder,
  continueOrder,
  orderToken,
  inputTokenPlaceholder,
  sendToken
}[0]
`
  return await client.fetch(groq) as Page.Cart
}
