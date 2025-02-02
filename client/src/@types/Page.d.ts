// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Page {
  export interface Home {
    companyName: string;
    companyMotto: string;
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

  export interface AboutUs {
    aboutUsTitle: string;
    greetings: string; // Slogan perusahaan
    companyDescription: string; // Deskripsi singkat tentang perusahaan
    companyImage: string; // Informasi kontak
  }
}
