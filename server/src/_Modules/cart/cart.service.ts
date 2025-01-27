import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { SupabaseService } from '../../_Utils/supabase.service';
import { TransactionDbDto } from '../checkout/dto/transaction-db.dto';

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);
  
    constructor(private readonly supabaseService: SupabaseService) {}
  
    async getTransactionData(id: string): Promise<TransactionDbDto> {
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
        throw new NotFoundException(`Transaction with ${queryDb} ${id} not found`);
      }
  
      return data as TransactionDbDto;
    }
  }