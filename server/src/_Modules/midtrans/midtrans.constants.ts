

export const MIDTRANS_CREDENTIALS = {
    clientId: process.env.MIDTRANS_MERCHANT_ID,
    clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY as string,
    serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY as string,
  };
  
  export const MIDTRANS_ENDPOINT = {
    sandbox: 'https://app.sandbox.midtrans.com/snap/v1/transactions',
    production: 'https://app.midtrans.com/snap/v1/transactions',
  };
  