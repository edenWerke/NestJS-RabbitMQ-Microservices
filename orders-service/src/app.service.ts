import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './app.controller';
import { db } from './db/db';
import { orders } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    // "NestJS, give me the thing registered as KITCHEN_SERVICE."
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
    // this.kitchenClient.emit{'order created',}

    return order;
  }
}