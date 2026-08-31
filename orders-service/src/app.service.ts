import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './app.controller';
import { db } from './db/db';
import { orders } from './db/schema';
// Give me something
@Injectable()
// kitchenClient is the messenger carrying the order to the kitchen
export class AppService {
  constructor(
    // "NestJS, give me the thing registered as KITCHEN_SERVICE."
    // Give me something = inject and kitchen service is the destination
    @Inject('KITCHEN_SERVICE')
    private readonly kitchenClient: ClientProxy,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const [order] = await db
      .insert(orders)
      .values({
        customerName: dto.customerName,
        item: dto.item,
        quantity: dto.quantity,
        status: 'pending',
      })
      .returning();

    console.log(`Order saved to DB: ${order.id}`);

    // Send order-created event to the Kitchen Service
    this.kitchenClient.emit('order_created', {
      orderId: order.id,
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
    });

    console.log('Event emitted to kitchen queue');

    return {
      success: true,
      orderId: order.id,
    };
  }
}