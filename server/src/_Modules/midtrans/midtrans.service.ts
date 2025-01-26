import { Injectable } from '@nestjs/common';
import * as midtransClient from 'midtrans-client';

@Injectable()
export class MidtransService {
  private readonly snapClient: midtransClient.Snap;
  private readonly coreApiClient: midtransClient.CoreApi;

  constructor() {
    const isProduction = false;

    const MIDTRANS_CREDENTIALS = {
      clientId: process.env.MIDTRANS_MERCHANT_ID,
      clientKey: process.env.MIDTRANS_SANDBOX_CLIENT_KEY as string,
      serverKey: process.env.MIDTRANS_SANDBOX_SERVER_KEY as string,
    };
    const { serverKey, clientKey } = MIDTRANS_CREDENTIALS;

    if (!serverKey || !clientKey) {
      throw new Error('Server Key atau Client Key untuk Midtrans tidak ditemukan!');
    }

    // Inisialisasi Snap Client
    this.snapClient = new midtransClient.Snap({
      isProduction,
      serverKey,
      clientKey,
    });

    // Inisialisasi Core API Client
    this.coreApiClient = new midtransClient.CoreApi({
      isProduction,
      serverKey,
      clientKey,
    });
  }

  getSnapClient(): midtransClient.Snap {
    return this.snapClient;
  }

  getCoreApiClient(): midtransClient.CoreApi {
    return this.coreApiClient;
  }
}
