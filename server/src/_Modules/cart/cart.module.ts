import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SupabaseService } from '../../_Utils/supabase.service';
import { CheckoutService } from '../checkout/checkout.service';
import { MidtransService } from '../midtrans/midtrans.service';

@Module({
  controllers: [CartController],
  providers: [CartService, SupabaseService, CheckoutService, MidtransService],
})
export class CartModule {}
