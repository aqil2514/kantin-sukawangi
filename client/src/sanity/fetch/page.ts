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

export async function getCartData() {
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
`;
  return (await client.fetch(groq)) as Page.Cart;
}

export async function getAboutPageData() {
  const groq = `*[_type == "aboutUs"][0] {
  aboutUsTitle,
  greetings,
  companyDescription,
  "companyImage": companyImage.asset->url,
  companyVideo,
  companyVision,
  companyMission
}
`;

  return (await client.fetch(groq)) as Page.AboutUs;
}

export async function getContactPage(){
  const groq=`*[_type == "contactPage"][0] {
  title,
  description,
  address,
  phone,
  googleMap,
  emails[]{
    email
  },
  map,
  socialMedia[] {
    platform,
    url
  }
}`

return await client.fetch(groq) as Page.ContactPage
}