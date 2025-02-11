import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { SupabaseService } from '../../_Utils/supabase.service';

@Module({
  providers: [TransactionService, SupabaseService],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionModule {}
