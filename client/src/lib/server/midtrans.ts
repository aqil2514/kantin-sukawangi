import midtransClient from "midtrans-client";

export const midtransCredentials = {
  clientId: process.env.MIDTRANS_MERCHANT_ID,
  clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY as string,
  serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY as string,
};

export const midtransEndpoint = {
  sandbox: "https://app.sandbox.midtrans.com/snap/v1/transactions",
  production: "https://app.midtrans.com/snap/v1/transactions",
};

export const midtrans = new midtransClient.Snap({
  isProduction: false,
  serverKey: midtransCredentials.serverKey,
  clientKey: midtransCredentials.clientKey,
});

export const midtransCoreApi = new midtransClient.CoreApi(
  {
    isProduction: false,
    serverKey: midtransCredentials.serverKey,
    clientKey: midtransCredentials.clientKey,
  }
)