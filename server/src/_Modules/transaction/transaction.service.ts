import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../_Utils/supabase.service';

@Injectable()
export class TransactionService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getTransactionWeb(): Promise<Transaction.TransactionDb[]> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .select('*');

      if (error) {
        throw new InternalServerErrorException(`Gagal mengambil data transaksi: ${error.message}`);
      }

      return data as Transaction.TransactionDb[];
    } catch (error) {
      throw new InternalServerErrorException(`Terjadi kesalahan saat mengambil data transaksi: ${error.message}`);
    }
  }

  async getTransactionWa(): Promise<Transaction.TransactionDbWa[]> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .from('transaction_wa')
        .select('*');

      if (error) {
        throw new InternalServerErrorException(`Gagal mengambil data transaksi: ${error.message}`);
      }

      return data as Transaction.TransactionDbWa[];
    } catch (error) {
      throw new InternalServerErrorException(`Terjadi kesalahan saat mengambil data transaksi: ${error.message}`);
    }
  }
}
