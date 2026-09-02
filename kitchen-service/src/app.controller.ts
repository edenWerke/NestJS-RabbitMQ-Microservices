import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('order_created')
  async handleOrderCreated(
    @Payload()
    data: {
      orderId: string;
      customerName: string;
      item: string;
      quantity: number;
    },
  ) {
    console.log(`Kitchen received order: ${data.orderId}`);
  }
}