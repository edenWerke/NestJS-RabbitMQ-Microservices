import { Body, Controller, Get,Post } from '@nestjs/common';
import { AppService } from './app.service';
// a structure for the data that we want to send between parts of our application
export class CreateOrderDto{
  customerName!:string;
  item!:string;
  quantity!:number;
}


@Controller('orders')
export class AppController {
  constructor(private readonly appService: AppService) {}
// @Body() = "Give me the data inside the request

  @Post()
  async createOrder(@Body dto:CreateOrderDto){
return this.appService.createOrder(dto)
  }
}
