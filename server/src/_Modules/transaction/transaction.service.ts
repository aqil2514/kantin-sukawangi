import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../_Utils/supabase.service';

@Injectable()
export class TransactionService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getTransaction(): Promise<Transaction.TransactionDb[]> {
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
}
