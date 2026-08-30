import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register({
      name:"KITCHEN_SERVICE",
      transport:"Transport.RMQ",
      optios:{
        urls:{'amqp://guest@localhost:5672'},
        queue:"kitchen_queue"
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
