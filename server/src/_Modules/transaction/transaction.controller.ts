import { Controller, Get, UseGuards, InternalServerErrorException } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiKeyGuard } from '../../_Guards/api-key-guard';

@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
  ) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  async getTransaction() {
    try {
      const data = await this.transactionService.getTransaction();
      const response: General.ApiResponse<Transaction.TransactionDb[]> = {
        message: "Data berhasil diambil",
        data
      };

      return response;
    } catch (error) {
      console.error(`Error saat mengambil transaksi: ${error.message}`);

      throw new InternalServerErrorException(`Terjadi kesalahan saat mengambil data transaksi: ${error.message}`);
    }
  }
}
