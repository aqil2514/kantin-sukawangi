import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { TransactionRequestBodyDto } from './dto/transaction-request.dto';
import {
  formatTransactionDb,
  formatTransactionRequest,
} from '../../_Utils/formatter.util';
import { MidtransService } from '../midtrans/midtrans.service';
import { createApiResponse } from '../../_Utils/response.util';
import { SupabaseService } from '../../_Utils/supabase.service';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { TransactionStatusResponse } from 'midtrans-client';
import { TransactionDbDto } from './dto/transaction-db.dto';

@Injectable()
export class CheckoutService {
  private readonly logger = new Logger(CheckoutService.name);
  constructor(
    private readonly midtransService: MidtransService,
    private readonly supabaseService: SupabaseService,
  ) {}

  generateOrderId(): string {
    return `ORD-${randomUUID()}`;
  }

  transactionStatus(status: string): string {
    const statusMessages: Record<string, string> = {
      pending: 'Pembayaran sedang menunggu penyelesaian.',
      settlement: 'Pembayaran telah berhasil diselesaikan.',
      capture:
        'Pembayaran telah berhasil ditangkap. (Metode: kartu kredit dengan otorisasi capture)',
      deny: 'Pembayaran ditolak oleh pihak bank atau sistem.',
      cancel: 'Pembayaran telah dibatalkan.',
      expire: 'Pembayaran telah kedaluwarsa.',
      refund: 'Pembayaran telah dikembalikan.',
      awaiting_payment: 'Pengguna belum melanjutkan pembayaran.',
    };

    return statusMessages[status] || 'Status transaksi tidak diketahui.';
  }

  async createTransaction(body: TransactionRequestBodyDto) {
    try {
      body.order_id = this.generateOrderId();
      const parameter = formatTransactionRequest(body);
      const dbData = formatTransactionDb(body);

      // Simpan ke Supabase
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .insert(dbData);

      if (error) {
        throw new Error('Gagal menyimpan transaksi ke Supabase');
      }

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
    let supabase: PostgrestSingleResponse<any[]>;
    let midtransStatus: TransactionStatusResponse;
  
    try {
      // Cek data transaksi di Supabase
      supabase = await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .select()
        .eq('order_id', orderId);
  
      if (!supabase.data?.length) {
        throw new Error('Transaksi tidak ditemukan di Supabase');
      }
    } catch (error) {
      console.error('Error in Supabase:', error);
      throw new NotFoundException(
        'Transaksi belum dibuat atau tidak ditemukan',
      );
    }
  
    // Ambil data transaksi dari Supabase
    const data = supabase.data[0] as TransactionDbDto;
  
    // Cek apakah transaksi sudah lebih dari 5 menit
    const currentTime = new Date().getTime();
    const createdTime = new Date(data.transaction_date).getTime();
    const timeDiff = (currentTime - createdTime) / 1000 / 60; // dalam menit
  
    if (timeDiff > 5 && data.status === 'awaiting_payment') {
      // Jika sudah lebih dari 5 menit dan masih awaiting_payment, set status menjadi expired
      await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .update({ status: 'expire' })
        .eq('order_id', orderId);
  
      data.status = 'expire';
    }
  
    try {
      // Cek status transaksi di Midtrans
      midtransStatus = await this.midtransService
        .getCoreApiClient()
        .transaction.status(orderId);
    } catch (error) {
      console.warn(
        'Midtrans error (akan diabaikan): Transaksi tidak ada di Midtrans',
      );
      midtransStatus = {} as TransactionStatusResponse;
    }
  
    if (midtransStatus.transaction_status && midtransStatus.transaction_status !== data.status) {
      await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .update({ status: midtransStatus.transaction_status })
        .eq("order_id", orderId);
      data.status = midtransStatus.transaction_status as typeof data.status;
    }
  
    // Persiapkan response dengan status transaksi dari Supabase
    const response: General.ApiResponse<Transaction.CheckTransactionStatus> = {
      message: this.transactionStatus(data.status),
      data: {
        transaction_id: data.order_id,
        transaction_status: data.status,
        status_message: data.status_message,
      },
    };
  
    return response;
  }
}
