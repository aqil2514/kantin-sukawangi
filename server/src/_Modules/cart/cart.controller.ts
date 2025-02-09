import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  ServiceUnavailableException,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { TransactionDbDto } from '../checkout/dto/transaction-db.dto';
import { CheckoutService } from '../checkout/checkout.service';
import { ApiKeyGuard } from '../../_Guards/api-key-guard';
import { ZodValidationPipe } from '../../_Pipes/ZodValidationPipe';
import { TransactionDbWaClientDataSchema } from '../checkout/dto/transaction-db-wa-client.dto';

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

  @Post('orderId')
  @UseGuards(ApiKeyGuard)
  @UsePipes(new ZodValidationPipe(TransactionDbWaClientDataSchema))
  async createTransactionWa(
    @Body() clientData: Transaction.TransactionDbWaClientData,
  ) {
    try {
      const transaction =
        await this.checkoutService.createTransactionWa(clientData);

      return {
        message: 'Menambah data di Database berhasil',
        code: 200,
        data: transaction,
      };
    } catch (error) {
      console.error('Gagal membuat order:', error);

      // Tangani error spesifik berdasarkan tipe error
      if (error instanceof BadRequestException) {
        throw new BadRequestException('Data yang dikirim tidak valid');
      }

      if (error.code === '23505') {
        // Error kode "23505" biasanya untuk duplikat di database (PostgreSQL)
        throw new ConflictException('Order ID sudah ada, gunakan yang lain');
      }

      if (error.message.includes('Supabase')) {
        throw new ServiceUnavailableException('Database tidak dapat diakses');
      }

      throw new InternalServerErrorException(
        'Terjadi kesalahan saat membuat order',
      );
    }
  }
}
