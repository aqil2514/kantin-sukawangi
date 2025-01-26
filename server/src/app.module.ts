import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './_Modules/cart/cart.module';
import { CheckoutModule } from './_Modules/checkout/checkout.module';
import { MidtransModule } from './_modules/midtrans/midtrans.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CartModule,
    CheckoutModule,
    MidtransModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
