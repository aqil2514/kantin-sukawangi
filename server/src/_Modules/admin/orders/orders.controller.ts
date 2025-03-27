import {
  Controller,
  Get,
  Query,
  UseGuards,
  NotFoundException,
  InternalServerErrorException,
  Put,
  Body,
  UsePipes,
} from '@nestjs/common';
import { ApiKeyGuard } from '../../../_Guards/api-key-guard';
import { OrdersService } from './orders.service';
import { ZodValidationPipe } from 'src/_Pipes/ZodValidationPipe';
import { ClientData, clientDataSchema } from './dto/wa-clientData.dto';

@Controller('/admin/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  async getDetailOrder(@Query('orderId') orderId: string) {
    if (!orderId) {
      throw new NotFoundException("Parameter 'orderId' tidak boleh kosong.");
    }

    try {
      const orderDetail = await this.ordersService.getDetailOrder(orderId);
      return { success: true, data: orderDetail };
    } catch (error) {
      console.error('Error fetching order:', error);
      throw new InternalServerErrorException('Gagal mengambil detail order.');
    }
  }

  @Put()
  @UsePipes(new ZodValidationPipe(clientDataSchema))
  @UseGuards(ApiKeyGuard)
  async editOrder(@Body() body: ClientData) {
    // TODO : Ini sebenernya udah selesai, tapi kayaknya ada yang perlu diaudit lagi deh. Error handlingnya belum kayaknya.
    try {
      const result: General.ApiResponse = {
        message: 'Data berhasil diubah',
      };

      await this.ordersService.editDetailOrder(body);

      return result;
    } catch (error) {
      console.error(error);
      return new InternalServerErrorException();
    }
  }
}
