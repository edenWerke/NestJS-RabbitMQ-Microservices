import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('KITCHEN_SERVICE')
    private readonly kitchenClient: ClientProxy,
  ) {}
}