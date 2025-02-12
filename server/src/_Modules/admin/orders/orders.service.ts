import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../_Utils/supabase.service';

@Injectable()
export class OrdersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getDetailOrder(orderId: string): Promise<Transaction.TransactionDb> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        throw new InternalServerErrorException(`Error fetching order: ${error.message}`);
      }

      if (!data) {
        throw new NotFoundException(`Order dengan ID ${orderId} tidak ditemukan.`);
      }

      return data;
    } catch (error) {
      console.error("Error fetching order detail:", error);
      throw new InternalServerErrorException('Terjadi kesalahan saat mengambil data order');
    }
  }
}
