import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TransactionRequestBodyDto } from './dto/transaction-request.dto';
import { formatTransactionRequest } from 'src/_Utils/formatter.util';
import { MidtransService } from '../midtrans/midtrans.service';
import { createApiResponse } from 'src/_Utils/response.util';

@Injectable()
export class CheckoutService {
  constructor(private readonly midtransService: MidtransService) {}

  generateOrderId(): string {
    return `ORD-${randomUUID()}`;
  }

  async createTransaction(body: TransactionRequestBodyDto) {
    try {
      body.order_id = this.generateOrderId();

      const parameter = formatTransactionRequest(body);
      const midtrans = await this.midtransService
        .getSnapClient()
        .createTransaction(parameter);

        midtrans.token_id = body.order_id

      return createApiResponse(
        'success',
        'Transaksi berhasil dibuat',
        midtrans,
      );
    } catch (error) {
      return createApiResponse(
        'error',
        'Gagal membuat transaksi',
        null,
        error.message || error,
      );
    }
  }
}
