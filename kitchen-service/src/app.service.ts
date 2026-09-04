import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { db } from './db/db';
import { tickets } from './db/schema';
// The AppService receives the order, saves it, waits as if the food is being prepared, and tells the rider: “The order is ready.”
@Injectable()
export class AppService {
  constructor(
    @Inject('RIDER_SERVICE') private readonly riderClient: ClientProxy,
  ) {}

  async processOrder(data: {
    orderId: string;
    customerName: string;
    item: string;
    quantity: number;
  }) {
    const [ticket] = await db
      .insert(tickets)
      .values({
        orderId: data.orderId,
        customerName: data.customerName,
        item: data.item,
        status: 'received',
      })
      .returning();

    console.log('Ticket saved to kitchen DB. ID ' + ticket.id);

    await new Promise((res) => setTimeout(res, 2000));

    this.riderClient.emit('order_ready', {
      orderId: data.orderId,
      customerName: data.customerName,
      item: data.item,
    });

    console.log('Event Emitted to the rider_queue (Order ready for pickup)');
  }
}