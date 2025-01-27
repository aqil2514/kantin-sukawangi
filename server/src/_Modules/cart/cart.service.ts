import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { SupabaseService } from '../../_Utils/supabase.service';
import { TransactionDbDto } from '../checkout/dto/transaction-db.dto';
import { TransactionStatusResponse } from 'midtrans-client';
import { MidtransService } from '../midtrans/midtrans.service';
import { CheckoutService } from '../checkout/checkout.service';

@Injectable()
export class CartService {
  private readonly logger = new Logger(CartService.name);

  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly midtransService: MidtransService,
    private readonly checkoutService: CheckoutService,
  ) {}

  async getTransactionData(id: string): Promise<TransactionDbDto> {
    let supabaseData: TransactionDbDto;
    let midtransStatus: TransactionStatusResponse;

    const isTokenId = id.startsWith('ORD');
    const queryDb = isTokenId ? 'order_id' : 'transaction_reference';

    const { data, error } = await this.supabaseService
      .getSupabaseClient()
      .from('transaction')
      .select()
      .eq(queryDb, id)
      .single();

    if (error || !data) {
      this.logger.error(
        `Error fetching transaction data with ${queryDb}: ${id}`,
      );
      throw new NotFoundException(
        `Transaction with ${queryDb} ${id} not found`,
      );
    }

    supabaseData = data;

    try {
      // Cek status transaksi di Midtrans
      midtransStatus = await this.midtransService
        .getCoreApiClient()
        .transaction.status(supabaseData.order_id);
    } catch (error) {
      console.warn(
        'Midtrans error (akan diabaikan): Transaksi tidak ada di Midtrans',
      );
      midtransStatus = {} as TransactionStatusResponse;
    }

    if (
      midtransStatus.transaction_status &&
      midtransStatus.transaction_status !== data.status
    ) {
      await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .update({
          status: midtransStatus.transaction_status,
          status_message: this.checkoutService.transactionStatus(
            midtransStatus.transaction_status,
          ),
        })
        .eq('order_id', supabaseData.order_id);
      data.status = midtransStatus.transaction_status as typeof data.status;
    }

    return data as TransactionDbDto;
  }
}
