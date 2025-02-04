// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Page {
  export interface AboutUs {
    aboutUsTitle: string;
    greetings: string; // Slogan perusahaan
    companyDescription: General.PortableText; // Deskripsi singkat tentang perusahaan
    companyImage: string; // Informasi kontak
    companyVideo: string;
    companyVision: General.PortableText;
    companyMission: General.PortableText;
  }
  
  export interface Cart {
    pageTitle: string;
    noItems: string;
    checkout: string;
    detailOrder: string;
    shoppingCta: string;
    amountOrder: string;
    amountShip: string;
    totalAmount: string;
    detailContinueOrder: string;
    continueOrder: string;
    orderToken: string;
    inputTokenPlaceholder: string;
    sendToken: string;
  }

  export interface ContactPage {
    title?: string;
    description?: string;
    address?: string;
    phone?: string;
    emails?: ContactPageEmail[];
    map?: string;
    googleMap?: string;
    socialMedia?: ContactPageSocialMedia[];
  }
  
  interface ContactPageEmail {
    email: string;
  }
  
  interface ContactPageSocialMedia {
    platform: "facebook" | "twitter" | "instagram" | "linkedin" | "youtube";
    url: string;
  }
  

  export interface Home {
    companyName: string;
    companyMotto: string;
  }


}
