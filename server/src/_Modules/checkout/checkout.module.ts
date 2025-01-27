import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MidtransModule } from '../midtrans/midtrans.module';
import { SupabaseService } from '../../_Utils/supabase.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService, SupabaseService],
  imports: [MidtransModule]
})
export class CheckoutModule {}
