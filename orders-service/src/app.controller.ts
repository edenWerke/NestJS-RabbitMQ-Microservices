import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
// a structure for the data that we want to send between parts of our application
export class CreateOrderDto{
  customerName!:string;
  item!:string;
  quantity!:number;
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
