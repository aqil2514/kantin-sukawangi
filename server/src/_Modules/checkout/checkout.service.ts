import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TransactionRequestBodyDto } from './dto/transaction-request.dto';
import { formatTransactionRequest } from '../../_Utils/formatter.util';
import { MidtransService } from '../midtrans/midtrans.service';
import { createApiResponse } from '../../_Utils/response.util';

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

      midtrans.token_id = body.order_id;

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

  async checkTransaction(orderId: string) {
    try {
      const checkStatus = await this.midtransService
        .getCoreApiClient()
        .transaction.status(orderId);

      const TransactionStatus = (status: string): string => {
        const statusMessages: Record<string, string> = {
          pending: 'Pembayaran sedang menunggu penyelesaian.',
          settlement: 'Pembayaran telah berhasil diselesaikan.',
          capture:
            'Pembayaran telah berhasil ditangkap. (Metode: kartu kredit dengan otorisasi capture)',
          deny: 'Pembayaran ditolak oleh pihak bank atau sistem.',
          cancel: 'Pembayaran telah dibatalkan.',
          expire: 'Pembayaran telah kedaluwarsa.',
          refund: 'Pembayaran telah dikembalikan.',
        };

        return statusMessages[status] || 'Status transaksi tidak diketahui.';
      };

      const response: General.ApiResponse<Transaction.CheckTransactionStatus> =
        {
          message: TransactionStatus(checkStatus.transaction_status),
          data: {
            transaction_id: checkStatus.transaction_id,
            transaction_status: checkStatus.transaction_status,
            status_message: checkStatus.status_message,
          },
        };

      return response;
    } catch (error) {
      console.error('Error in checkTransaction:', error);

      throw new NotFoundException(
        'Transaksi belum dibuat atau tidak ditemukan',
      );
    }
  }
}
