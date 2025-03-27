import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../../_Utils/supabase.service';
import { ClientData } from './dto/wa-clientData.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getDetailOrder(orderId: string): Promise<Transaction.TransactionDb> {
    try {
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .from('transaction')
        .select('*')
        .eq('order_id', orderId)
        .single();

      if (error) {
        throw new InternalServerErrorException(
          `Error fetching order: ${error.message}`,
        );
      }

      if (!data) {
        throw new NotFoundException(
          `Order dengan ID ${orderId} tidak ditemukan.`,
        );
      }

      return data;
    } catch (error) {
      console.error('Error fetching order detail:', error);
      throw new InternalServerErrorException(
        'Terjadi kesalahan saat mengambil data order',
      );
    }
  }

  async editDetailOrder(clientData: ClientData): Promise<void> {
    const { newValue, field, orderId } = clientData;

    try {
      if (field !== 'order_details') {
        await this.updateField(orderId, field, newValue);
      } else {
        await this.updateOrderDetails(orderId, newValue);
      }
    } catch (error) {
      console.error('Error in editDetailOrder:', error);
      throw error;
    }
  }

  private async updateField(
    orderId: string,
    field: string,
    newValue: string,
  ): Promise<void> {
    const { error } = await this.supabaseService
      .getSupabaseClient()
      .from('transaction_wa')
      .update({ [field]: newValue })
      .eq('order_id', orderId)
      .single();

    if (error) {
      console.error('Error updating field:', error);
      throw new InternalServerErrorException(
        `Failed to update field ${field}: ${error.message}`,
      );
    }
  }

  private async updateOrderDetails(
    orderId: string,
    newValue: string,
  ): Promise<void> {
    const { data, error: fetchError } = await this.supabaseService
      .getSupabaseClient()
      .from('transaction_wa')
      .select('*')
      .eq('order_id', orderId)
      .single();

    if (fetchError) {
      console.error('Error fetching order details:', fetchError);
      throw new InternalServerErrorException(
        `Failed to fetch order details: ${fetchError.message}`,
      );
    }

    if (!data) {
      throw new NotFoundException(`Order with ID ${orderId} not found.`);
    }

    const orderDetails: Transaction.OrderDetails = data.order_details;
    orderDetails.customer_details.full_name = newValue;

    const { error: updateError } = await this.supabaseService
      .getSupabaseClient()
      .from('transaction_wa')
      .update({ order_details: orderDetails })
      .eq('order_id', orderId)
      .single();

    if (updateError) {
      console.error('Error updating order details:', updateError);
      throw new InternalServerErrorException(
        `Failed to update order details: ${updateError.message}`,
      );
    }
  }
}
