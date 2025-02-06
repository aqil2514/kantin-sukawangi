import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  Logger,
  NotFoundException,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import {
  transactionReqestSchema,
  TransactionRequestBodyDto,
} from './dto/transaction-request.dto';
import { ZodValidationPipe } from '../../_Pipes/ZodValidationPipe';

@Controller('checkout')
export class CheckoutController {
  private readonly logger = new Logger(CheckoutController.name);
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(transactionReqestSchema))
  createTransaction(@Body() body: TransactionRequestBodyDto) {
    try {
      return this.checkoutService.createTransaction(body);
    } catch (error) {
      const response: General.ApiResponse = {
        message: 'Terjadi kesalahan pada server',
        errors: error,
      };

      this.logger.error(`Terjadi kesalahan pada server: ${error}`);

      throw new HttpException(response, 500);
    }
  }

  @Get()
  async checkTransaction(@Query('orderId') orderId: string) {
    if (!orderId) {
      throw new BadRequestException('Parameter orderId tidak ditemukan.');
    }

    try {
      const statusTransaction =
        await this.checkoutService.checkTransaction(orderId);
      return statusTransaction;
    } catch (error) {
      throw error;
    }
  }
}
