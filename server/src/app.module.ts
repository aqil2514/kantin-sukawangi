import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './_Modules/cart/cart.module';
import { CheckoutModule } from './_Modules/checkout/checkout.module';
import { ConfigModule } from '@nestjs/config';
import { MidtransModule } from './_Modules/midtrans/midtrans.module';
import { SupabaseService } from './_Utils/supabase.service';

@Module({
  imports: [
    CartModule,
    CheckoutModule,
    MidtransModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
