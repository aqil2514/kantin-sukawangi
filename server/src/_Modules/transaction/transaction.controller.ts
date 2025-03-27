import {
  Controller,
  Get,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiKeyGuard } from '../../_Guards/api-key-guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  async getAllTransactions() {
    try {
      const [waData, webData] = await Promise.all([
        this.transactionService.getTransactionWa(),
        this.transactionService.getTransactionWeb(),
      ]);
      const response:General.ApiResponse<Transaction.AllTransactionDb> = {
        message: 'Data berhasil diambil',
        data: {
          waData,
          webData,
        },
      };

      return response;
    } catch (error) {
      console.error(`Error saat mengambil transaksi: ${error.message}`);

      throw new InternalServerErrorException(
        `Terjadi kesalahan saat mengambil data transaksi: ${error.message}`,
      );
    }
  }
}
