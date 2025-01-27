import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { SupabaseService } from 'src/_Utils/supabase.service';

@Module({
  controllers: [CartController],
  providers: [CartService, SupabaseService],
})
export class CartModule {}
