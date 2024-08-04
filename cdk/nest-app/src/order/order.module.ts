import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderService } from './services';
import { OrderController } from './order.controller';
import { Orders } from './entity/orders';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  controllers: [OrderController],
  providers: [ OrderService ],
  exports: [ OrderService ],
})
export class OrderModule {}