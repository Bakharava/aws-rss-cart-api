import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

import { Cart } from './entity/cart';
import { CartItems } from './entity/cartItems';
import { Orders } from '../order/entity/orders';


@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItems, Orders])],
  providers: [ CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
