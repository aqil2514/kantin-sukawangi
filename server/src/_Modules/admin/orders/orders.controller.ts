import { Controller, Get, Query, UseGuards, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { ApiKeyGuard } from '../../../_Guards/api-key-guard';
import { OrdersService } from './orders.service';

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
      console.error("Error fetching order:", error);
      throw new InternalServerErrorException('Gagal mengambil detail order.');
    }
  }
}
