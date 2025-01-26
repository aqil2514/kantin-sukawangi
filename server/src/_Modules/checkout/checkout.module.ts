import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MidtransModule } from '../midtrans/midtrans.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [MidtransModule]
})
export class CheckoutModule {}
