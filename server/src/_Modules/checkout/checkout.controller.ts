import {
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import {
  transactionReqestSchema,
  TransactionRequestBodyDto,
} from './dto/transaction-request.dto';
import { ZodValidationPipe } from 'src/_Pipes/ZodValidationPipe';

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
      };

      this.logger.error(`Terjadi kesalahan pada server: ${error}`);

      throw new HttpException(response, 500);
    }
  }
}
