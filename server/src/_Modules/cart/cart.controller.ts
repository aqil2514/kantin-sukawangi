import {
  BadRequestException,
  Controller,
  Get,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { TransactionDbDto } from '../checkout/dto/transaction-db.dto';
import { CheckoutService } from '../checkout/checkout.service';
import { ApiKeyGuard } from 'src/_Guards/api-key-guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly checkoutService: CheckoutService,
  ) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async getTransactionData(@Query('token') token: string) {
    if (!token) {
      throw new BadRequestException('Token tidak ada');
    }

    const transactionData = await this.cartService.getTransactionData(token);

    const response: General.ApiResponse<TransactionDbDto> = {
      data: transactionData,
      message: 'Transaksi ditemukan',
    };

    return response;
  }

  @Get('orderId')
  @UseGuards(ApiKeyGuard)
  getOrderId() {
    const orderId = this.checkoutService.generateOrderId();

    const response: General.ApiResponse<{ orderId: string }> = {
      message: 'Order Id berhasil dibuat',
      data: {
        orderId,
      },
    };

    return response;
  }
}
