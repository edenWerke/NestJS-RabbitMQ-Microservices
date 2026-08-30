import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './app.controller';
import { db } from './db/db';
import { orders } from './db/schema';

@Injectable()
export class AppService {
  constructor(
    // "NestJS, give me the thing that you registered under the name KITCHEN_SERVICE."
    @Inject('KITCHEN_SERVICE')
    private readonly kitchenClient: ClientProxy,
  ) {}
  async createOrder(dto:CreateOrderDto){
  const {}=await db.insert(orders).values({
    customerName:dto.customerName,
    item:dto.item,
    quantity:dto.quantity,

    status:"pending"
  })
  }
}