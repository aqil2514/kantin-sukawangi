import { BadRequestException, Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { TransactionDbDto } from '../checkout/dto/transaction-db.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
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
}
