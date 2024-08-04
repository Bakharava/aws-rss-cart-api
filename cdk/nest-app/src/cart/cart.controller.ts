import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './services';
import { BasicAuthGuard } from '../auth';
import { calculateCartTotal } from './models-rules';
import { CartStatuses } from './models';

@Controller('api/profile/cart')
export class CartController {
  constructor(
      private cartService: CartService,
      private orderService: OrderService,
      private datasource: DataSource,
  ) { }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const cart = await this.cartService.findOrCreateByUserId(
        getUserIdFromRequest(req),
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: calculateCartTotal(cart) },
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(@Req() req: AppRequest, @Body() body) {
    const cart = await this.cartService.updateByUserId(
        getUserIdFromRequest(req),
        body,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: calculateCartTotal(cart),
      }
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    }
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(@Req() req: AppRequest, @Body() body) {
    const queryRunner = this.datasource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userId = getUserIdFromRequest(req);
      const cart = await this.cartService.findByUserId(userId);

      if (!cart) {
        const statusCode = HttpStatus.BAD_REQUEST;
        req.statusCode = statusCode;

        return {
          statusCode,
          message: 'Cart is empty',
        }
      }

      const total = calculateCartTotal(cart);

      const order = await this.orderService.create(
          {
            user_id: userId,
            cart_id: body.cart_id,
            address: body.address,
            total,
          },
          userId,
      );

      await this.cartService.setOrderStatus(userId, CartStatuses.ORDERED);

      await queryRunner.commitTransaction();

      return {
        statusCode: HttpStatus.OK,
        message: 'OK',
        data: { order }
      }
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}